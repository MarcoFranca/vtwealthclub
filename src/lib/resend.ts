import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

export const isResendConfigured = Boolean(apiKey);

const resend = apiKey ? new Resend(apiKey) : null;

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "VT Wealth Club <onboarding@resend.dev>";
const TO_EMAIL = process.env.RESEND_TO_EMAIL || "contato@vtwealthclub.com.br";

export async function sendNotificationEmail({
  subject,
  html,
  replyTo,
}: {
  subject: string;
  html: string;
  replyTo?: string;
}) {
  if (!resend) {
    throw new Error(
      "RESEND_API_KEY não configurada. Adicione a chave em .env.local para os formulários enviarem e-mail."
    );
  }

  return resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    subject,
    html,
    replyTo,
  });
}
