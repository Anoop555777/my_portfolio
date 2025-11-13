import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Build optimizations
  build: {
    // Generate sourcemaps for production debugging (optional)
    sourcemap: false,
    
    // Reduce chunk size warnings threshold
    chunkSizeWarningLimit: 1000,
    
    // Optimize dependencies
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'animation-vendor': ['framer-motion', 'gsap'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'icons': ['lucide-react'],
        },
        
        // Optimize chunk file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    
    // Minification options
    minify: 'esbuild', // Use esbuild for faster builds
  },
  
  // Optimize dev server
  server: {
    port: 5173,
  },
  
  // Optimize dependencies pre-bundling
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'gsap',
      'lucide-react',
      '@emailjs/browser',
    ],
  },
})
