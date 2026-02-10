const storageKey = 'secure-passphrase-hashes';
const defaultSalt = 'default-salt';
const passphraseSalt = import.meta.env.VITE_PASSPHRASE_SALT || defaultSalt;

const getStoredHashes = (): Set<string> => {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) {
      return new Set<string>();
    }

    const parsed = JSON.parse(raw) as string[];
    if (!Array.isArray(parsed)) {
      return new Set<string>();
    }

    return new Set<string>(parsed);
  } catch (error) {
    console.error('Error reading passphrase cache:', error);
    return new Set<string>();
  }
};

const saveStoredHashes = (hashes: Set<string>): void => {
  try {
    localStorage.setItem(storageKey, JSON.stringify(Array.from(hashes)));
  } catch (error) {
    console.error('Error writing passphrase cache:', error);
  }
};

const toHex = (buffer: ArrayBuffer): string => {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
};

// Hash passphrase using Web Crypto SHA-256 (browser-safe).
export const hashPassphrase = async (passphrase: string): Promise<string> => {
  if (!window.crypto?.subtle) {
    return `${passphraseSalt}:${passphrase}`;
  }

  const data = new TextEncoder().encode(`${passphraseSalt}:${passphrase}`);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return toHex(digest);
};

export const checkPassphraseExists = async (passphrase: string): Promise<boolean> => {
  const hash = await hashPassphrase(passphrase);
  const hashes = getStoredHashes();
  return hashes.has(hash);
};

export const savePassphrase = async (passphrase: string): Promise<void> => {
  const hash = await hashPassphrase(passphrase);
  const hashes = getStoredHashes();
  hashes.add(hash);
  saveStoredHashes(hashes);
};
