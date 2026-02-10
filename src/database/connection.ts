import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL environment variable is not defined');
  process.exit(1);
}

// Secure connection configuration
const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: true // Verify SSL certificate
  },
  max: 5, // Limit connection pool size
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  connectionTimeoutMillis: 10000 // Timeout after 10 seconds if connection fails
});

// Test connection on startup
pool.query('SELECT NOW()')
  .then(() => console.log('Database connection established'))
  .catch((err) => {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  });

export default pool;