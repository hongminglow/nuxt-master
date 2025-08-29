# Nuxt Master Dashboard

A simple dashboard application built with Nuxt 3, featuring authentication and a clean dashboard interface.

## Features

- 🔐 **Authentication System**: Simple login/logout functionality
- 📊 **Dashboard**: Clean dashboard with cards and activity feed
- 🎨 **Responsive Design**: Mobile-friendly interface
- 🏗️ **Organized Structure**: Follows Nuxt conventions and best practices

## Demo Credentials

- **Email**: `admin@example.com`
- **Password**: `password`

## Project Structure

```
├── app/
│   └── app.vue                 # Root app component
├── assets/
│   └── css/
│       └── main.css           # Global styles
├── components/
│   ├── DashboardCard.vue      # Reusable dashboard card
│   └── LoginForm.vue          # Login form component
├── composables/
│   └── useAuth.ts             # Authentication composable
├── layouts/
│   ├── default.vue            # Default layout
│   └── dashboard.vue          # Dashboard layout with header
├── middleware/
│   ├── auth.ts                # Authentication middleware
│   └── guest.ts               # Guest-only middleware
├── pages/
│   ├── index.vue              # Dashboard page
│   └── login.vue              # Login page
├── types/
│   └── index.ts               # TypeScript type definitions
└── utils/
    ├── format.ts              # Formatting utilities
    └── validation.ts          # Validation utilities
```

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Start development server**:

   ```bash
   npm run dev
   # or
   pnpm dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

4. **Login**:
   Use the demo credentials above to access the dashboard

## Key Features

### Authentication

- Simple mock authentication system
- Protected routes using middleware
- Persistent login state using Nuxt's `useState`
- Automatic redirects for authenticated/unauthenticated users

### Dashboard

- Overview cards showing key metrics
- Recent activity feed
- Responsive grid layout
- Clean, professional design

### Code Organization

- **Composables**: Reusable logic (authentication)
- **Components**: UI building blocks
- **Layouts**: Page structure templates
- **Middleware**: Route protection
- **Utils**: Helper functions
- **Types**: TypeScript definitions

## Technologies Used

- **Nuxt 3**: Vue.js framework
- **TypeScript**: Type safety
- **Vue 3**: Reactive framework
- **CSS**: Custom styling with utility classes

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run generate` - Generate static site

## Notes

- This is a demo application with mock authentication
- In production, replace the mock auth with a real authentication system
- The application follows Nuxt 3 conventions and best practices
- All components are properly typed with TypeScript

## Dev JWT session (jose)

This demo now issues an HttpOnly JWT cookie using `jose`:

- POST `/api/login` with `{ email: "admin@example.com", password: "password" }`
- GET `/api/session` to inspect the current session
- POST `/api/logout` to clear the cookie

Set a signing secret (dev example):

```sh
NUXT_JWT_SECRET="dev-super-secret" pnpm dev
```

Cookie is HttpOnly, SameSite=Lax, Secure in production, and the token expires in 1 hour.
