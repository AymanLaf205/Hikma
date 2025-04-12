# Daily Philosophical Thought Generator

A sleek Next.js application that delivers a unique, AI-generated philosophical thought each day using Google's Gemini API.

## ✨ Features

- **Daily Thought** – Automatically generates a new philosophical insight each day
- **Minimalist UI** – Clean and focused interface with centered text
- **Caching** – Stores the thought in `localStorage` to avoid repeated API calls
- **Regeneration** – Option to manually generate a new thought (available once per hour)
- **Smooth Animations** – Elegant text transitions using Framer Motion
- **Theme Toggle** – Switch effortlessly between dark and light mode

## 🚀 Getting Started

### Prerequisites

- Node.js `v16.8.0` or higher
- A valid Google Gemini API key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/daily-philosophy.git
   cd daily-philosophy
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory and add your Gemini API key:

   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
   ```

### Development

Start the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to explore the app.

### Production Build

Build the application for production:

```bash
npm run build
```

## 🧠 Project Structure

- `/app` – Next.js app router and layout
- `/components` – Reusable UI components
- `/hooks` – Custom React hooks
- `/lib` – Utility functions and API logic

## 🛠 Technologies Used

- **Next.js 13.5**
- **React 18**
- **Tailwind CSS** – for styling
- **Framer Motion** – for smooth animations
- **shadcn/ui** – for pre-styled components
- **Google Gemini API** – for AI-generated thoughts
- **localStorage** – for client-side caching

## ☁️ Deployment

This project is ready for deployment on **[Vercel](https://vercel.com/)**.

1. Push your repository to GitHub.
2. Import the project into Vercel.
3. Add the `NEXT_PUBLIC_GEMINI_API_KEY` as an environment variable.
