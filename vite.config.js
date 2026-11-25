import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

function localApiMiddlewarePlugin() {
  return {
    name: 'local-vercel-api-dev',
    configureServer(server) {
      const env = loadEnv('development', process.cwd(), '');
      Object.assign(process.env, env);

      server.middlewares.use(async (req, res, next) => {
        if (req.url !== '/api/try-on' && req.url !== '/api/rag-chat') {
          return next();
        }

        const chunks = [];
        req.on('data', (c) => chunks.push(c));
        req.on('end', async () => {
          try {
            const raw = Buffer.concat(chunks).toString('utf8');
            req.body = raw ? JSON.parse(raw) : {};
          } catch {
            req.body = {};
          }

          const wrappedRes = {
            statusCode: 200,
            status(code) {
              this.statusCode = code;
              return this;
            },
            json(payload) {
              res.statusCode = this.statusCode;
              res.setHeader('Content-Type', 'application/json; charset=utf-8');
              res.end(JSON.stringify(payload));
            }
          };

          try {
            const mod =
              req.url === '/api/try-on'
                ? await import('./api/try-on.js')
                : await import('./api/rag-chat.js');
            await mod.default(req, wrappedRes);
          } catch (err) {
            wrappedRes.status(500).json({ error: err?.message || 'Local API error' });
          }
        });
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [tailwindcss(), react(), localApiMiddlewarePlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three') || id.includes('@react-three')) {
            return 'vendor-three';
          }
          if (id.includes('node_modules/@supabase')) {
            return 'vendor-supabase';
          }
          if (id.includes('node_modules/qrcode') || id.includes('canvas-confetti')) {
            return 'vendor-media';
          }
        }
      }
    }
  },
  test: {
    environment: 'node'
  }
});
