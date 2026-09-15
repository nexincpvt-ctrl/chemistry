const { Pool } = require('pg');
const jwt = require('jsonwebtoken');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  try {
    const { token, name, class_name, heard_from, avatar } = req.body;
    
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const result = await pool.query(
      'UPDATE users SET name=$1, class_name=$2, heard_from=$3, avatar=$4 WHERE id=$5 RETURNING id, name, email, class_name, heard_from, avatar',
      [name, class_name, heard_from, avatar, userId]
    );

    res.status(200).json({ user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
}
