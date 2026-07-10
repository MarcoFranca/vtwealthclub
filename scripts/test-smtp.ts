import nodemailer from "nodemailer";

// Testa a conexão SMTP conectando pelo IP correto do servidor de e-mail,
// contornando o cache de DNS local (que ainda aponta para o IP antigo).
// O servername garante que o certificado TLS (emitido para mail.vtwealthclub.com.br)
// seja validado corretamente mesmo conectando por IP.
const MAIL_IP = "69.10.55.154";
const MAIL_HOST = process.env.SMTP_HOST || "mail.vtwealthclub.com.br";

async function run() {
  const transporter = nodemailer.createTransport({
    host: MAIL_IP,
    port: Number(process.env.SMTP_PORT || 465),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: { servername: MAIL_HOST },
  });

  console.log(`Conectando em ${MAIL_IP}:465 como ${process.env.SMTP_USER} ...`);
  await transporter.verify();
  console.log("✓ Conexão + autenticação SMTP OK. Enviando e-mail de teste...");

  const info = await transporter.sendMail({
    from: `VT Wealth Club <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
    to: process.env.SMTP_TO_EMAIL || process.env.SMTP_USER,
    subject: "Teste SMTP — site VT Wealth Club (pode ignorar)",
    html: "<p>Se você recebeu este e-mail, o envio dos formulários do site está funcionando. Pode ignorar.</p>",
  });
  console.log("✓ E-mail enviado. messageId:", info.messageId);
  console.log("  aceito por:", info.accepted);
}

run().catch((e) => {
  console.error("✗ Falha no SMTP:", e.message);
  process.exit(1);
});
