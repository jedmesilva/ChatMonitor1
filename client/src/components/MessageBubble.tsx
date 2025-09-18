import { LucideIcon } from 'lucide-react';
import FuelAnalysisCard from './FuelAnalysisCard';
import PriceComparisonCard from './PriceComparisonCard';
import ConsumptionTrendsCard from './ConsumptionTrendsCard';
import VehicleStatsCard from './VehicleStatsCard';
import InsightsCard from './InsightsCard';

interface Message {
  id: number;
  type: 'user' | 'kmonitor';
  content: string;
  timestamp: string;
  data?: {
    liters: number;
    price: number;
    station: string;
    km: number;
    kmTraveled: number;
  };
  showAnalysis?: boolean;
  analysisData?: {
    liters: number;
    price: number;
    station: string;
    km: number;
    kmTraveled: number;
  };
  showTrends?: boolean;
  insights?: Array<{ icon: LucideIcon; text: string }>;
  isAlert?: boolean;
  isImage?: boolean;
  image?: string;
}

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.type === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`} data-testid={`message-${message.id}`}>
      <div className={`${isUser ? 'max-w-[85%]' : 'w-full'} rounded-2xl p-5 shadow-sm border ${
        isUser 
          ? 'bg-primary border-primary-border text-primary-foreground' 
          : 'bg-card border-card-border text-card-foreground'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            {!isUser && (
              <div className="w-7 h-7 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">C</span>
              </div>
            )}
            <span className={`text-xs font-medium ${
              isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
            }`}>
              {isUser ? 'Você' : 'ChatMonitor'}
            </span>
          </div>
          <span className={`text-xs ${
            isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
          }`}>
            {message.timestamp}
          </span>
        </div>

        {/* Content */}
        <div className={`${
          (message.showAnalysis || message.showTrends || message.insights) ? 'mb-4' : 'mb-0'
        }`}>
          {message.isImage ? (
            <div>
              <p className={`mb-3 ${isUser ? 'text-primary-foreground' : 'text-card-foreground'}`}>
                {message.content}
              </p>
              <img 
                src={message.image} 
                alt="Upload" 
                className="rounded-xl max-w-full h-auto border border-border" 
                data-testid="message-image"
              />
            </div>
          ) : (
            <p className={isUser ? 'text-primary-foreground' : 'text-card-foreground'}>
              {message.content}
            </p>
          )}
        </div>

        {/* Análise Completa de Combustível */}
        {message.showAnalysis && (
          <div className="space-y-4" data-testid="analysis-section">
            <FuelAnalysisCard fuelData={message.analysisData} isActive={true} />
            <PriceComparisonCard currentPrice={message.analysisData?.price ? message.analysisData.price / message.analysisData.liters : undefined} isActive={false} />
            <ConsumptionTrendsCard isActive={false} />
            <VehicleStatsCard isActive={false} />
          </div>
        )}

        {/* Tendências apenas */}
        {message.showTrends && (
          <div className="space-y-4" data-testid="trends-section">
            <ConsumptionTrendsCard isActive={true} />
            <VehicleStatsCard isActive={true} />
          </div>
        )}

        {/* Insights */}
        {message.insights && (
          <InsightsCard insights={message.insights} isAlert={message.isAlert} />
        )}
      </div>
    </div>
  );
}