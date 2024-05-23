import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          icon: true,
        },
      }),
    ],
    define: {
      'process.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
      'process.env.VITE_API_USER_ID': JSON.stringify(env.VITE_API_USER_ID),
      'process.env.VITE_API_USER_PASSWORD': JSON.stringify(
        env.VITE_API_USER_PASSWORD,
      ),
    },
  };
});
