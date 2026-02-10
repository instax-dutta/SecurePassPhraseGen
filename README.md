# Secure Passphrase Generator

A modern, secure passphrase generator with neobrutalism design style. This application generates unique, high-entropy passphrases using a combination of local and database checks to ensure uniqueness.

## Features

- 🎨 **Neobrutalism Design**: Bold, contrasting colors with distinct borders for a modern look
- 🔒 **Secure Hashing**: Passphrases are stored using SHA-256 hashing with salt for enhanced security
- 📊 **Unique Passphrase Guarantee**: Checks both local storage and remote database for existing passphrases
- 🚀 **Fast Generation**: Generates unique passphrases in milliseconds
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎬 **Loading Animation**: Engaging loading animation using Remotion and Framer Motion
- 🔄 **Entropy Levels**: Adjustable complexity levels from 4 to 24 words
- 📋 **Copy to Clipboard**: One-click copy functionality with visual feedback

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Video Generation**: Remotion
- **Database**: Neon DB (PostgreSQL)
- **Icons**: Lucide React
- **Backend**: Node.js + Express (optional)

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- A Neon DB account (for database functionality)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/instax-dutta/SecurePassPhraseGen.git
cd SecurePassPhraseGen
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on the `.env.example` template:
```bash
cp .env.example .env
```

4. Update the `.env` file with your Neon DB connection string and salt:
```
DATABASE_URL=your_neon_db_connection_string_here
PASSPHRASE_SALT=your_unique_salt_here
```

5. Run the development server:
```bash
npm run dev
```

### Build

To build for production:

```bash
npm run build
```

The build output will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

### Remotion Animation

To render the loading animation:

```bash
npm run remotion:render
```

To render a still image:

```bash
npm run remotion:still
```

## Environment Variables

- `DATABASE_URL`: Your Neon DB connection string (required for passphrase uniqueness checks)
- `PASSPHRASE_SALT`: A unique salt for passphrase hashing (required for security)

## Database Setup

The application will automatically create the required table if it doesn't exist. The `passphrases` table has the following structure:

```sql
CREATE TABLE passphrases (
  id SERIAL PRIMARY KEY,
  hashed_passphrase VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
)
```

## Security Measures

- **Password Hashing**: SHA-256 with salt for secure storage
- **SSL Connection**: Encrypted database connection using SSL
- **Environment Variables**: Sensitive information stored in `.env` file (not committed to git)
- **Connection Pooling**: Limited connection pool size for resource management
- **Timeout Handling**: Connection timeout to prevent hanging requests

## Design Philosophy

The design follows the neobrutalism style with:

- Bold color combinations (red, green, yellow, and black)
- Thick borders and distinct shadows
- High contrast for better readability
- Playful, angular elements
- Responsive grid layout

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- [Neon DB](https://neon.tech/) for providing a serverless PostgreSQL database
- [Remotion](https://remotion.dev/) for video generation capabilities
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling

## Contact

For questions or support, please open an issue or contact the repository owner.