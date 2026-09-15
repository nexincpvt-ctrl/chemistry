const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const googleClient = new OAuth2Client('428240791571-o7vohrjlnbctiu3k0ap60cpb19psvg3u.apps.googleusercontent.com');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { token } = req.body;
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: '428240791571-o7vohrjlnbctiu3k0ap60cpb19psvg3u.apps.googleusercontent.com',
    });
    const payload = ticket.getPayload();
    const { email, name } = payload;
    
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
    res.status(200).json({ token: jwtToken, user: { id: user.id, name: user.name, email: user.email, class_name: user.class_name, heard_from: user.heard_from, avatar: user.avatar } });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ error: 'Google login failed' });
  }
}
