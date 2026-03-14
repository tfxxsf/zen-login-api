import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Headphones, MessageCircle, Send } from "lucide-react";

export default function Gerente() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Fale com seu Gerente</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 bg-card border-border/40 lg:col-span-2">
          <div className="flex flex-col h-[500px]">
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              <p className="text-muted-foreground text-sm text-center">
                Nenhuma mensagem ainda.<br />Inicie uma conversa com seu gerente.
              </p>
            </div>
            <div className="flex gap-3 mt-4">
              <Textarea placeholder="Digite sua mensagem..." className="bg-background resize-none" rows={2} />
              <Button className="self-end"><Send className="h-4 w-4" /></Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border/40">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Headphones className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold">Suporte Dedicado</h3>
            <p className="text-muted-foreground text-sm">
              Seu gerente está disponível para ajudá-lo com dúvidas sobre sua conta, transações e integrações.
            </p>
            <div className="w-full space-y-3 mt-4 text-left">
              <div className="p-3 rounded-lg bg-muted/30">
                <p className="text-xs text-muted-foreground">Horário de atendimento</p>
                <p className="text-sm font-medium">Seg - Sex, 9h às 18h</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/30">
                <p className="text-xs text-muted-foreground">Tempo médio de resposta</p>
                <p className="text-sm font-medium">Até 30 minutos</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
