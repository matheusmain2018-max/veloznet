import express from "express";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Resend
  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
  const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "matheusmain2024@gmail.com";

  // API routes
  app.post("/api/contact", async (req, res) => {
    const { name, whatsapp, email, message } = req.body;

    if (!name || !whatsapp || !email || !message) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    if (!resend) {
      console.warn("RESEND_API_KEY não configurada. Simulando envio de e-mail...");
      console.log("Dados do contato:", { name, whatsapp, email, message });
      return res.json({ success: true, message: "Simulação de envio concluída com sucesso (API Key ausente)." });
    }

    try {
      const { data, error } = await resend.emails.send({
        from: "Veloz Net <onboarding@resend.dev>",
        to: [CONTACT_EMAIL],
        subject: `Novo Contato do Website: ${name}`,
        html: `
          <h2>Novo contato recebido pelo site</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>WhatsApp:</strong> ${whatsapp}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Mensagem:</strong></p>
          <p>${message}</p>
        `,
      });

      if (error) {
        console.error("Erro ao enviar e-mail via Resend:", error);
        return res.status(500).json({ error: "Falha ao enviar e-mail." });
      }

      res.json({ success: true, data });
    } catch (err) {
      console.error("Erro inesperado no servidor:", err);
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  });

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

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
