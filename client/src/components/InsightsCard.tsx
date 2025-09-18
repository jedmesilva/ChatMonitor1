import { LucideIcon } from 'lucide-react';

interface Insight {
  icon: LucideIcon;
  text: string;
}

interface InsightsCardProps {
  insights?: Insight[];
  isAlert?: boolean;
}

export default function InsightsCard({ insights = [], isAlert = false }: InsightsCardProps) {
  return (
    <div className="space-y-3 mb-4" data-testid="insights-container">
      {insights.map((insight, index) => {
        const colorClasses = isAlert ? {
          bg: 'bg-chart-3/10',
          border: 'border-chart-3/20',
          icon: 'text-chart-3',
          text: 'text-chart-3'
        } : {
          bg: 'bg-muted',
          border: 'border-border',
          icon: 'text-muted-foreground',
          text: 'text-card-foreground'
        };

        return (
          <div 
            key={index} 
            className={`${colorClasses.bg} ${colorClasses.border} border rounded-xl p-4`}
            data-testid={`insight-item-${index}`}
          >
            <div className="flex items-center gap-3">
              <insight.icon className={`w-4 h-4 ${colorClasses.icon}`} />
              <span className={`text-sm font-medium ${colorClasses.text}`}>{insight.text}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}