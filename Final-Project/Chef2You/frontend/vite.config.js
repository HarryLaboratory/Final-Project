import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 5173,  
    host: '0.0.0.0',  
    allowedHosts: ['final-project-frontend-tngm.onrender.com'],
  },
  define: {
    'process.env': {
      VITE_API_URL: '"https://final-project-0kbv.onrender.com/api"', 
    },
  },
});


