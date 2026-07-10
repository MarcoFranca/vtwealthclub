import { NextResponse } from "next/server";
import { z } from "zod";

import { isAmbiguousEmailDeliveryError, sendNotificationEmail } from "@/lib/mailer";

// nodemailer precisa do runtime Node (não Edge) e de mais tempo para o SMTP.
export const runtime = "nodejs";
export const maxDuration = 30;

const cotacaoSchema = z.object({
  nome: z.string().min(1),
  email: z.string().email(),
  whatsapp: z.string().min(1),
  servico: z.string().optional(),
  codigoPostal: z.string().optional(),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = cotacaoSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  const { nome, email, whatsapp, servico, codigoPostal } = parsed.data;

  try {
    await sendNotificationEmail({
      subject: `Nova cotação: ${servico || "Serviço não especificado"} — ${nome}`,
      replyTo: email,
      html: `
        <h2>Novo pedido de cotação</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>WhatsApp:</strong> ${whatsapp}</p>
        <p><strong>Serviço de interesse:</strong> ${servico || "Não especificado"}</p>
        <p><strong>Código postal:</strong> ${codigoPostal || "Não informado"}</p>
      `,
    });
  } catch (error) {
    console.error("Erro ao enviar e-mail de cotação:", error);

    if (isAmbiguousEmailDeliveryError(error)) {
      return NextResponse.json(
        {
          ok: true,
          warning: "Cotação recebida, mas a confirmação do servidor de e-mail demorou mais que o esperado.",
        },
        { status: 202 }
      );
    }

    return NextResponse.json(
      { error: "Não foi possível enviar a cotação agora." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
