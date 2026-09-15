require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const googleClient = new OAuth2Client('428240791571-o7vohrjlnbctiu3k0ap60cpb19psvg3u.apps.googleusercontent.com');

app.post('/api/google-login', async (req, res) => {
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
    res.json({ token: jwtToken, user: { id: user.id, name: user.name, email: user.email, class_name: user.class_name, heard_from: user.heard_from, avatar: user.avatar } });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ error: 'Google login failed' });
  }
});

app.post('/api/update-profile', async (req, res) => {
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
});

app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );

    const user = result.rows[0];
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error during signup' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
