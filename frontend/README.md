# ByteBloom Agency - Frontend

A modern, responsive client-acquisition website built with React, TailwindCSS, and GSAP animations.

## Features

- 🎨 Modern, clean, and minimalistic design
- 🌓 Dark/Light theme toggle
- 📱 Fully responsive
- ⚡ Fast and optimized
- 🔍 SEO-friendly
- ✨ Smooth GSAP animations
- 💬 WhatsApp integration for lead generation
- 🚀 Built with React Router for navigation

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool
- **TailwindCSS 4** - Styling
- **GSAP** - Animations
- **React Router DOM** - Routing
- **Axios** - API calls

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000/api
VITE_WHATSAPP_NUMBER=1234567890
```

**Note:** For WhatsApp number, use country code + number without + or spaces (e.g., `1234567890` for a US number).

### Development

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Build for production:

```bash
npm run build
```

### Preview

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable components (Navbar, Footer)
├── contexts/         # React contexts (ThemeContext)
├── pages/            # Page components (Home, About, Contact)
├── sections/         # Page sections (Hero, Services, Testimonials, CTA)
├── services/         # API services
└── utils/            # Utility functions (WhatsApp helpers)
```

## Routes

- `/` - Home page with Hero, Services, and Testimonials
- `/about` - About page with company information
- `/contact` - Contact form with WhatsApp integration

## Environment Variables

- `VITE_API_URL` - Backend API base URL (default: `http://localhost:3000/api`)
- `VITE_WHATSAPP_NUMBER` - WhatsApp number for lead forwarding (format: country code + number)

## Backend Integration

The frontend integrates with the backend API for:

- Lead submission (`POST /api/leads`)
- Admin authentication and management (admin routes)

Make sure the backend server is running and accessible at the configured `VITE_API_URL`.
