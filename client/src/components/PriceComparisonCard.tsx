import { DollarSign, MapPin } from 'lucide-react';

interface PriceComparisonCardProps {
  currentPrice?: number;
  isActive?: boolean;
}

export default function PriceComparisonCard({ currentPrice, isActive = false }: PriceComparisonCardProps) {
  // todo: remove mock functionality
  const nearbyStations = [
    { name: 'Shell Vila', price: 5.85, distance: 2.1, savings: -0.16 },
    { name: 'Petrobras Centro', price: 6.15, distance: 1.5, savings: 0.14 },
    { name: 'Ipiranga Norte', price: 5.92, distance: 3.2, savings: -0.09 }
  ];

  return (
    <div className={`bg-card border border-card-border rounded-xl p-5 mb-3 shadow-sm ${
      isActive ? 'ring-1 ring-muted-foreground/30' : ''
    }`} data-testid="card-price-comparison">
      <div className="flex items-center gap-3 mb-4">
        <div className={`rounded-xl p-3 ${isActive ? 'bg-primary' : 'bg-muted'}`}>
          <DollarSign className={`w-5 h-5 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
        </div>
        <div>
          <h3 className="text-base font-semibold text-card-foreground">Preços Próximos</h3>
          <p className="text-xs text-muted-foreground">Postos na região</p>
        </div>
      </div>
      
      <div className="space-y-3">
        {nearbyStations.map((station, index) => (
          <div key={index} className="bg-muted rounded-xl p-3" data-testid={`station-item-${index}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <div>
                  <span className="text-sm font-medium text-card-foreground">{station.name}</span>
                  <p className="text-xs text-muted-foreground">{station.distance}km</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-card-foreground">R$ {station.price.toFixed(2)}</span>
                <p className={`text-xs font-medium ${station.savings < 0 ? 'text-chart-1' : 'text-destructive'}`}>
                  {station.savings < 0 ? '↓' : '↑'} {Math.abs(station.savings).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}