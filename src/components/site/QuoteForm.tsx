"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import type { Seguro } from "@/sanity/types";

export function QuoteForm({ seguros, defaultServico }: { seguros: Seguro[]; defaultServico?: string }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      nome: formData.get("nome"),
      email: formData.get("email"),
      whatsapp: formData.get("whatsapp"),
      servico: formData.get("servico"),
      codigoPostal: formData.get("codigoPostal"),
    };

    try {
      const res = await fetch("/api/cotacao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Falha ao enviar");
      toast.success("Cotação enviada! Entraremos em contato em breve.");
      event.currentTarget.reset();
    } catch {
      toast.error("Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="space-y-1.5">
        <Label htmlFor="nome">Nome</Label>
        <Input id="nome" name="nome" placeholder="Renata Silva" required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="renatasilva@exemplo.com" required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="whatsapp">WhatsApp</Label>
        <Input id="whatsapp" name="whatsapp" placeholder="+55 (00) 00000-0000" required />
      </div>
      <div className="space-y-1.5 md:col-span-2">
        <Label htmlFor="servico">Serviço de interesse</Label>
        <NativeSelect id="servico" name="servico" defaultValue={defaultServico} className="w-full">
          <NativeSelectOption value="">Todos os Serviços</NativeSelectOption>
          {seguros.map((seguro) => (
            <NativeSelectOption key={seguro._id} value={seguro.title}>
              {seguro.title}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="codigoPostal">Código Postal</Label>
        <Input id="codigoPostal" name="codigoPostal" placeholder="22222-222" />
      </div>
      <div className="md:col-span-3">
        <Button type="submit" disabled={loading} className="w-full bg-brand-blue hover:bg-brand-blue-dark md:w-auto">
          {loading ? "Enviando..." : "Enviar"}
        </Button>
      </div>
    </form>
  );
}
