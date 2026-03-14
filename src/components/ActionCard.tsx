import { LucideIcon, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick?: () => void;
}

export function ActionCard({ title, description, icon: Icon, onClick }: ActionCardProps) {
  return (
    <Card 
      className="p-4 bg-card border-border/40 hover:border-primary/50 hover:bg-card/80 transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold mb-0.5">{title}</h4>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
    </Card>
  );
}
