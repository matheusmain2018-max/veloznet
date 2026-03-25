import express from "express";
import { Resend } from "resend";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Resend
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "matheusmain2024@gmail.com";

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", resendConfigured: !!resend });
});

// API routes
app.post("/api/contact", async (req, res) => {
  console.log("Recebendo solicitação de contato:", req.body);
  const { name, whatsapp, email, message } = req.body;

  if (!name || !whatsapp || !email || !message) {
    console.warn("Campos obrigatórios ausentes:", { name, whatsapp, email, message });
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  if (!resend) {
    console.warn("RESEND_API_KEY não configurada. Simulando envio de e-mail...");
    console.log("Dados do contato (simulação):", { name, whatsapp, email, message });
    return res.json({ success: true, message: "Simulação de envio concluída com sucesso (API Key ausente)." });
  }

  try {
    console.log("Enviando e-mail via Resend...");
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
      return res.status(500).json({ error: "Falha ao enviar e-mail via Resend.", details: error });
    }

    console.log("E-mail enviado com sucesso:", data);
    res.json({ success: true, data });
  } catch (err) {
    console.error("Erro inesperado no servidor ao processar contato:", err);
    res.status(500).json({ error: "Erro interno do servidor ao processar contato." });
  }
});

// For local development
if (process.env.NODE_ENV !== "production") {
  const startDevServer = async () => {
    const { createServer: createViteServer } = await import("vite");
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
  startDevServer();
}

export default app;
