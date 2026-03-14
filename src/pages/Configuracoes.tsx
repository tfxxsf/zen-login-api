import { useState } from "react";
import { Card } from "@/components/ui/card";
import { User, Shield, Code, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMe } from "@/hooks/useApi";
import { Skeleton } from "@/components/ui/skeleton";

const tabs = [
  { id: "pessoal", label: "Pessoal", icon: User },
  { id: "seguranca", label: "Segurança", icon: Shield },
  { id: "credenciais", label: "Credenciais", icon: Code },
  { id: "limites", label: "Limites", icon: Globe },
];

export default function Configuracoes() {
  const [activeTab, setActiveTab] = useState("pessoal");
  const { data: user, isLoading } = useMe();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Configurações</h2>

      <div className="flex gap-6">
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

        <div className="flex-1 space-y-6">
          {activeTab === "pessoal" && (
            <>
              <Card className="p-6 bg-card border-border/40 flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-muted border-2 border-primary/50 flex items-center justify-center">
                  <User className="h-10 w-10 text-muted-foreground" />
                </div>
                <div>
                  {isLoading ? (
                    <>
                      <Skeleton className="h-6 w-40 mb-2" />
                      <Skeleton className="h-4 w-24" />
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold">{user?.name ?? "—"}</h3>
                      <p className="text-muted-foreground text-sm">@{user?.username ?? "—"}</p>
                      <p className="text-sm mt-1">
                        Status: <span className="text-primary">{user?.status ?? "Conta ativa"} ✓</span>
                      </p>
                    </>
                  )}
                </div>
              </Card>

              <Card className="p-6 bg-card border-border/40">
                <h4 className="text-lg font-semibold mb-4">Informações pessoais</h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: User, label: "Usuário", value: user?.username },
                    { icon: User, label: "Nome", value: user?.name },
                    { icon: Shield, label: "Documento", value: user?.document },
                    { icon: Globe, label: "Email", value: user?.email },
                    { icon: User, label: "Celular", value: user?.phone },
                  ].map((item, i) => (
                    <div key={i} className={cn("flex items-center justify-between py-3", i < 4 && "border-b border-border/40")}>
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <item.icon className="h-4 w-4" /> {item.label}:
                      </span>
                      {isLoading ? <Skeleton className="h-4 w-28" /> : <span className="text-sm">{item.value ?? "—"}</span>}
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-card border-border/40">
                <h4 className="text-lg font-semibold mb-4">Taxas</h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Entrada", value: user?.fees?.entrada ?? "0.00%" },
                    { label: "Taxa Mínima", value: user?.fees?.taxa_minima ?? "R$ 0.60" },
                    { label: "Saque via Dashboard", value: user?.fees?.saque_dashboard ?? "1.50%" },
                    { label: "Saque via Api", value: user?.fees?.saque_api ?? "1.50%" },
                    { label: "Saque Cripto", value: user?.fees?.saque_cripto ?? "3.00%" },
                  ].map((item, i) => (
                    <div key={i} className={cn("flex items-center justify-between py-3", i < 4 && "border-b border-border/40")}>
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                      {isLoading ? <Skeleton className="h-4 w-16" /> : <span className="text-sm">{item.value}</span>}
                    </div>
                  ))}
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
