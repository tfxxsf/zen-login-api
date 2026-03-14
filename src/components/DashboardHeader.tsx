import { Calendar, Moon, Bell, User } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function DashboardHeader() {
  return (
    <header className="border-b border-border/40 bg-background px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Boas vindas, Fabiano</h1>
          <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-foreground"></div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-accent rounded-lg transition-colors">
            <Calendar className="h-5 w-5 text-primary" />
          </button>

          <div className="flex items-center gap-3 px-4 py-2 bg-card rounded-lg border border-border/40">
            <div className="text-sm">
              <span className="font-medium">R$ 1.0K</span>
              <span className="text-muted-foreground"> / R$ 100.0K</span>
            </div>
          </div>

          <button className="p-2 hover:bg-accent rounded-lg transition-colors">
            <Moon className="h-5 w-5" />
          </button>

          <button className="p-2 hover:bg-accent rounded-lg transition-colors">
            <Bell className="h-5 w-5" />
          </button>

          <button className="p-2 hover:bg-accent rounded-lg transition-colors">
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
