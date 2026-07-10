"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading || submitted) return;

    const form = event.currentTarget;
    setLoading(true);

    const formData = new FormData(form);
    const payload = {
      nome: formData.get("nome"),
      whatsapp: formData.get("whatsapp"),
      email: formData.get("email"),
      mensagem: formData.get("mensagem"),
    };

    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || data?.ok === false) {
        throw new Error(data?.error || "Falha ao enviar");
      }
      toast.success("Mensagem enviada! Retornaremos em breve.");
      setSubmitted(true);
      form.reset();
    } catch {
      toast.error("Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="nome">Nome</Label>
          <Input id="nome" name="nome" placeholder="Fernando" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="whatsapp">WhatsApp</Label>
          <Input id="whatsapp" name="whatsapp" placeholder="+55 (00) 00000-0000" />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="fernando@teste.com" required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="mensagem">Mensagem</Label>
        <Textarea id="mensagem" name="mensagem" rows={5} placeholder="Como podemos ajudar?" required />
      </div>
      <Button type="submit" disabled={loading || submitted} className="bg-brand-blue hover:bg-brand-blue-dark">
        {loading ? "Enviando..." : submitted ? "Mensagem enviada" : "Envie a sua mensagem"}
      </Button>
    </form>
  );
}
