import express from "express";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
import path from "path";
import { fileURLToPath } from "url";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Initialize Resend - Move inside the route to ensure it picks up env vars in serverless
app.post("/api/contact", async (req, res) => {
  const { name, whatsapp, email, message } = req.body;

  // Log for debug (visible in Vercel Logs)
  console.log("Tentativa de envio de contato:", { name, email });

  if (!name || !whatsapp || !email || !message) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("ERRO: RESEND_API_KEY não encontrada nas variáveis de ambiente!");
    return res.status(500).json({ error: "Configuração do servidor incompleta (API Key ausente)." });
  }

  const resend = new Resend(apiKey);
  const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "matheusmain2024@gmail.com";

  try {
    const { data, error } = await resend.emails.send({
      from: "Veloz Net <onboarding@resend.dev>",
      to: [CONTACT_EMAIL],
      subject: `Novo Contato: ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #0066ff;">Novo contato recebido pelo site</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>WhatsApp:</strong> ${whatsapp}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <hr />
          <p><strong>Mensagem:</strong></p>
          <p style="background: #f4f4f4; padding: 15px; border-radius: 5px;">${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Erro retornado pelo Resend:", error);
      return res.status(500).json({ 
        error: `Erro no serviço de e-mail: ${error.message}`,
        details: error 
      });
    }

    console.log("E-mail enviado com sucesso:", data);
    res.json({ success: true, data });
  } catch (err) {
    console.error("Erro fatal no servidor:", err);
    res.status(500).json({ error: "Erro interno ao processar o envio." });
  }
});

// Export the app for Vercel
export default app;

async function startServer() {
  const PORT = 3000;

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Only listen if not in a serverless environment (Vercel handles listening)
  if (!process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}

startServer();
