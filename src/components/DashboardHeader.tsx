import { Calendar, Moon, Bell, User, LogOut } from "lucide-react";
import { useMe, useLogout } from "@/hooks/useApi";

export function DashboardHeader() {
  const { data: user } = useMe();
  const logout = useLogout();

  const displayName = user?.name?.split(" ")[0] ?? "Usuário";

  return (
    <header className="border-b border-border/40 bg-background px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Boas vindas, {displayName}</h1>
          <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-foreground"></div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-accent rounded-lg transition-colors">
            <Calendar className="h-5 w-5 text-primary" />
          </button>

          <button className="p-2 hover:bg-accent rounded-lg transition-colors">
            <Moon className="h-5 w-5" />
          </button>

          <button className="p-2 hover:bg-accent rounded-lg transition-colors">
            <Bell className="h-5 w-5" />
          </button>

          <button className="p-2 hover:bg-accent rounded-lg transition-colors">
            <User className="h-5 w-5" />
          </button>

          <button
            onClick={() => logout.mutate()}
            className="p-2 hover:bg-destructive/20 rounded-lg transition-colors"
            title="Sair"
          >
            <LogOut className="h-5 w-5 text-destructive" />
          </button>
        </div>
      </div>
    </header>
  );
}
