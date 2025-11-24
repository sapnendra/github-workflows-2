# ByteBloom Agency - Client Acquisition Platform

A modern and client-acquisition website built with ReactJS, TailwindCSS, GSAP animations, and ExpressJS backend. Features dark/light theme toggling, WhatsApp integration, and a clean, minimalistic design.

## Features

- ✅ **Responsive Design** - Mobile, tablet, and desktop optimized
- ✅ **Dark/Light Theme** - Smooth theme transitions with localStorage persistence
- ✅ **GSAP Animations** - Smooth fade-in, scroll reveal, and hover effects
- ✅ **WhatsApp Integration** - Direct contact via WhatsApp with pre-filled messages
- ✅ **Lead Management** - Form submissions saved to MongoDB
- ✅ **SEO Optimized** - Meta tags and semantic HTML
- ✅ **Modern Stack** - React, TailwindCSS v4, Express, MongoDB

## Project Structure

```
WebSite-Building-Agency/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── sections/        # Page sections
│   │   ├── contexts/        # React contexts (Theme)
│   │   ├── config/          # Constants and config
│   │   ├── utils/           # Utility functions
│   │   ├── styles/          # CSS files with @apply
│   │   └── App.jsx
│   └── package.json
├── backend/
│   ├── config/              # Database configuration
│   ├── controllers/         # Route controllers
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── middlewares/         # Express middlewares
│   └── index.js
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=3000
MONGODB_URI=your_db_uri
NODE_ENV=development
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=super-secure-password
JWT_SECRET=change_me
JWT_EXPIRES_IN=8h
```

For MongoDB Atlas, use:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/website-agency
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Update WhatsApp number in `src/config/constants.js`:
```javascript
export const WHATSAPP_NUMBER = '916234546789';
```

4. Update social links in `src/config/constants.js`:
```javascript
export const SOCIAL_LINKS = {
  github: 'https://github.com/sapnendra',
  linkedin: 'https://linkedin.com/in/sapnendra',
  instagram: 'https://instagram.com/_sapnendra',
  whatsapp: `https://wa.me/${916260345345}`
};
```

5. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or the port Vite assigns)

### Production Build

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. The built files will be in `frontend/dist/`

## Configuration

### WhatsApp Number Format

The WhatsApp number should be in international format without `+` or spaces:
- ✅ Correct: `1234567890`
- ❌ Wrong: `+1 234 567 8900` or `+1234567890`

### API Endpoints

- `POST /api/leads` - Submit a new lead
- `GET /api/health` - Health check
- `POST /api/admin/login` - Admin login (returns JWT)
- `GET /api/admin/all-clients` - Authenticated: fetch all client/lead records
- `GET /api/admin/status` - Authenticated: status summary + grouped clients
- `PATCH /api/admin/clients/:clientId/status` - Authenticated: update a client status
- `POST /api/admin/logout` - Authenticated: blacklist the current token/session

#### Lead Status Workflow

- Supported statuses: `pending`, `in_progress`, `delivered`
- New leads default to `pending` and automatically record an entry in `statusHistory`
- Use the admin status update endpoint to move clients between stages and log optional notes

### Customization

1. **Services**: Edit `src/config/constants.js` → `SERVICES` array
2. **Projects**: Edit `src/config/constants.js` → `PROJECTS` array
3. **Skills**: Edit `src/config/constants.js` → `SKILLS` array
4. **Colors**: Modify Tailwind classes in components or update `tailwind.config.js`
5. **Profile Image**: Replace the image URL in `src/sections/About.jsx`

## Technologies Used

### Frontend
- React 19
- TailwindCSS v4
- GSAP (GreenSock Animation Platform)
- React Hook Form
- React Hot Toast
- React Icons

### Backend
- Express.js
- MongoDB with Mongoose
- CORS
- dotenv
- jsonwebtoken

## Features Breakdown

### 1. Hero Section
- Animated headline and subheading
- WhatsApp CTA button
- Smooth GSAP fade-in animations

### 2. Services Section
- 6 service cards with hover effects
- Scroll-triggered animations
- Responsive grid layout

### 3. Projects Section
- Project showcase with images
- "View Live" and "View Code" buttons
- Tech stack badges
- Hover animations

### 4. About Section
- Professional introduction
- Profile photo with animation
- Skills and tech stack display

### 5. Contact Form
- React Hook Form validation
- Saves to MongoDB
- Auto-opens WhatsApp with form data
- Success toast notifications

### 6. Navigation
- Responsive mobile menu
- Theme toggle
- Smooth scroll to sections

### 7. Footer
- Quick links
- Social media icons
- Copyright information

### 8. WhatsApp Button
- Sticky floating button
- Works in both themes
- Direct WhatsApp contact

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

ISC

## Author

Sapnendra Jaiswal

---