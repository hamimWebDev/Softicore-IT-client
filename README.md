# Md. Hamim Howlader Asif - Portfolio

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features a beautiful design with dark theme, smooth animations, and a comprehensive admin dashboard.

## 🚀 Features

### Core Features
- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive across all devices
- **Dark Theme**: Beautiful dark mode design for optimal viewing experience
- **Fast Performance**: Optimized with Next.js and modern web technologies
- **SEO Optimized**: Meta tags, structured data, and performance optimizations

### User Experience
- **Smooth Animations**: Framer Motion powered animations
- **Loading States**: Beautiful loading spinners and states
- **Toast Notifications**: User-friendly feedback with Sonner
- **Scroll to Top**: Easy navigation with animated scroll-to-top button
- **Custom Scrollbar**: Styled scrollbar for better aesthetics

### Authentication & Admin
- **Secure Login**: JWT-based authentication
- **Admin Dashboard**: Comprehensive admin panel for content management
- **Protected Routes**: Secure access to admin features
- **User Management**: Different user roles and permissions

### Content Management
- **Blog System**: Full-featured blog with markdown support
- **Project Showcase**: Dynamic project display with filtering
- **Skills Management**: Interactive skills section
- **Contact Form**: Functional contact form with validation

## 🛠️ Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **React Icons**: Icon library
- **Sonner**: Toast notifications

### State Management
- **Redux Toolkit**: State management
- **Redux Persist**: Persistent state
- **RTK Query**: API data fetching

### Styling & UI
- **Custom Components**: Reusable UI components
- **Glass Morphism**: Modern glass effect designs
- **Gradient Text**: Beautiful gradient text effects
- **Custom Animations**: Smooth scroll and hover effects

## 📁 Project Structure

```
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ScrollToTop.tsx
│   ├── AllJourney/         # Journey/experience components
│   ├── AdminDashboard/     # Admin dashboard components
│   └── ...                 # Other components
├── pages/                  # Next.js pages
├── redux/                  # Redux store and slices
├── hooks/                  # Custom React hooks
├── styles/                 # Global styles
├── types/                  # TypeScript type definitions
└── public/                 # Static assets
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#2563EB) - Main brand color
- **Secondary**: Sky Blue (#0EA5E9) - Accent color
- **Success**: Green (#22C55E) - Success states
- **Warning**: Amber (#F59E0B) - Warning states
- **Error**: Red (#EF4444) - Error states

### Components
- **Button**: Multiple variants (primary, secondary, outline, ghost)
- **Card**: Glass morphism and elevated variants
- **LoadingSpinner**: Multiple animation styles
- **Badge**: Status and category indicators

### Animations
- **Fade In/Out**: Smooth opacity transitions
- **Slide Up/Down**: Directional animations
- **Float**: Gentle floating animations
- **Pulse Glow**: Glowing effects
- **Hover Effects**: Interactive hover states

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_SITE_URL=your_site_url
```

### Theme Configuration
The application uses a beautiful dark theme design optimized for readability and modern aesthetics.

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Performance Optimizations

- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic code splitting
- **Lazy Loading**: Components and images
- **Bundle Analysis**: Optimized bundle sizes
- **Caching**: Efficient caching strategies

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Protected Routes**: Role-based access control
- **Input Validation**: Form validation and sanitization
- **CSRF Protection**: Cross-site request forgery protection
- **XSS Prevention**: Content Security Policy

## 📈 SEO Features

- **Meta Tags**: Dynamic meta tags for each page
- **Structured Data**: JSON-LD structured data
- **Sitemap**: Automatic sitemap generation
- **Robots.txt**: Search engine optimization
- **Performance**: Core Web Vitals optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Md. Hamim Howlader Asif**
- Portfolio: [Your Portfolio URL]
- LinkedIn: [Your LinkedIn]
- GitHub: [Your GitHub]

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first approach
- Framer Motion for smooth animations
- All contributors and supporters

---

⭐ Star this repository if you found it helpful! 
 