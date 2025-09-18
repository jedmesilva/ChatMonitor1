import { Activity, TrendingUp, DollarSign, CheckCircle } from 'lucide-react';

interface FuelAnalysisCardProps {
  fuelData?: {
    liters: number;
    price: number;
    station: string;
    km: number;
    kmTraveled: number;
  };
  isActive?: boolean;
}

export default function FuelAnalysisCard({ fuelData, isActive = false }: FuelAnalysisCardProps) {
  const analysisResults = {
    consumption: '12.7',
    efficiency: 'excelente',
    cost: '6.01',
    comparison: 'melhor'
  };

  return (
    <div className={`bg-card border border-card-border rounded-xl p-5 mb-3 shadow-sm ${
      isActive ? 'ring-1 ring-muted-foreground/30' : ''
    }`} data-testid="card-fuel-analysis">
      <div className="flex items-center gap-3 mb-4">
        <div className={`rounded-xl p-3 ${isActive ? 'bg-primary' : 'bg-muted'}`}>
          <Activity className={`w-5 h-5 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-card-foreground">Análise de Abastecimento</h3>
          <p className="text-xs text-muted-foreground">Último abastecimento</p>
        </div>
        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-chart-1/10 text-chart-1 border border-chart-1/20">
          <CheckCircle className="w-3 h-3 mr-1" />
          OK
        </span>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-muted-foreground">Volume</span>
          <span className="text-sm font-bold text-card-foreground">{fuelData?.liters || 42.5}L</span>
        </div>
        
        <div className="bg-muted rounded-xl p-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-medium">Consumo</span>
            </div>
            <span className="text-sm font-bold text-card-foreground">{analysisResults.consumption} km/L</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-medium">Preço/L</span>
            </div>
            <span className="text-sm font-bold text-card-foreground">R$ {analysisResults.cost}</span>
          </div>
        </div>
      </div>
    </div>
  );
}