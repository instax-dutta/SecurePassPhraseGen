import React, { useState } from 'react';
import { Key, Lock, RefreshCw, Hash, Copy, CheckCircle } from 'lucide-react';
import { checkPassphraseExists, savePassphrase } from './database/passphraseService';
import { Loading } from './components/Loading';

const words = [
  // Common but strong words
  'correct', 'horse', 'battery', 'staple', 'secure', 'random', 'entropy',
  'quantum', 'cipher', 'crypto', 'digital', 'fortress', 'guardian', 'shield',
  'protect', 'defend', 'safe', 'vault', 'castle', 'dragon',
  // Nature words
  'mountain', 'ocean', 'forest', 'river', 'desert', 'valley', 'glacier',
  'volcano', 'island', 'canyon', 'prairie', 'tundra', 'reef', 'oasis',
  // Animal words
  'falcon', 'jaguar', 'dolphin', 'eagle', 'tiger', 'wolf', 'bear',
  'lion', 'hawk', 'whale', 'cobra', 'puma', 'lynx', 'orca',
  // Abstract concepts
  'freedom', 'justice', 'wisdom', 'courage', 'honor', 'truth', 'peace',
  'power', 'spirit', 'destiny', 'legacy', 'glory', 'victory', 'harmony',
  // Technology words
  'binary', 'neural', 'matrix', 'vector', 'photon', 'qubit', 'cipher',
  'pixel', 'server', 'router', 'beacon', 'signal', 'sensor', 'proxy'
];

function App() {
  const [passphrase, setPassphrase] = useState<string>('');
  const [previousPhrases] = useState(new Set<string>());
  const [wordCount, setWordCount] = useState(4);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [generationError, setGenerationError] = useState('');
  const maxWordCount = Math.min(24, words.length);

  const generatePassphrase = React.useCallback(async () => {
    const attemptedThisRun = new Set<string>();
    const maxAttemptsPerLength = 300;
    let candidateWordCount = wordCount;
    let newPassphrase = '';
    let isUnique = false;

    while (candidateWordCount <= maxWordCount && !isUnique) {
      let attempts = 0;

      while (attempts < maxAttemptsPerLength && !isUnique) {
        const availableWords = [...words];
        const selectedWords: string[] = [];

        for (let i = 0; i < candidateWordCount; i++) {
          const randomIndex = Math.floor(Math.random() * availableWords.length);
          selectedWords.push(availableWords[randomIndex]);
          availableWords.splice(randomIndex, 1);
        }

        const candidate = selectedWords.join('-');
        attempts++;

        if (attemptedThisRun.has(candidate)) {
          continue;
        }

        attemptedThisRun.add(candidate);

        const alreadyUsed = previousPhrases.has(candidate) || await checkPassphraseExists(candidate);
        if (!alreadyUsed) {
          newPassphrase = candidate;
          isUnique = true;
        }
      }

      if (!isUnique) {
        candidateWordCount++;
      }
    }

    if (!isUnique) {
      setGenerationError('Could not find a unique passphrase. Clear local cache or try again.');
      return;
    }

    if (candidateWordCount !== wordCount) {
      setWordCount(candidateWordCount);
    }

    previousPhrases.add(newPassphrase);
    await savePassphrase(newPassphrase);
    setPassphrase(newPassphrase);
    setCopied(false);
    setGenerationError('');
  }, [maxWordCount, previousPhrases, wordCount]);

  // Generate initial passphrase when component mounts
  React.useEffect(() => {
    generatePassphrase();
  }, [generatePassphrase]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(passphrase);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (isLoading) {
    return <Loading onLoadComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="h-[100dvh] overflow-hidden bg-background text-foreground font-sans selection:bg-primary selection:text-white p-3 sm:p-4 md:p-6">
      {/* Decorative background grid/elements (optional but adds vibe) */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0"
        style={{ backgroundImage: 'radial-gradient(hsl(var(--primary)) 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
        aria-hidden="true" />

      {/* Content */}
      <main className="relative z-10 mx-auto flex h-full w-full max-w-5xl flex-col gap-3 sm:gap-4">
        <header className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <img src="/logo.svg" alt="Secure Passphrase Generator Logo" className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14" />
            <h1 className="font-heading leading-[0.9] uppercase text-[clamp(1.8rem,6vw,3.6rem)]">
              Secure <span className="text-accent underline decoration-primary underline-offset-4">Passphrase</span>
            </h1>
          </div>
        </header>

        <p className="max-w-2xl text-xs font-bold text-muted-foreground sm:text-sm md:text-base">
          Generate bulletproof, memorable phrases with flat-out raw security.
        </p>

        {/* Main Interface */}
        <div className="flex min-h-0 flex-1 flex-col gap-3 sm:gap-4">
          <section className="brutal-card relative overflow-hidden p-4 sm:p-5 md:p-6">
            {/* Top Bar Decoration */}
            <div className="absolute left-0 right-0 top-0 h-2 bg-primary" aria-hidden="true" />

            <div className="mb-4 flex items-center justify-between sm:mb-5">
              <div className="flex items-center gap-2 sm:gap-3">
                <Key className="h-6 w-6 text-secondary sm:h-7 sm:w-7" aria-hidden="true" />
                <span className="font-heading text-base uppercase sm:text-lg">Vault Config</span>
              </div>
              <div className="h-6 w-6 brutal-border bg-accent sm:h-7 sm:w-7" aria-hidden="true" />
            </div>

            {/* Controls */}
            <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between font-heading">
                  <div className="flex items-center gap-2">
                    <Hash className="h-5 w-5 text-primary sm:h-6 sm:w-6" aria-hidden="true" />
                    <span className="uppercase tracking-tight text-sm sm:text-base">Complexity Level</span>
                  </div>
                  <span className="text-xl text-primary sm:text-2xl">{wordCount}</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={maxWordCount}
                  value={wordCount}
                  onChange={(e) => setWordCount(parseInt(e.target.value, 10))}
                  className="h-8 w-full cursor-pointer appearance-none bg-muted p-1 brutal-border accent-primary"
                  aria-label="Passphrase complexity level"
                  role="slider"
                  aria-valuemin={4}
                  aria-valuemax={maxWordCount}
                  aria-valuenow={wordCount}
                />
                <div className="flex justify-between text-xs font-bold uppercase opacity-50 sm:text-sm">
                  <span>Weak</span>
                  <span>Unbreakable</span>
                </div>
              </div>

              <div className="flex flex-col justify-end">
                <button
                  onClick={generatePassphrase}
                  className="brutal-button flex min-h-11 items-center justify-center gap-3 bg-primary px-4 py-3 text-base text-white active:bg-primary/90 sm:text-lg"
                  aria-label="Generate new secure passphrase"
                >
                  <RefreshCw className="h-6 w-6 transition-transform duration-700 group-hover:rotate-180" strokeWidth={3} aria-hidden="true" />
                  <span>Execute!</span>
                </button>
              </div>
            </div>

            {/* Generated Output */}
            <div className="relative">
              <label className="absolute -top-3 left-3 bg-card px-2 font-heading text-xs uppercase text-secondary sm:text-sm">Output Pipeline</label>
              <div className="brutal-input flex min-h-[88px] items-center justify-between gap-3 p-3 transition-colors sm:min-h-[96px] sm:gap-4 sm:p-4">
                <p className="flex-1 break-words font-heading text-xl tracking-tight text-accent sm:text-2xl md:text-3xl">
                  {passphrase || 'WAITING FOR DATA...'}
                </p>
                {passphrase && (
                  <button
                    onClick={copyToClipboard}
                    className="brutal-button shrink-0 bg-secondary p-3 text-white hover:bg-secondary/90"
                    title="Copy to clipboard"
                    aria-label="Copy passphrase to clipboard"
                  >
                    {copied ? (
                      <CheckCircle className="h-6 w-6 text-accent sm:h-7 sm:w-7" aria-hidden="true" />
                    ) : (
                      <Copy className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
                    )}
                  </button>
                )}
              </div>
              {generationError && (
                <p className="mt-2 text-xs font-bold uppercase tracking-wide text-primary sm:text-sm">
                  {generationError}
                </p>
              )}
            </div>
          </section>

          {/* Security Status Badge */}
          <section className="flex justify-center">
            <div className="brutal-card flex items-center gap-2 bg-secondary/20 px-3 py-2 sm:gap-3 sm:px-4 sm:py-3">
              <Lock className="h-5 w-5 text-primary sm:h-6 sm:w-6" aria-hidden="true" />
              <span className="font-heading text-[10px] uppercase tracking-wider sm:text-xs md:text-sm">
                Entropy: {wordCount * 12.5} Bits | SHA-256 Compliant
              </span>
            </div>
          </section>

          {/* Footer with Backlink */}
          <footer className="flex justify-center">
            <a
            href="https://sdad.pro"
            target="_blank"
            rel="noopener noreferrer"
            className="brutal-card bg-primary px-4 py-2 text-[10px] font-heading uppercase tracking-wider text-white transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none sm:px-5 sm:py-3 sm:text-xs"
            aria-label="Visit SDAD.PRO - creator of this passphrase generator"
          >
              Built by <span className="text-secondary">SDAD.PRO</span>
            </a>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
