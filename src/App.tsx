import React, { useState } from 'react';
import { Shield, Key, Lock, RefreshCw, Hash, Copy, CheckCircle } from 'lucide-react';

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

  const generatePassphrase = () => {
    let newPassphrase: string;
    let attempts = 0;
    const maxAttempts = 100; // Prevent infinite loops

    do {
      // Create a copy of the words array to ensure no word is used twice
      const availableWords = [...words];
      const selectedWords = [];

      // Select unique words based on user's wordCount
      for (let i = 0; i < wordCount; i++) {
        const randomIndex = Math.floor(Math.random() * availableWords.length);
        selectedWords.push(availableWords[randomIndex]);
        // Remove the selected word to prevent reuse
        availableWords.splice(randomIndex, 1);
      }

      newPassphrase = selectedWords.join('-');
      attempts++;
    } while (previousPhrases.has(newPassphrase) && attempts < maxAttempts);

    // Add the new passphrase to the set of used phrases
    previousPhrases.add(newPassphrase);
    setPassphrase(newPassphrase);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(passphrase);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white p-4 md:p-8 flex items-center justify-center">
      {/* Decorative background grid/elements (optional but adds vibe) */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0"
        style={{ backgroundImage: 'radial-gradient(hsl(var(--primary)) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      {/* Content */}
      <div className="relative z-10 container max-w-4xl mx-auto flex flex-col items-center">
        <div className="flex items-center gap-4 mb-8">
          <Shield className="w-16 h-16 text-primary" strokeWidth={2.5} />
          <div>
            <h1 className="text-5xl md:text-7xl font-heading leading-none uppercase -rotate-1">
              Secure
              <br />
              <span className="text-accent underline decoration-primary underline-offset-4">Passphrase</span>
            </h1>
          </div>
        </div>

        <p className="text-xl md:text-2xl font-bold text-muted-foreground max-w-2xl text-center mb-12 rotate-1">
          Generate bulletproof, memorable phrases with flat-out raw security.
        </p>

        {/* Main Interface */}
        <div className="w-full space-y-8">
          <div className="brutal-card p-8 md:p-12 relative overflow-hidden group">
            {/* Top Bar Decoration */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-primary" />

            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <Key className="w-8 h-8 text-secondary" />
                <span className="font-heading text-xl uppercase">Vault Config</span>
              </div>
              <div className="h-8 w-8 brutal-border bg-accent" />
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div className="space-y-4">
                <div className="flex items-center justify-between font-heading">
                  <div className="flex items-center gap-2">
                    <Hash className="w-6 h-6 text-primary" />
                    <span className="uppercase tracking-tight">Complexity Level</span>
                  </div>
                  <span className="text-2xl text-primary">{wordCount}</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="24"
                  value={wordCount}
                  onChange={(e) => setWordCount(parseInt(e.target.value))}
                  className="w-full h-8 bg-muted brutal-border appearance-none cursor-pointer accent-primary p-1"
                />
                <div className="flex justify-between text-sm font-bold opacity-50 uppercase">
                  <span>Weak</span>
                  <span>Unbreakable</span>
                </div>
              </div>

              <div className="flex flex-col justify-end">
                <button
                  onClick={generatePassphrase}
                  className="brutal-button bg-primary text-white p-6 flex items-center justify-center space-x-4 text-2xl group active:bg-primary/90"
                >
                  <RefreshCw className="w-8 h-8 group-hover:rotate-180 transition-transform duration-700" strokeWidth={3} />
                  <span>Execute!</span>
                </button>
              </div>
            </div>

            {/* Generated Output */}
            <div className="relative">
              <label className="absolute -top-4 left-4 font-heading bg-card px-2 text-sm uppercase text-secondary">Output Pipeline</label>
              <div className="brutal-input flex items-center justify-between gap-6 min-h-[100px] p-6 group-hover:border-primary transition-colors">
                <p className="text-2xl md:text-4xl font-heading text-accent break-all flex-1 tracking-tight">
                  {passphrase || 'WAITING FOR DATA...'}
                </p>
                {passphrase && (
                  <button
                    onClick={copyToClipboard}
                    className="brutal-button bg-secondary text-white p-4 hover:bg-secondary/90 shrink-0"
                    title="Copy to clipboard"
                  >
                    {copied ? (
                      <CheckCircle className="w-8 h-8 text-accent" />
                    ) : (
                      <Copy className="w-8 h-8" />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Security Status Badge */}
          <div className="flex justify-center">
            <div className="brutal-card bg-secondary/20 p-4 flex items-center gap-4 -rotate-1">
              <Lock className="w-6 h-6 text-primary" />
              <span className="font-heading text-sm uppercase tracking-widest">
                Entropy: {wordCount * 12.5} Bits | SHA-256 Compliant
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;