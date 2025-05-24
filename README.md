# SignFE - Digital Document Signing Frontend

A modern, responsive React/Next.js frontend application for digital document signing and management. Built with Next.js 14, Tailwind CSS, and advanced UI components for an intuitive document editing experience.

## 🚀 Features

### 📄 **Document Management**
- **Multi-format Support**: PDF, images (PNG, JPG, JPEG), and other document types
- **Drag & Drop Upload**: Intuitive file upload with drag-and-drop interface
- **Document Preview**: High-quality document rendering with zoom controls
- **Page Navigation**: Smooth navigation through multi-page documents

### ✏️ **Advanced Field Editor**
- **Drag & Drop Fields**: Intuitive field placement with real-time preview
- **Multiple Field Types**: Text, Signature, Checkbox, and Date fields
- **Visual Field Designer**: Professional field styling with customizable colors
- **Responsive Positioning**: Precise field placement with pixel-perfect accuracy
- **Field Validation**: Real-time validation and error handling

### ✍️ **Signature Experience**
- **Canvas Drawing**: Smooth signature drawing with multiple pen colors and widths
- **Image Upload**: Support for uploading signature images
- **Signature Preview**: Real-time signature preview and editing
- **Multi-signature Support**: Handle multiple signers with different signature styles

### 📱 **Mobile-First Design**
- **Responsive Layout**: Optimized for all screen sizes (mobile, tablet, desktop)
- **Touch-Friendly**: Large touch targets and gesture support
- **Mobile Zoom**: Pinch-to-zoom and pan functionality
- **Collapsible UI**: Space-efficient mobile interface

### 🎨 **Modern UI/UX**
- **Professional Design**: Clean, modern interface with smooth animations
- **Dark/Light Themes**: Support for multiple color schemes
- **Accessibility**: WCAG compliant with keyboard navigation
- **Performance Optimized**: Fast loading with optimized rendering

### 🔧 **Developer Experience**
- **TypeScript Ready**: Full TypeScript support for type safety
- **Component Library**: Reusable UI components with Storybook
- **Hot Reload**: Fast development with Next.js hot reload
- **ESLint & Prettier**: Code quality and formatting tools

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (React 18)
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Headless UI
- **Icons**: Lucide React
- **PDF Handling**: PDF.js for document rendering
- **Canvas**: HTML5 Canvas for signature drawing
- **State Management**: React Hooks (useState, useEffect, useContext)
- **HTTP Client**: Axios for API communication
- **Notifications**: React Hot Toast
- **File Upload**: Native HTML5 with drag-and-drop
- **Responsive Design**: Mobile-first approach with Tailwind

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm, yarn, or pnpm
- Modern web browser with ES6+ support

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd signfe
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # API Configuration
   NEXT_PUBLIC_API_URL=http://localhost:5001
   
   # App Configuration
   NEXT_PUBLIC_APP_NAME=SignFE
   NEXT_PUBLIC_APP_VERSION=1.0.0
   
   # Feature Flags
   NEXT_PUBLIC_ENABLE_ANALYTICS=false
   NEXT_PUBLIC_ENABLE_PWA=true
   
   # Development
   NODE_ENV=development
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage

# Code Quality
npm run format       # Format code with Prettier
npm run type-check   # TypeScript type checking

# Analysis
npm run analyze      # Analyze bundle size
npm run lighthouse   # Run Lighthouse audit
```

## 📁 Project Structure

```
signfe/
├── app/                          # Next.js 14 App Router
│   ├── components/              # Reusable UI components
│   │   ├── DocumentViewer.js    # PDF/document rendering
│   │   ├── SignatureModal.js    # Signature creation modal
│   │   ├── SignerModal.js       # Signer management modal
│   │   └── ui/                  # Base UI components
│   ├── editor/                  # Document editor pages
│   │   └── new/                 # New document editor
│   ├── preview/                 # Document preview pages
│   ├── sign/                    # Document signing pages
│   ├── globals.css              # Global styles
│   ├── layout.js                # Root layout component
│   └── page.js                  # Home page
├── public/                      # Static assets
│   ├── icons/                   # App icons
│   ├── images/                  # Images and graphics
│   └── favicon.ico              # Favicon
├── styles/                      # Additional stylesheets
├── utils/                       # Utility functions
├── hooks/                       # Custom React hooks
├── types/                       # TypeScript type definitions
├── .env.local                   # Environment variables
├── .gitignore                   # Git ignore rules
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # Project documentation
```

## 🎨 Key Components

### DocumentViewer
- High-performance PDF rendering
- Zoom and pan controls
- Page navigation
- Field overlay system

### SignatureModal
- Canvas-based signature drawing
- Multiple pen colors and widths
- Image upload support
- Signature preview and editing

### Field Editor
- Drag-and-drop field placement
- Real-time visual feedback
- Field type selection
- Color customization

### Responsive Layout
- Mobile-first design
- Collapsible sidebar
- Touch-friendly controls
- Adaptive zoom controls

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS for styling with custom configurations:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette
      },
      animation: {
        // Custom animations
      }
    },
  },
  plugins: [
    // Tailwind plugins
  ],
}
```

### Next.js Configuration
```javascript
// next.config.js
module.exports = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost'],
  },
  // Additional configurations
}
```

## 📱 Responsive Design

The application is built with a mobile-first approach:

- **Mobile (320px+)**: Optimized touch interface
- **Tablet (768px+)**: Enhanced layout with sidebar
- **Desktop (1024px+)**: Full-featured interface
- **Large Desktop (1280px+)**: Expanded workspace

## 🎯 Performance Optimizations

- **Code Splitting**: Automatic code splitting with Next.js
- **Image Optimization**: Next.js Image component for optimized loading
- **Bundle Analysis**: Webpack bundle analyzer for size optimization
- **Lazy Loading**: Component lazy loading for better performance
- **Memoization**: React.memo and useMemo for preventing unnecessary re-renders

## 🔒 Security Features

- **Input Sanitization**: XSS protection for user inputs
- **CSRF Protection**: Cross-site request forgery protection
- **Secure Headers**: Security headers configuration
- **Environment Variables**: Secure handling of sensitive data

## 🧪 Testing

The project includes comprehensive testing setup:

```bash
# Unit Tests
npm run test

# Integration Tests
npm run test:integration

# E2E Tests
npm run test:e2e

# Coverage Report
npm run test:coverage
```

## 📦 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
```bash
docker build -t signfe .
docker run -p 3000:3000 signfe
```

### Static Export
```bash
npm run build
npm run export
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure responsive design compatibility
- Test on multiple browsers and devices

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🔄 Changelog

### v1.0.0
- Initial release
- Document upload and preview
- Advanced field editor with drag-and-drop
- Signature creation with canvas and upload
- Mobile-responsive design
- Multi-signer workflow
- Professional UI/UX

### Upcoming Features
- Real-time collaboration
- Advanced analytics
- Template system
- API integrations
- Enhanced mobile experience

---

**Built with ❤️ by the SignFE Team** 