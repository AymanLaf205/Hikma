# Daily Philosophical Thought Generator

A Next.js application that displays a unique philosophical thought each day using Google's Gemini API for AI-generated responses.

## Features

- **Daily Thought**: A new philosophical thought is generated each day
- **Clean UI**: Minimalist interface with a centered text display
- **Caching**: Thoughts are stored in localStorage to avoid duplicate API calls
- **Regeneration**: Users can manually generate a new thought once per hour
- **Animations**: Smooth text transitions when displaying new thoughts
- **Dark/Light Mode**: Toggle between dark and light themes

## Getting Started

### Prerequisites

- Node.js 16.8.0 or later
- A Google Gemini API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory and add your Gemini API key:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
   ```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

```bash
npm run build
```

## Project Structure

- `/app`: Next.js app router pages
- `/components`: React components
- `/lib`: Utility functions and API integrations
- `/hooks`: Custom React hooks

## Technologies Used

- Next.js 13.5
- React 18
- Tailwind CSS
- Framer Motion for animations
- Google Generative AI (Gemini)
- shadcn/ui components
- localStorage for caching

## Deployment

This project is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel and add the environment variable for your Gemini API key.#   H i k m a  
 