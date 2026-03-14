import { useState } from "react";
import { Card } from "@/components/ui/card";
import { User, Shield, Code, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "pessoal", label: "Pessoal", icon: User },
  { id: "seguranca", label: "Segurança", icon: Shield },
  { id: "credenciais", label: "Credenciais", icon: Code },
  { id: "limites", label: "Limites", icon: Globe },
];

export default function Configuracoes() {
  const [activeTab, setActiveTab] = useState("pessoal");

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Configurações</h2>

      <div className="flex gap-6">
        {/* Sidebar tabs */}
        <div className="w-56 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors text-left",
                activeTab === tab.id
                  ? "bg-primary/20 text-primary font-medium"
                  : "text-muted-foreground hover:bg-accent/50"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6">
          {activeTab === "pessoal" && (
            <>
              {/* Profile header */}
              <Card className="p-6 bg-card border-border/40 flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-muted border-2 border-primary/50 flex items-center justify-center">
                  <User className="h-10 w-10 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Fabiano Silva</h3>
                  <p className="text-muted-foreground text-sm">@fabianosil</p>
                  <p className="text-sm mt-1">
                    Status: <span className="text-primary">Conta ativa ✓</span>
                  </p>
                </div>
              </Card>

              {/* Personal info */}
              <Card className="p-6 bg-card border-border/40">
                <h4 className="text-lg font-semibold mb-4">Informações pessoais</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between py-3 border-b border-border/40">
                    <span className="text-sm text-muted-foreground flex items-center gap-2"><User className="h-4 w-4" /> Usuário:</span>
                    <span className="text-sm">fabianosil</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border/40">
                    <span className="text-sm text-muted-foreground flex items-center gap-2"><User className="h-4 w-4" /> Nome:</span>
                    <span className="text-sm">Fabiano Silva</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border/40">
                    <span className="text-sm text-muted-foreground flex items-center gap-2"><Shield className="h-4 w-4" /> Documento:</span>
                    <span className="text-sm">000.000.000-00</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border/40">
                    <span className="text-sm text-muted-foreground flex items-center gap-2"><Globe className="h-4 w-4" /> Email:</span>
                    <span className="text-sm">fabiano@email.com</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm text-muted-foreground flex items-center gap-2"><User className="h-4 w-4" /> Celular:</span>
                    <span className="text-sm">(00) 00000-0000</span>
                  </div>
                </div>
              </Card>

              {/* Taxas */}
              <Card className="p-6 bg-card border-border/40">
                <h4 className="text-lg font-semibold mb-4">Taxas</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between py-3 border-b border-border/40">
                    <span className="text-sm text-muted-foreground">Entrada</span>
                    <span className="text-sm">0.00%</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border/40">
                    <span className="text-sm text-muted-foreground">Taxa Mínima</span>
                    <span className="text-sm">R$ 0.60</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border/40">
                    <span className="text-sm text-muted-foreground">Saque via Dashboard</span>
                    <span className="text-sm">1.50%</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border/40">
                    <span className="text-sm text-muted-foreground">Saque via Api</span>
                    <span className="text-sm">1.50%</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm text-muted-foreground">Saque Cripto</span>
                    <span className="text-sm">3.00%</span>
                  </div>
                </div>
              </Card>
            </>
          )}

          {activeTab === "seguranca" && (
            <Card className="p-6 bg-card border-border/40">
              <h4 className="text-lg font-semibold mb-4">Segurança</h4>
              <p className="text-muted-foreground text-sm">Gerencie suas configurações de segurança, como senha e autenticação de dois fatores.</p>
            </Card>
          )}

          {activeTab === "credenciais" && (
            <Card className="p-6 bg-card border-border/40">
              <h4 className="text-lg font-semibold mb-4">Credenciais API</h4>
              <p className="text-muted-foreground text-sm">Gerencie suas chaves de API para integração.</p>
            </Card>
          )}

          {activeTab === "limites" && (
            <Card className="p-6 bg-card border-border/40">
              <h4 className="text-lg font-semibold mb-4">Limites</h4>
              <p className="text-muted-foreground text-sm">Visualize seus limites de transação e operação.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
