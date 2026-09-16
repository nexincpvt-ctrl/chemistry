const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!process.env.DATABASE_URL) return res.status(500).json({ error: 'Server config error: DATABASE_URL missing' });
  if (!process.env.JWT_SECRET) return res.status(500).json({ error: 'Server config error: JWT_SECRET missing' });

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) return res.status(400).json({ error: 'Invalid email or password' });
    if (!user.password) return res.status(400).json({ error: 'Please use Google Sign-In for this account' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email, class_name: user.class_name, heard_from: user.heard_from, avatar: user.avatar } });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ error: error.message || 'Server error during login' });
  } finally {
    await pool.end().catch(() => {});
  }
}
