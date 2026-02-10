import pool from './connection';
import crypto from 'crypto';

// Hash passphrase using SHA-256 with salt
export const hashPassphrase = (passphrase: string): string => {
  const salt = process.env.PASSPHRASE_SALT || 'default-salt'; // Should be stored in environment variable
  const hashed = crypto.createHmac('sha256', salt).update(passphrase).digest('hex');
  return hashed;
};

export const checkPassphraseExists = async (passphrase: string): Promise<boolean> => {
  try {
    const hashedPassphrase = hashPassphrase(passphrase);
    const result = await pool.query(
      'SELECT COUNT(*) FROM passphrases WHERE hashed_passphrase = $1',
      [hashedPassphrase]
    );

    return parseInt(result.rows[0].count) > 0;
  } catch (error) {
    console.error('Error checking passphrase existence:', error);
    return false; // Fallback to local check if DB fails
  }
};

export const savePassphrase = async (passphrase: string): Promise<void> => {
  try {
    const hashedPassphrase = hashPassphrase(passphrase);
    await pool.query(
      'INSERT INTO passphrases (hashed_passphrase, created_at) VALUES ($1, NOW())',
      [hashedPassphrase]
    );
  } catch (error) {
    console.error('Error saving passphrase:', error);
  }
};