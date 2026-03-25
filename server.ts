import app from "./api/index.ts";
import { createServer as createViteServer } from "vite";

const startDevServer = async () => {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  
  app.use(vite.middlewares);
  
  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Dev server running on http://localhost:${PORT}`);
  });
};

if (process.env.NODE_ENV !== "production") {
  startDevServer();
} else {
  // In production (if not on Vercel), we'd serve static files
  // But on Vercel, api/index.ts is used directly.
}
