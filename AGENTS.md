# AGENTS.md - Coding Agent Guidelines

## Project Overview

SecurePassPhraseGen is a React-based secure passphrase generator built with Vite, TypeScript, and Tailwind CSS. It uses a neobrutalism design system with custom CSS variables for theming.

## Build/Lint/Test Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint all files
npm run lint

# TypeScript type checking (no separate command - handled by build)
npx tsc --noEmit
```

**Note**: This project currently has no test framework configured. If tests are added, update this section.

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3 with CSS custom properties
- **Icons**: Lucide React
- **Linting**: ESLint 9 with typescript-eslint and react-hooks plugins

## Project Structure

```
src/
├── App.tsx          # Main application component
├── main.tsx         # React entry point
├── index.css        # Global styles + Tailwind + CSS variables
└── vite-env.d.ts    # Vite type declarations

root/
├── index.html       # HTML entry point
├── vite.config.ts   # Vite configuration
├── tsconfig.json    # TypeScript project references
├── tsconfig.app.json # TypeScript app config
├── eslint.config.js # ESLint flat config
└── tailwind.config.js # Tailwind configuration
```

## Code Style Guidelines

### Imports

Order imports as follows, separated by blank lines:

1. React imports
2. Third-party libraries (lucide-react, etc.)
3. Local imports (CSS, components)

```tsx
import React, { useState } from 'react';
import { Shield, Key, Lock } from 'lucide-react';

import './index.css';
import Component from './Component';
```

### Components

- Use arrow function syntax for component definitions
- Use default exports for page-level components, named exports for utilities
- Keep components in their own files when they exceed ~150 lines

```tsx
function ComponentName() {
  // hooks at top
  const [state, setState] = useState<string>('');
  
  // handlers
  const handleClick = () => { ... };
  
  // return JSX
  return ( ... );
}

export default ComponentName;
```

### TypeScript

- Use explicit type annotations for useState when the type isn't obvious
- Avoid `any` - use `unknown` when type is truly unknown
- The project uses strict mode with `noUnusedLocals` and `noUnusedParameters`

```tsx
const [passphrase, setPassphrase] = useState<string>('');
const [items] = useState(new Set<string>());
```

### Naming Conventions

- **Components**: PascalCase (`App`, `PassphraseGenerator`)
- **Functions/Variables**: camelCase (`generatePassphrase`, `wordCount`)
- **Constants**: camelCase for simple values, SCREAMING_SNAKE_CASE for true constants
- **CSS classes**: Use kebab-case with BEM-like prefixes (`.brutal-card`, `.brutal-button`)
- **Files**: PascalCase for components (`App.tsx`), camelCase for utilities

### Styling

- Use Tailwind utility classes primarily
- Custom CSS classes are defined in `index.css` for reusable patterns
- CSS variables use HSL values for color manipulation
- Custom properties follow naming: `--category-variant` (e.g., `--primary`, `--card-shadow`)

```tsx
// Prefer Tailwind utilities
<div className="min-h-screen bg-background text-foreground">

// Use custom classes for repeated complex patterns
<div className="brutal-card p-8">
```

### State Management

- Use `useState` for local component state
- Lift state up when multiple components need access
- For complex state, consider `useReducer` or external libraries

### Error Handling

- Use try/catch for async operations
- Log errors with `console.error` for debugging
- Provide user feedback for recoverable errors

```tsx
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(text);
    setCopied(true);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};
```

### JSX Guidelines

- Use self-closing tags for elements without children
- Prefer fragment shorthand `<>...</>` over `<div>` when no wrapper needed
- Extract complex inline styles to CSS classes or variables

### Comments

- This codebase generally avoids inline comments
- Let the code be self-documenting with clear naming
- Add comments only for non-obvious logic or workarounds

## Design System

The project uses a neobrutalism design with:

- Bold borders (`--border-width: 3px`)
- Offset shadows (`--card-shadow: 10px 10px 0px #000000`)
- High contrast colors
- Monospace body font (Space Mono)
- Bold heading font (Archivo Black)

Custom utility classes:
- `.brutal-card` - Card container with border and shadow
- `.brutal-button` - Button with border and interactive shadow
- `.brutal-border` - Border-only variant
- `.brutal-input` - Input field styling

## Git Conventions

- Keep commits focused and atomic
- Run `npm run lint` before committing to catch issues

## Notes

- The `dist` directory is ignored by ESLint
- Lucide-react is excluded from Vite's dependency optimization
- The app uses `StrictMode` in development for detecting potential issues
