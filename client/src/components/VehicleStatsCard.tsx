import { Car } from 'lucide-react';

interface VehicleStatsCardProps {
  isActive?: boolean;
}

export default function VehicleStatsCard({ isActive = false }: VehicleStatsCardProps) {
  // todo: remove mock functionality
  const stats = {
    totalKm: 45750,
    avgConsumption: 12.9,
    totalSpent: 1250.80,
    fuelUps: 24
  };

  return (
    <div className={`bg-card border border-card-border rounded-xl p-5 mb-3 shadow-sm ${
      isActive ? 'ring-1 ring-muted-foreground/30' : ''
    }`} data-testid="card-vehicle-stats">
      <div className="flex items-center gap-3 mb-4">
        <div className={`rounded-xl p-3 ${isActive ? 'bg-primary' : 'bg-muted'}`}>
          <Car className={`w-5 h-5 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
        </div>
        <div>
          <h3 className="text-base font-semibold text-card-foreground">Estatísticas</h3>
          <p className="text-xs text-muted-foreground">Resumo do veículo</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-muted rounded-xl p-3" data-testid="stat-total-km">
          <p className="text-xs text-muted-foreground mb-1 font-medium">Total KM</p>
          <p className="text-base font-bold text-card-foreground">{stats.totalKm.toLocaleString()}</p>
        </div>
        <div className="bg-muted rounded-xl p-3" data-testid="stat-avg-consumption">
          <p className="text-xs text-muted-foreground mb-1 font-medium">Consumo Médio</p>
          <p className="text-base font-bold text-card-foreground">{stats.avgConsumption} km/L</p>
        </div>
        <div className="bg-muted rounded-xl p-3" data-testid="stat-total-spent">
          <p className="text-xs text-muted-foreground mb-1 font-medium">Gasto Total</p>
          <p className="text-base font-bold text-card-foreground">R$ {stats.totalSpent.toFixed(0)}</p>
        </div>
        <div className="bg-muted rounded-xl p-3" data-testid="stat-fuel-ups">
          <p className="text-xs text-muted-foreground mb-1 font-medium">Abastecimentos</p>
          <p className="text-base font-bold text-card-foreground">{stats.fuelUps}</p>
        </div>
      </div>
    </div>
  );
}