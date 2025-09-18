import { useState } from 'react';
import { BarChart3, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConsumptionTrendsCardProps {
  isActive?: boolean;
}

export default function ConsumptionTrendsCard({ isActive = false }: ConsumptionTrendsCardProps) {
  const [expandedSection, setExpandedSection] = useState(false);
  
  // todo: remove mock functionality
  const monthlyData = [
    { month: 'Jan', consumption: 12.5, efficiency: 'boa' },
    { month: 'Fev', consumption: 13.2, efficiency: 'excelente' },
    { month: 'Mar', consumption: 12.8, efficiency: 'boa' },
    { month: 'Abr', consumption: 13.1, efficiency: 'excelente' }
  ];

  return (
    <div className={`bg-card border border-card-border rounded-xl p-5 mb-3 shadow-sm ${
      isActive ? 'ring-1 ring-muted-foreground/30' : ''
    }`} data-testid="card-consumption-trends">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => {
          setExpandedSection(!expandedSection);
          console.log('Consumption trends section toggled');
        }}
      >
        <div className="flex items-center gap-3">
          <div className={`rounded-xl p-3 ${isActive ? 'bg-primary' : 'bg-muted'}`}>
            <BarChart3 className={`w-5 h-5 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-card-foreground">Tendências</h3>
            <p className="text-xs text-muted-foreground">Últimos meses</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="hover-elevate"
          data-testid="button-toggle-trends"
        >
          {expandedSection ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </Button>
      </div>
      
      {expandedSection && (
        <div className="mt-4 pt-4 border-t border-border space-y-3" data-testid="expanded-trends-data">
          {monthlyData.map((data, index) => (
            <div key={index} className="flex items-center justify-between py-2" data-testid={`trend-item-${index}`}>
              <span className="text-sm text-muted-foreground font-medium">{data.month}</span>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-card-foreground">{data.consumption} km/L</span>
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                  data.efficiency === 'excelente' 
                    ? 'bg-chart-1/10 text-chart-1 border border-chart-1/20' 
                    : 'bg-chart-3/10 text-chart-3 border border-chart-3/20'
                }`}>
                  {data.efficiency}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}