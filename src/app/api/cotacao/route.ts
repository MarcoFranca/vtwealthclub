import { NextResponse } from "next/server";
import { z } from "zod";

import { sendNotificationEmail } from "@/lib/mailer";

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
    return NextResponse.json(
      { error: "Não foi possível enviar a cotação agora." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
