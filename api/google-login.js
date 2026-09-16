const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const googleClient = new OAuth2Client('428240791571-o7vohrjlnbctiu3k0ap60cpb19psvg3u.apps.googleusercontent.com');

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Check env vars
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL not set');
    return res.status(500).json({ error: 'Server config error: DATABASE_URL missing' });
  }
  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET not set');
    return res.status(500).json({ error: 'Server config error: JWT_SECRET missing' });
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'No token provided' });
    }

    // Verify Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: '428240791571-o7vohrjlnbctiu3k0ap60cpb19psvg3u.apps.googleusercontent.com',
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    // Find or create user
    let userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    let user = userCheck.rows[0];

    if (!user) {
      const result = await pool.query(
        'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email',
        [name, email]
      );
      user = result.rows[0];
    }

    const jwtToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      token: jwtToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        class_name: user.class_name,
        heard_from: user.heard_from,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Google login error:', error.message);
    res.status(500).json({ error: error.message || 'Google login failed' });
  } finally {
    await pool.end().catch(() => {});
  }
}
