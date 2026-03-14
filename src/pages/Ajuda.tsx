import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, HelpCircle, FileText, CreditCard, Shield, Code } from "lucide-react";

const topics = [
  { icon: CreditCard, title: "Transações", description: "Como funcionam as transações PIX, taxas e prazos." },
  { icon: Shield, title: "Segurança", description: "Autenticação, proteção da conta e boas práticas." },
  { icon: Code, title: "API & Integração", description: "Documentação da API, credenciais e webhooks." },
  { icon: FileText, title: "Relatórios", description: "Como exportar e interpretar seus relatórios." },
  { icon: HelpCircle, title: "Conta", description: "Gerenciamento de conta, limites e verificação." },
  { icon: CreditCard, title: "Saques", description: "Como realizar saques via PIX e Cripto." },
];

export default function Ajuda() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Central de Ajuda</h2>

      <div className="relative max-w-lg">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Pesquisar na central de ajuda..." className="pl-10 bg-card border-border/40" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((topic) => (
          <Card key={topic.title} className="p-6 bg-card border-border/40 hover:border-primary/50 transition-all cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <topic.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{topic.title}</h3>
                <p className="text-sm text-muted-foreground">{topic.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
