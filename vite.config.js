import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
export default defineConfig({
    base: './',
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src/renderer'),
            '@main': path.resolve(__dirname, 'src/main'),
            '@assets': path.resolve(__dirname, 'src/assets')
        }
    },
    server: {
        port: 6969,
        host: true,
        strictPort: false
    },
    optimizeDeps: {
        include: ['react', 'react-dom', 'react-router-dom', 'zustand', 'lucide-react', 'recharts']
    },
    preview: {
        port: 6970
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                    'charts-vendor': ['recharts'],
                    'icons-vendor': ['lucide-react'],
                    'state-vendor': ['zustand']
                }
            }
        }
    }
});
