import { MapPin, Fuel, Clock, TrendingUp } from 'lucide-react';
import MessageBubble from '../MessageBubble';
import dashboardImage from '@assets/generated_images/Car_dashboard_display_29cbde75.png';

export default function MessageBubbleExample() {
  const userMessage = {
    id: 1,
    type: 'user' as const,
    content: 'Abasteci 42,5L no Shell Centro por R$ 255,30',
    timestamp: '14:30',
    data: { liters: 42.5, price: 255.30, station: 'Shell Centro', km: 45230, kmTraveled: 540 }
  };

  const aiAnalysisMessage = {
    id: 2,
    type: 'kmonitor' as const,
    content: 'Perfeito! Analisei seu abastecimento em detalhes. Seu consumo está excelente e você fez uma boa escolha de posto.',
    timestamp: '14:31',
    showAnalysis: true,
    analysisData: { liters: 42.5, price: 255.30, station: 'Shell Centro', km: 45230, kmTraveled: 540 }
  };

  const imageMessage = {
    id: 3,
    type: 'user' as const,
    content: 'Foto do painel',
    timestamp: '09:15',
    image: dashboardImage,
    isImage: true
  };

  const insightsMessage = {
    id: 4,
    type: 'kmonitor' as const,
    content: 'Identifiquei os dados da sua foto! Quilometragem atual é 44.690 km, com boa autonomia restante.',
    timestamp: '09:16',
    insights: [
      { icon: MapPin, text: '380 km desde último abastecimento' },
      { icon: Fuel, text: 'Autonomia: ~160 km restantes' },
      { icon: Clock, text: 'Próximo abastecimento: em 2 dias' }
    ]
  };

  return (
    <div className="space-y-4 p-4 bg-background">
      <MessageBubble message={userMessage} />
      <MessageBubble message={aiAnalysisMessage} />
      <MessageBubble message={imageMessage} />
      <MessageBubble message={insightsMessage} />
    </div>
  );
}