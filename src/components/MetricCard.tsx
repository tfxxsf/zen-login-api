import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
}

export function MetricCard({ title, value, description, icon: Icon, iconColor = "text-primary" }: MetricCardProps) {
  return (
    <Card className="p-6 bg-card border-border/40 hover:border-primary/50 transition-all">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-2">{title}</p>
          <h3 className="text-2xl font-bold mb-1">{value}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <div className={`p-3 rounded-lg bg-primary/10 ${iconColor}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
}
