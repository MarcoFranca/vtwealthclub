import { NextResponse } from "next/server";
import { z } from "zod";

import { sendNotificationEmail } from "@/lib/mailer";

// nodemailer precisa do runtime Node (não Edge) e de mais tempo para o SMTP.
export const runtime = "nodejs";
export const maxDuration = 30;

const contatoSchema = z.object({
  nome: z.string().min(1),
  email: z.string().email(),
  whatsapp: z.string().optional(),
  mensagem: z.string().min(1),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contatoSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  const { nome, email, whatsapp, mensagem } = parsed.data;

  try {
    await sendNotificationEmail({
      subject: `Nova mensagem de contato — ${nome}`,
      replyTo: email,
      html: `
        <h2>Nova mensagem pelo formulário de contato</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>WhatsApp:</strong> ${whatsapp || "Não informado"}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${mensagem.replace(/\n/g, "<br/>")}</p>
      `,
    });
  } catch (error) {
    console.error("Erro ao enviar e-mail de contato:", error);
    return NextResponse.json(
      { error: "Não foi possível enviar a mensagem agora." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
