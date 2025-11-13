# 🚀 Modern Portfolio Website

A stunning, modern portfolio website built with React, TypeScript, Three.js, and cutting-edge animation libraries. Features immersive 3D elements, smooth scroll animations, and a creative design that balances professionalism with playfulness.

## ✨ Features

- **🎨 Modern UI/UX Design**: Clean, professional, and creative interface with glassmorphism effects
- **🌟 3D Elements**: Interactive Three.js 3D sphere with particle effects in the hero section
- **💫 Advanced Animations**: 
  - Framer Motion for component animations
  - GSAP for scroll-triggered animations
  - Custom cursor with trailing effect
  - Smooth scroll behavior
- **📱 Fully Responsive**: Optimized for all devices and screen sizes
- **🎭 Creative Sections**:
  - Hero with animated 3D background
  - About with feature cards
  - Skills with animated progress bars
  - Projects in Bento Grid layout
  - Interactive contact form
- **🎯 Performance Optimized**: Fast loading and smooth 60fps animations
- **🌈 Modern Typography**: Beautiful font combinations (Inter + Space Grotesk)
- **🎨 Gradient Design System**: Carefully crafted color palette with neon accents

## 🛠️ Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom animations
- **3D Graphics**: Three.js with React Three Fiber
- **Animations**: 
  - Framer Motion
  - GSAP with ScrollTrigger
- **Icons**: Lucide React
- **3D Helpers**: @react-three/drei

## 📦 Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd my-portfolio
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Build for production:
\`\`\`bash
npm run build
\`\`\`

5. Preview production build:
\`\`\`bash
npm run preview
\`\`\`

## 🎨 Customization

### Update Personal Information

1. **Hero Section** (`src/components/Hero.tsx`):
   - Update the title and subtitle text
   - Add your social media links

2. **About Section** (`src/components/About.tsx`):
   - Modify the about text and stats

3. **Skills Section** (`src/components/Skills.tsx`):
   - Update skill categories and levels

4. **Projects Section** (`src/components/Projects.tsx`):
   - Add your own projects with images, descriptions, and links

5. **Contact Section** (`src/components/Contact.tsx`):
   - Update contact information (email, phone, location)

### Customize Colors

Edit `tailwind.config.js` to change the color scheme:

\`\`\`javascript
colors: {
  primary: '#6366f1',    // Indigo
  secondary: '#8b5cf6',  // Purple
  accent: '#ec4899',     // Pink
}
\`\`\`

### Modify Animations

- **Framer Motion**: Edit animation variants in component files
- **GSAP**: Adjust timing and easing in `useEffect` hooks
- **Tailwind**: Customize keyframes in `tailwind.config.js`

## 📂 Project Structure

\`\`\`
my-portfolio/
├── src/
│   ├── components/
│   │   ├── CustomCursor.tsx    # Custom animated cursor
│   │   ├── Hero.tsx            # Hero section with 3D
│   │   ├── Hero3D.tsx          # Three.js 3D scene
│   │   ├── About.tsx           # About section
│   │   ├── Skills.tsx          # Skills with progress bars
│   │   ├── Projects.tsx        # Bento grid projects
│   │   ├── Contact.tsx         # Contact form
│   │   └── SmoothScroll.tsx    # Smooth scroll handler
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
└── package.json
\`\`\`

## 🎯 Key Features Explained

### Custom Cursor
- Smooth following cursor with trailing effect
- Scales on hover over interactive elements
- Built with Framer Motion for fluid animations

### 3D Hero Section
- Animated distorted sphere with metallic material
- 1000 particle field rotating in 3D space
- Auto-rotating camera with OrbitControls
- Optimized for performance

### Scroll Animations
- GSAP ScrollTrigger for reveal animations
- Smooth scroll behavior for anchor links
- Staggered animations for cards and lists
- Parallax effects on background elements

### Bento Grid Layout
- Responsive grid with varying item sizes
- Hover effects with scale and overlay
- Perfect for showcasing projects
- Inspired by Apple's design language

## 🚀 Performance Tips

- Images are lazy-loaded
- Three.js scene is optimized with proper geometry
- Animations use GPU acceleration
- Code-splitting for optimal bundle size
- Tailwind CSS purges unused styles

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🌟 Credits

- Design inspiration from Awwwards
- 3D graphics powered by Three.js
- Animations by Framer Motion & GSAP
- Icons from Lucide
- Images from Unsplash

---

Made with ❤️ and ☕ by [Your Name]
