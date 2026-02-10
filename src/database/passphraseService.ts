import pool from './connection';

export const checkPassphraseExists = async (passphrase: string): Promise<boolean> => {
  try {
    const result = await pool.query(
      'SELECT COUNT(*) FROM passphrases WHERE passphrase = $1',
      [passphrase]
    );

    return parseInt(result.rows[0].count) > 0;
  } catch (error) {
    console.error('Error checking passphrase existence:', error);
    return false; // Fallback to local check if DB fails
  }
};

export const savePassphrase = async (passphrase: string): Promise<void> => {
  try {
    await pool.query(
      'INSERT INTO passphrases (passphrase, created_at) VALUES ($1, NOW())',
      [passphrase]
    );
  } catch (error) {
    console.error('Error saving passphrase:', error);
  }
};