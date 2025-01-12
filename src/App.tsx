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
    <div className="h-screen bg-gray-900 text-white relative overflow-hidden flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=2940&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 flex flex-col items-center">
        <Shield className="w-12 h-12 mb-4 text-cyan-400 animate-pulse" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
          Secure Passphrase Generator
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl text-center mb-8">
          Generate unique and memorable passphrases for enhanced security
        </p>

        {/* Main Container */}
        <div className="w-full max-w-3xl bg-gray-800/90 p-6 rounded-2xl shadow-xl backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <Key className="w-6 h-6 text-cyan-400" />
            <Lock className="w-6 h-6 text-cyan-400" />
          </div>

          {/* Controls */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Hash className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm text-gray-400">Word Count: {wordCount}</span>
                </div>
                <button
                  onClick={generatePassphrase}
                  className="group bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded-lg flex items-center space-x-2 transform transition-all hover:scale-105"
                >
                  <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                  <span>Generate</span>
                </button>
              </div>
              <input
                type="range"
                min="4"
                max="24"
                value={wordCount}
                onChange={(e) => setWordCount(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>4</span>
                <span>24</span>
              </div>
            </div>
          </div>

          {/* Generated Passphrase */}
          <div className="bg-gray-900 p-4 rounded-lg flex items-center justify-between gap-4">
            <p className="text-lg md:text-2xl font-mono text-cyan-400 break-all flex-1">
              {passphrase || 'Click generate to create a passphrase'}
            </p>
            {passphrase && (
              <button
                onClick={copyToClipboard}
                className="flex items-center justify-center p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                title="Copy to clipboard"
              >
                {copied ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <Copy className="w-5 h-5 text-cyan-400" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;