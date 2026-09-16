import { defineConfig, loadEnv } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function vercelApiPlugin() {
  return {
    name: 'vercel-api-plugin',
    configureServer(server) {
      // Load environment variables from .env and put them in process.env
      const env = loadEnv(server.config.mode, process.cwd(), '');
      Object.assign(process.env, env);

      server.middlewares.use(async (req, res, next) => {
        if (req.url.startsWith('/api/')) {
          const route = req.url.split('?')[0]; // e.g. /api/login
          const filePath = path.resolve(__dirname, `.${route}.js`);
          
          if (fs.existsSync(filePath)) {
            let body = '';
            req.on('data', chunk => { body += chunk.toString(); });
            req.on('end', async () => {
              try {
                req.body = body ? JSON.parse(body) : {};
              } catch(e) {
                req.body = {};
              }
              
              try {
                // For ES module vite.config.js, we can use dynamic import
                // appending a timestamp to bypass cache
                const module = await import(`file://${filePath}?update=${Date.now()}`);
                const handler = module.default || module.handler || (module.module && module.module.exports) || module;
                
                // Polyfill Vercel's res.status() and res.json()
                res.status = (code) => { res.statusCode = code; return res; };
                res.json = (data) => {
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(data));
                };
                
                // Run the API handler
                if (typeof handler === 'function') {
                  await handler(req, res);
                } else if (typeof handler.default === 'function') {
                  await handler.default(req, res);
                } else {
                  res.status(500).json({ error: 'Handler not found in ' + route });
                }
              } catch (err) {
                console.error('API Error:', err);
                if (res.status) {
                  res.status(500).json({ error: 'Internal Server Error: ' + err.message });
                } else {
                  res.statusCode = 500;
                  res.end('Internal Server Error');
                }
              }
            });
            return; // Don't call next(), we handled it
          }
        }
        next();
      });
    }
  }
}

export default defineConfig({
  plugins: [vercelApiPlugin()],
});
