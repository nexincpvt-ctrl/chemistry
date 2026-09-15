require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function initDB() {
  try {
    await client.connect();
    console.log('Connected to Neon DB');

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    await client.query(createTableQuery);
    console.log('Users table created successfully');
    
  } catch (err) {
    console.error('Error creating table:', err);
  } finally {
    await client.end();
  }
}

initDB();
