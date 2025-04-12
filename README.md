# 🧘‍♂️ Daily Philosophical Thought Generator

A sleek, AI-powered Next.js application that delivers a unique philosophical thought each day using Google's Gemini API. Minimal, elegant, and insightful.

## ✨ Features

- **Daily Thought** – Automatically generates a new, thought-provoking idea every day
- **Minimalist Interface** – Clean and focused layout with centered text
- **Smart Caching** – Stores the daily thought in `localStorage` to reduce redundant API calls
- **Manual Regeneration** – Users can request a new thought once every hour
- **Smooth Animations** – Elegant transitions powered by Framer Motion
- **Theme Switcher** – Seamlessly toggle between light and dark modes

## 🚀 Getting Started

### Prerequisites

- Node.js `v16.8.0` or higher
- A valid **Google Gemini API key**

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

3. **Add environment variables**

   Create a `.env.local` file in the root of the project and insert your Gemini API key:

   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
   ```

### Development

To run the development server:

```bash
npm run dev
```

Then visit: [http://localhost:3000](http://localhost:3000)

### Production Build

To build the application for production:

```bash
npm run build
```

## 🧠 Project Structure

- `/app` – Application routing and layout (Next.js App Router)
- `/components` – Reusable UI elements and layout components
- `/hooks` – Custom React hooks for state and logic
- `/lib` – API integrations and utility functions

## 🛠 Technologies Used

- **Next.js 13.5**
- **React 18**
- **Tailwind CSS** – Utility-first styling framework
- **Framer Motion** – Smooth UI animations
- **shadcn/ui** – Accessible and pre-styled UI components
- **Google Gemini API** – AI-generated philosophical thoughts
- **localStorage** – Persistent client-side caching

## ☁️ Deployment

This project is optimized for deployment on **[Vercel](https://vercel.com/)**.

1. Push your code to GitHub.
2. Import the repository into Vercel.
3. Add the required environment variable:

   ```
   NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
   ```

4. Deploy and enjoy your daily dose of wisdom 🌿
