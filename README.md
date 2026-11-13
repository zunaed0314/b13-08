# ☀️ SunCart – Modern E-commerce Web Application

SunCart is a modern, responsive e-commerce web application built with **Next.js**. It provides a user-friendly shopping experience with dynamic product pages, secure authentication, Google sign-in, profile management, and customizable themes.

The project focuses on creating a clean interface, responsive layouts, and a smooth user experience across desktop and mobile devices.

## 🌐 Live Demo

**[Visit SunCart](https://b13-08.vercel.app/)**

## ✨ Features

### 🛍️ Product Experience
- Browse available products.
- View individual product details.
- Dynamic product routes using product IDs.
- Responsive product layouts.
- Product showcase carousel on the homepage.
- Product search and browsing experience.

### 🔐 Authentication & Authorization
- User registration and email/password login.
- Google OAuth authentication.
- Persistent login sessions with Better Auth.
- Protected routes for authenticated users.
- Automatic redirection to the originally requested page after login.
- User-specific navigation based on authentication status.
- Secure sign-out functionality.

### 👤 User Profile
- View authenticated user information.
- Display profile picture and username.
- Update profile name and profile image.
- Preview profile image changes before saving.
- Confirmation dialog before updating profile information.
- Synchronize updated profile information across the application.

### 🎨 User Interface & Experience
- Responsive design for mobile, tablet, and desktop.
- Light and dark theme support.
- Custom DaisyUI themes.
- Responsive navigation bar.
- Mobile-friendly hamburger menu.
- Floating mobile theme switch.
- Custom homepage hero section.
- Reusable UI components.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | React framework and application routing |
| React 19 | Component-based UI development |
| Tailwind CSS 4 | Utility-first styling |
| DaisyUI 5 | UI components and theme customization |
| Better Auth | Authentication and session management |
| MongoDB | Authentication data storage |
| React Hook Form | Form handling and validation |
| Next.js Image | Optimized image rendering |
| React Icons | Icon library |
| next-themes | Theme management |

## 🏗️ Project Architecture

SunCart uses the Next.js App Router architecture.

```text
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── api/
│   │   └── auth/
│   │       └── [...all]/
│   ├── products/
│   │   └── [id]/
│   ├── profile/
│   ├── layout.js
│   └── page.js
│
├── components/
│   ├── Logo/
│   ├── Navbar/
│   ├── Footer/
│   ├── ProductCarousel/
│   ├── ThemeSwitch/
│   └── ...
│
├── lib/
│   ├── auth.js
│   └── auth-client.js
│
└── ...
```

*The structure above represents the main application areas; individual component filenames may differ.*

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2. Navigate to the project directory

```bash
cd b13-08
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root.

```env
AUTH_DB_URI=your_mongodb_connection_string

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Replace the placeholder values with your actual credentials.

**Important:** Never commit your `.env` file or expose your Google OAuth client secret in client-side code.

### 5. Configure Google OAuth

Create a Google OAuth 2.0 Web Application client in the Google Cloud Console.

Add this authorized redirect URI for local development:

```text
http://localhost:3000/api/auth/callback/google
```

For production, configure the corresponding callback URL for your deployed domain.

### 6. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Production Build

Generate an optimized production build:

```bash
npm run build
```

Run the production build locally:

```bash
npm start
```

## 🌐 Deployment

SunCart is deployed using **Vercel**.

To deploy updates:

1. Push your latest changes to the connected GitHub repository.
2. Vercel automatically detects the new commit.
3. A new production deployment is triggered.
4. Check the deployment status and build logs in the Vercel dashboard.

Configure all required environment variables under:

**Vercel → Project Settings → Environment Variables**

## 🔒 Security Notes

- Authentication is handled through Better Auth.
- Authentication data is stored in MongoDB.
- Protected pages are guarded against unauthenticated access.
- OAuth credentials and database connection strings are stored in environment variables.
- Client-side components use the Better Auth client rather than importing server-only authentication code.

## 🎯 Project Goals

SunCart was developed to explore and implement modern full-stack web development concepts, including:

- Next.js App Router and server/client components.
- Authentication and authorization.
- OAuth integration.
- MongoDB database connectivity.
- Protected routes and session handling.
- Responsive UI development.
- Theme customization.
- Production deployment with Vercel.

---

**Built with Next.js, React, and a passion for modern web development.** ☀️