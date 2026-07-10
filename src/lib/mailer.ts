import nodemailer from "nodemailer";

const host = process.env.SMTP_HOST;
const port = Number(process.env.SMTP_PORT || 465);
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASSWORD;

export const isMailerConfigured = Boolean(host && user && pass);

const transporter = isMailerConfigured
  ? nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // 465 = SSL implícito; 587 = STARTTLS
      auth: { user, pass },
      // Timeouts explícitos: o SMTP do cPanel pode demorar alguns segundos na
      // conexão/handshake. Sem isso, a função podia estourar o limite do Vercel
      // (e mostrar erro no site mesmo com o e-mail já entregue).
      connectionTimeout: 20000,
      greetingTimeout: 15000,
      socketTimeout: 25000,
    })
  : null;

const FROM_EMAIL = process.env.SMTP_FROM_EMAIL || user || "contato@vtwealthclub.com.br";
const TO_EMAIL = process.env.SMTP_TO_EMAIL || user || "contato@vtwealthclub.com.br";

export async function sendNotificationEmail({
  subject,
  html,
  replyTo,
}: {
  subject: string;
  html: string;
  replyTo?: string;
}) {
  if (!transporter) {
    throw new Error(
      "SMTP não configurado. Defina SMTP_HOST, SMTP_USER e SMTP_PASSWORD em .env.local para os formulários enviarem e-mail."
    );
  }

  return transporter.sendMail({
    from: `VT Wealth Club <${FROM_EMAIL}>`,
    to: TO_EMAIL,
    subject,
    html,
    replyTo,
  });
}
