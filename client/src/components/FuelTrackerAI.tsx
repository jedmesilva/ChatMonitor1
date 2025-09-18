import { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowUp, Mic, Camera, FileText, MapPin, Fuel, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MessageBubble from './MessageBubble';
import ExpandableDataSection from './ExpandableDataSection';
import dashboardImage from '@assets/generated_images/Car_dashboard_display_29cbde75.png';

export default function FuelTrackerAI() {
  // todo: remove mock functionality
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'user' as const,
      content: 'Abasteci 42,5L no Shell Centro por R$ 255,30',
      timestamp: '14:30',
      data: { liters: 42.5, price: 255.30, station: 'Shell Centro', km: 45230, kmTraveled: 540 }
    },
    {
      id: 2,
      type: 'kmonitor' as const,
      content: 'Perfeito! Analisei seu abastecimento em detalhes. Seu consumo está excelente e você fez uma boa escolha de posto.',
      timestamp: '14:31',
      showAnalysis: true,
      analysisData: { liters: 42.5, price: 255.30, station: 'Shell Centro', km: 45230, kmTraveled: 540 }
    },
    {
      id: 3,
      type: 'user' as const,
      content: 'Foto do painel',
      timestamp: '09:15',
      image: dashboardImage,
      isImage: true
    },
    {
      id: 4,
      type: 'kmonitor' as const,
      content: 'Identifiquei os dados da sua foto! Quilometragem atual é 44.690 km, com boa autonomia restante.',
      timestamp: '09:16',
      insights: [
        { icon: MapPin, text: '380 km desde último abastecimento' },
        { icon: Fuel, text: 'Autonomia: ~160 km restantes' },
        { icon: Clock, text: 'Próximo abastecimento: em 2 dias' }
      ]
    },
    {
      id: 5,
      type: 'kmonitor' as const,
      content: 'Alerta de preços na sua região! Encontrei oportunidades de economia.',
      timestamp: 'Ontem 19:20',
      isAlert: true,
      insights: [
        { icon: TrendingUp, text: 'Gasolina subiu R$ 0,15 centavos' },
        { icon: MapPin, text: 'Shell Vila: R$ 5,85 (mais barato)' },
        { icon: Clock, text: 'Melhor horário: terça de manhã' }
      ]
    },
    {
      id: 6,
      type: 'user' as const,
      content: 'Como está meu consumo médio?',
      timestamp: 'Agora'
    },
    {
      id: 7,
      type: 'kmonitor' as const,
      content: 'Seu consumo está muito bom! Veja os detalhes e tendências dos últimos meses:',
      timestamp: 'Agora',
      showTrends: true
    }
  ]);

  const [message, setMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState(78);
  const [selectedItems] = useState(3); // Mock selected items to show expandable section

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isMessageEmpty = !message.trim();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const updateContainerHeight = useCallback(() => {
    if (containerRef.current) {
      const actualHeight = containerRef.current.offsetHeight;
      setTextareaHeight(actualHeight);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    updateContainerHeight();
  }, [message, isExpanded, updateContainerHeight]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newUserMessage = {
      id: messages.length + 1,
      type: 'user' as const,
      content: message,
      timestamp: 'Agora'
    };

    setMessages(prev => [...prev, newUserMessage]);
    setMessage('');
    console.log('Message sent:', message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleToolClick = (tool: string) => {
    console.log(`${tool} clicked`);
  };

  const toggleExpansion = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-end" data-testid="fuel-tracker-main">
      <style dangerouslySetInnerHTML={{
        __html: `
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `
      }} />

      {/* Header - Only show when section is not expanded */}
      {!isExpanded && (
        <header className="fixed top-0 left-0 right-0 z-40 bg-card border-b border-border p-4 shadow-sm" data-testid="app-header">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-lg font-bold text-primary-foreground">K</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-card-foreground">Kmonitor</h1>
              <p className="text-sm text-muted-foreground">Seu assistente de combustível</p>
            </div>
          </div>
        </header>
      )}

      {/* Messages Timeline */}
      <div 
        className={`flex-1 overflow-y-auto p-4 space-y-4 w-full ${
          !isExpanded ? 'pt-20' : 'pt-4'
        }`}
        style={{ 
          paddingBottom: selectedItems > 0 ? 
            (isExpanded ? `${textareaHeight + 55}px` : `${textareaHeight + 100}px`) : 
            `${textareaHeight}px` 
        }}
        data-testid="messages-timeline"
      >
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Expandable Data Section */}
      <ExpandableDataSection
        isVisible={selectedItems > 0}
        isExpanded={isExpanded}
        onToggleExpansion={toggleExpansion}
        textareaHeight={textareaHeight}
      />

      {/* Chat Input */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border rounded-t-3xl transition-all duration-300" 
        ref={containerRef}
        data-testid="chat-input-container"
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          {/* Textarea */}
          <div className="mb-4">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Digite sua mensagem aqui..."
              className="w-full focus:outline-none focus:ring-0 text-card-foreground placeholder-muted-foreground text-base border-none bg-transparent resize-none min-h-[1.5rem] max-h-32 overflow-y-auto"
              rows={1}
              data-testid="input-message"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {[
                { icon: Mic, label: 'Gravar áudio' },
                { icon: Camera, label: 'Tirar foto' },
                { icon: FileText, label: 'Anexar arquivo' }
              ].map(({ icon: Icon, label }, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  onClick={() => handleToolClick(label.toLowerCase())}
                  className="hover-elevate"
                  data-testid={`button-${label.toLowerCase().replace(' ', '-')}`}
                >
                  <Icon size={16} />
                </Button>
              ))}
            </div>

            <Button
              onClick={handleSendMessage}
              size="icon"
              variant={isMessageEmpty ? 'ghost' : 'default'}
              disabled={isMessageEmpty}
              className={`hover-elevate ${isMessageEmpty ? 'opacity-50' : ''}`}
              data-testid="button-send-message"
            >
              <ArrowUp size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}