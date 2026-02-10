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
    <div className="app-shell min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white p-4 sm:p-6 lg:p-8 xl:p-10 flex items-center justify-center">
      {/* Decorative background grid/elements (optional but adds vibe) */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0"
        style={{ backgroundImage: 'radial-gradient(hsl(var(--primary)) 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
        aria-hidden="true" />

      {/* Content */}
      <main className="app-main relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
        <header className="w-full flex items-center justify-center lg:justify-start gap-4 mb-6 md:mb-8">
          <div className="flex min-w-0 items-center gap-3 md:gap-4">
            <img src="/logo.svg" alt="Secure Passphrase Generator Logo" className="w-14 h-14 md:w-16 md:h-16" />
            <h1 className="app-title text-5xl md:text-6xl lg:text-7xl font-heading leading-none uppercase">
              Secure
              <br />
              <span className="text-accent underline decoration-primary underline-offset-4">Passphrase</span>
            </h1>
          </div>
        </header>

        <p className="w-full text-center lg:text-left text-base md:text-xl font-bold text-muted-foreground max-w-4xl mb-8 md:mb-10">
          Generate bulletproof, memorable phrases with flat-out raw security.
        </p>

        {/* Main Interface */}
        <div className="w-full space-y-6 lg:space-y-8">
          <section className="app-card brutal-card relative overflow-hidden p-6 md:p-8 lg:p-10">
            {/* Top Bar Decoration */}
            <div className="absolute left-0 right-0 top-0 h-2 bg-primary" aria-hidden="true" />

            <div className="mb-8 md:mb-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Key className="w-7 h-7 md:w-8 md:h-8 text-secondary" aria-hidden="true" />
                <span className="font-heading text-lg md:text-xl uppercase">Vault Config</span>
              </div>
              <div className="h-7 w-7 md:h-8 md:w-8 brutal-border bg-accent" aria-hidden="true" />
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 lg:gap-12 mb-8 md:mb-10">
              <div className="space-y-4">
                <div className="flex items-center justify-between font-heading">
                  <div className="flex items-center gap-2">
                    <Hash className="w-6 h-6 text-primary" aria-hidden="true" />
                    <span className="uppercase tracking-tight text-base md:text-lg">Complexity Level</span>
                  </div>
                  <span className="text-2xl text-primary">{wordCount}</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={maxWordCount}
                  value={wordCount}
                  onChange={(e) => setWordCount(parseInt(e.target.value, 10))}
                  className="w-full h-8 bg-muted brutal-border appearance-none cursor-pointer accent-primary p-1"
                  aria-label="Passphrase complexity level"
                  role="slider"
                  aria-valuemin={4}
                  aria-valuemax={maxWordCount}
                  aria-valuenow={wordCount}
                />
                <div className="flex justify-between text-sm font-bold opacity-50 uppercase">
                  <span>Weak</span>
                  <span>Unbreakable</span>
                </div>
              </div>

              <div className="flex flex-col justify-end">
                <button
                  onClick={generatePassphrase}
                  className="brutal-button bg-primary text-white p-5 md:p-6 flex items-center justify-center space-x-4 text-xl md:text-2xl group active:bg-primary/90 min-h-[56px]"
                  aria-label="Generate new secure passphrase"
                >
                  <RefreshCw className="w-7 h-7 md:w-8 md:h-8 group-hover:rotate-180 transition-transform duration-700" strokeWidth={3} aria-hidden="true" />
                  <span>Execute!</span>
                </button>
              </div>
            </div>

            {/* Generated Output */}
            <div className="relative">
              <label className="absolute -top-4 left-4 font-heading bg-card px-2 text-sm uppercase text-secondary">Output Pipeline</label>
              <div className="brutal-input flex items-center justify-between gap-4 md:gap-6 min-h-[100px] md:min-h-[112px] p-4 md:p-6 group-hover:border-primary transition-colors">
                <p className="text-2xl md:text-4xl font-heading text-accent break-all flex-1 tracking-tight">
                  {passphrase || 'WAITING FOR DATA...'}
                </p>
                {passphrase && (
                  <button
                    onClick={copyToClipboard}
                    className="brutal-button bg-secondary text-white p-3 md:p-4 hover:bg-secondary/90 shrink-0"
                    title="Copy to clipboard"
                    aria-label="Copy passphrase to clipboard"
                  >
                    {copied ? (
                      <CheckCircle className="w-7 h-7 md:w-8 md:h-8 text-accent" aria-hidden="true" />
                    ) : (
                      <Copy className="w-7 h-7 md:w-8 md:h-8" aria-hidden="true" />
                    )}
                  </button>
                )}
              </div>
              {generationError && (
                <p className="mt-3 font-bold text-sm text-primary uppercase tracking-wide">
                  {generationError}
                </p>
              )}
            </div>
          </section>

          {/* Security Status Badge */}
          <section className="flex justify-center">
            <div className="brutal-card bg-secondary/20 px-4 py-3 md:p-4 flex items-center gap-3 md:gap-4">
              <Lock className="w-6 h-6 text-primary" aria-hidden="true" />
              <span className="font-heading text-xs md:text-sm uppercase tracking-widest">
                Entropy: {wordCount * 12.5} Bits | SHA-256 Compliant
              </span>
            </div>
          </section>

          {/* Footer with Backlink */}
          <footer className="mt-10 md:mt-12 w-full flex justify-center">
            <a
              href="https://sdad.pro"
              target="_blank"
              rel="noopener noreferrer"
              className="brutal-card bg-primary text-white px-5 py-3 md:px-6 font-heading uppercase tracking-widest text-xs md:text-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
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
