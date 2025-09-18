import { MapPin, Fuel, Clock, TrendingUp } from 'lucide-react';
import InsightsCard from '../InsightsCard';

export default function InsightsCardExample() {
  const insights = [
    { icon: MapPin, text: '380 km desde último abastecimento' },
    { icon: Fuel, text: 'Autonomia: ~160 km restantes' },
    { icon: Clock, text: 'Próximo abastecimento: em 2 dias' }
  ];

  const alertInsights = [
    { icon: TrendingUp, text: 'Gasolina subiu R$ 0,15 centavos' },
    { icon: MapPin, text: 'Shell Vila: R$ 5,85 (mais barato)' },
    { icon: Clock, text: 'Melhor horário: terça de manhã' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Normal Insights</h3>
        <InsightsCard insights={insights} isAlert={false} />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Alert Insights</h3>
        <InsightsCard insights={alertInsights} isAlert={true} />
      </div>
    </div>
  );
}