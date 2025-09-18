import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Mic, Camera, FileText, ArrowUp, ChevronUp, ChevronDown, Activity, ChevronRight } from 'lucide-react';

// Componentes de ícones isolados para melhor performance
const OdometerIcon = React.memo(({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="8" width="18" height="8" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect x="5" y="10" width="2" height="4" rx="0.5" fill="currentColor"/>
    <rect x="8" y="10" width="2" height="4" rx="0.5" fill="currentColor"/>
    <rect x="11" y="10" width="2" height="4" rx="0.5" fill="currentColor"/>
    <rect x="14" y="10" width="2" height="4" rx="0.5" fill="currentColor"/>
    <rect x="17" y="10" width="2" height="4" rx="0.5" fill="currentColor"/>
  </svg>
));

const FuelPumpIcon = React.memo(({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      d="M4 20V6C4 4.89543 4.89543 4 6 4H12C13.1046 4 14 4.89543 14 6V11H16L18 13V18H16V20" 
      stroke="currentColor" 
      strokeWidth="2"
      fill="none"
    />
    <path d="M4 8H14" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 15H18" stroke="currentColor" strokeWidth="2"/>
    <rect x="6" y="6" width="6" height="2" fill="currentColor"/>
  </svg>
));

const FuelTankIcon = React.memo(({ size = 24, className = "", level = 0.6 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="6" y="6" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect 
      x="7" 
      y={6 + (13 * (1 - level))} 
      width="10" 
      height={13 * level} 
      rx="1" 
      fill="currentColor"
      opacity="0.3"
    />
    <rect x="18" y="10" width="2" height="4" rx="1" fill="currentColor"/>
    <path d="M18 12H20" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="13" r="1" fill="currentColor"/>
  </svg>
));

// Hook customizado para gerenciar o textarea
const useTextareaAutoResize = (value) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to calculate new height
      textarea.style.height = 'auto';
      // Set new height based on scroll height
      const newHeight = Math.min(textarea.scrollHeight, 128); // max-h-32 = 128px
      textarea.style.height = `${newHeight}px`;
    }
  }, [value]);

  return textareaRef;
};

export default function ChatInputComponent() {
  const [message, setMessage] = useState('');
  const [selectedItems] = useState(3); // Removido setter não usado
  const [textareaHeight, setTextareaHeight] = useState(78);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(0);
  const [showVehicleSelector, setShowVehicleSelector] = useState(false);

  const containerRef = useRef(null);
  const textareaRef = useTextareaAutoResize(message);

  // Dados dos veículos mockados
  const vehicles = useMemo(() => [
    {
      id: 'civic-2020',
      name: 'Honda Civic',
      year: '2020',
      plate: 'ABC-1234',
      color: 'Prata',
      odometer: '89.450 km',
      lastFuel: {
        amount: '42L',
        date: '15/09/2025',
        pricePerLiter: 'R$ 5,49/L',
        totalPrice: 'R$ 230,58',
        type: 'Gasolina comum'
      },
      tankLevel: {
        percentage: 40,
        remaining: '~24L',
        autonomy: '~300 km',
        efficiency: '12,5 km/L'
      },
      avgConsumption: {
        value: '12,5 km/L',
        change: '+0,3 vs anterior',
        period: 'Últimos 1.000 km'
      },
      alerts: [
        {
          type: 'warning',
          title: 'Combustível baixo',
          message: 'Reste cerca de 300km de autonomia',
          detail: 'Próximo posto: Shell - R. das Palmeiras, 2,3km',
          color: 'amber',
          priority: 'high'
        },
        {
          type: 'info',
          title: 'Próxima revisão',
          message: 'Em ~550km ou 15 dias',
          detail: '90.000km - Revisão dos 90 mil',
          color: 'gray',
          priority: 'medium'
        }
      ]
    },
    {
      id: 'corolla-2019',
      name: 'Toyota Corolla',
      year: '2019',
      plate: 'XYZ-5678',
      color: 'Branco',
      odometer: '125.230 km',
      lastFuel: {
        amount: '38L',
        date: '12/09/2025',
        pricePerLiter: 'R$ 5,35/L',
        totalPrice: 'R$ 203,30',
        type: 'Etanol'
      },
      tankLevel: {
        percentage: 65,
        remaining: '~35L',
        autonomy: '~420 km',
        efficiency: '11,8 km/L'
      },
      avgConsumption: {
        value: '11,8 km/L',
        change: '-0,2 vs anterior',
        period: 'Últimos 1.000 km'
      },
      alerts: [
        {
          type: 'info',
          title: 'Próxima revisão',
          message: 'Em ~770km ou 30 dias',
          detail: '130.000km - Revisão preventiva',
          color: 'gray',
          priority: 'low'
        }
      ]
    },
    {
      id: 'kicks-2021',
      name: 'Nissan Kicks',
      year: '2021',
      plate: 'DEF-9012',
      color: 'Vermelho',
      odometer: '45.680 km',
      lastFuel: {
        amount: '35L',
        date: '10/09/2025',
        pricePerLiter: 'R$ 5,52/L',
        totalPrice: 'R$ 193,20',
        type: 'Gasolina comum'
      },
      tankLevel: {
        percentage: 80,
        remaining: '~40L',
        autonomy: '~520 km',
        efficiency: '13,2 km/L'
      },
      avgConsumption: {
        value: '13,2 km/L',
        change: '+0,1 vs anterior',
        period: 'Últimos 1.000 km'
      },
      alerts: []
    }
  ], []);

  const currentVehicle = vehicles[selectedVehicle];

  // Dados mockados - idealmente viriam de props ou context
  const cardData = useMemo(() => [
    {
      id: 'km',
      title: 'Registrar KM',
      description: 'Atualizar quilometragem atual',
      icon: <OdometerIcon size={20} className="text-gray-600" />,
      bgColor: 'bg-gray-100',
      hoverColor: 'hover:bg-gray-50',
      borderColor: 'border-gray-200'
    },
    {
      id: 'combustivel',
      title: 'Abastecimento',
      description: 'Registrar novo abastecimento',
      icon: <FuelPumpIcon size={20} className="text-gray-600" />,
      bgColor: 'bg-gray-100',
      hoverColor: 'hover:bg-gray-50',
      borderColor: 'border-gray-200'
    },
    {
      id: 'tanque',
      title: 'Nível do Tanque',
      description: 'Atualizar combustível restante',
      icon: <FuelTankIcon size={20} className="text-gray-600" level={0.4} />,
      bgColor: 'bg-gray-100',
      hoverColor: 'hover:bg-gray-50',
      borderColor: 'border-gray-200'
    }
  ], []);

  const vehicleData = useMemo(() => currentVehicle, [currentVehicle]);

  const alerts = useMemo(() => currentVehicle.alerts, [currentVehicle]);

  // Função para atualizar altura do container
  const updateContainerHeight = useCallback(() => {
    if (containerRef.current) {
      const actualHeight = containerRef.current.offsetHeight;
      setTextareaHeight(actualHeight);
    }
  }, []);

  useEffect(() => {
    updateContainerHeight();

    // Fechar dropdown ao clicar fora
    const handleClickOutside = (event) => {
      if (showVehicleSelector && !event.target.closest('.relative')) {
        setShowVehicleSelector(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [message, isExpanded, updateContainerHeight, showVehicleSelector]);

  // Handlers otimizados
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Shift+Enter envia mensagem
        e.preventDefault();
        handleSendMessage();
      }
      // Enter normal permite quebra de linha
    }
  }, []);

  const handleSendMessage = useCallback(() => {
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      console.log('Sending message:', trimmedMessage);
      setMessage('');
    }
  }, [message]);

  const toggleExpansion = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const handleCardClick = useCallback((cardId) => {
    console.log(`Card clicked: ${cardId}`);
    // Aqui você pode implementar a lógica específica para cada card
  }, []);

  const handleToolClick = useCallback((tool) => {
    console.log(`Tool clicked: ${tool}`);
    // Implementar lógica para cada ferramenta
  }, []);

  const handleVehicleChange = useCallback((vehicleIndex) => {
    setSelectedVehicle(vehicleIndex);
    setShowVehicleSelector(false);
  }, []);

  const toggleVehicleSelector = useCallback(() => {
    // Se a seção estiver recolhida, expandir automaticamente
    if (!isExpanded) {
      setIsExpanded(true);
    }
    setShowVehicleSelector(prev => !prev);
  }, [isExpanded]);

  // Render dos cards otimizado
  const renderCards = useCallback(() => (
    <div className="mb-6">
      <div className="mb-3">
        <h3 className="text-base font-medium text-gray-900 mb-1">Ações Rápidas</h3>
        <p className="text-sm text-gray-500">Registre novos dados do seu veículo</p>
      </div>

      <div className="overflow-x-auto scrollbar-hide -mx-4">
        <div className="flex gap-4 px-4 py-2" style={{ width: 'max-content' }}>
          {cardData.map((card) => (
            <button 
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`bg-white rounded-xl p-4 flex flex-col items-center text-center ${card.hoverColor} transition-all duration-200 border ${card.borderColor} hover:shadow-sm group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 w-40 flex-shrink-0 snap-start`}
              aria-label={`${card.title} - ${card.description}`}
            >
              <div className={`${card.bgColor} rounded-lg p-3 mb-3 transition-transform duration-200 group-hover:scale-105`}>
                {card.icon}
              </div>
              <h3 className="text-gray-900 text-base font-medium mb-1">{card.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{card.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  ), [cardData, handleCardClick]);

  // Render dos alertas otimizado
  const renderAlerts = useCallback(() => (
    <div className="mt-8 space-y-3">
      <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Notificações</h4>

      {alerts.map((alert, index) => {
        const colorClasses = {
          amber: {
            bg: 'bg-amber-50',
            border: 'border-amber-100',
            dot: 'bg-amber-400',
            title: 'text-amber-900',
            text: 'text-amber-700'
          },
          gray: {
            bg: 'bg-gray-50',
            border: 'border-gray-100',
            dot: 'bg-gray-400',
            title: 'text-gray-900',
            text: 'text-gray-600'
          }
        };

        const colors = colorClasses[alert.color];
        const isPriority = alert.priority === 'high';

        return (
          <div key={index} className={`${colors.bg} ${colors.border} rounded-xl p-4 flex items-start gap-3 ${isPriority ? 'ring-1 ring-amber-200' : ''}`}>
            <div className={`w-1.5 h-1.5 ${colors.dot} rounded-full mt-2 flex-shrink-0`}></div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${colors.title} mb-1`}>
                {alert.title}
              </p>
              <p className={`text-sm ${colors.text} mb-1`}>
                {alert.message}
              </p>
              <p className={`text-xs ${colors.text} opacity-75`}>
                {alert.detail}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  ), [alerts]);

  const isMessageEmpty = !message.trim();

  return (
    <div className="min-h-screen bg-gray-50 flex items-end">
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {/* Selection Sheet */}
      {selectedItems > 0 && (
        <div 
          className={`fixed left-0 right-0 bottom-0 z-30 transition-all duration-300 ${
            isExpanded ? 'top-0 bg-white rounded-none' : 'bg-gray-800 rounded-t-3xl'
          }`}
          style={{ paddingBottom: `${textareaHeight}px` }}
        >
          {/* Header */}
          <div className={`bg-gray-800 text-white ${isExpanded ? 'rounded-none' : 'rounded-t-3xl'}`}>
            <div className="max-w-4xl mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">Monitor</span>

                  {/* Vehicle Selector */}
                  <div className="relative">
                    <button
                      onClick={toggleVehicleSelector}
                      className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-xs transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30"
                      aria-label="Selecionar veículo"
                    >
                      <span className="font-medium">{currentVehicle.name}</span>
                      <span className="text-gray-300">{currentVehicle.plate}</span>
                      <ChevronRight 
                        size={12} 
                        className={`transition-transform duration-200 ${showVehicleSelector ? 'rotate-90' : ''}`}
                      />
                    </button>

                    {/* Vehicle Dropdown */}
                    {showVehicleSelector && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-40">
                        {vehicles.map((vehicle, index) => (
                          <button
                            key={vehicle.id}
                            onClick={() => handleVehicleChange(index)}
                            className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 ${
                              index === selectedVehicle ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-gray-900 text-sm">
                                  {vehicle.name} {vehicle.year}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {vehicle.plate} • {vehicle.color}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">{vehicle.odometer}</p>
                                <p className="text-xs text-gray-500">KM atual</p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <button 
                  onClick={toggleExpansion}
                  className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                  aria-label={isExpanded ? 'Recolher painel' : 'Expandir painel'}
                >
                  {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                </button>
              </div>
            </div>
          </div>

          {/* Expanded Content */}
          {isExpanded && (
            <div 
              className="flex-1 overflow-y-auto bg-white" 
              style={{ height: `calc(100vh - ${textareaHeight}px - 55px)` }}
            >
              <div className="max-w-4xl mx-auto">
                <div className="px-4 pt-6">
                  {renderCards()}
                </div>

                <div className="px-4 pb-6">
                  {/* Current Data */}
                  <div className="space-y-6">
                    <div className="border-b border-gray-100 pb-4">
                      <h3 className="text-xl font-semibold text-gray-900">Dados do Veículo</h3>
                      <p className="text-sm text-gray-500 mt-1">Informações atualizadas do seu carro</p>
                    </div>

                  <div className="space-y-4">
                    {/* Odometer - Destaque Principal */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="bg-blue-500 rounded-xl p-3">
                            <OdometerIcon size={24} className="text-white" />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">Quilometragem</h4>
                            <p className="text-sm text-gray-500">Odômetro total do veículo</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-3xl font-bold text-gray-900">{vehicleData.odometer}</span>
                        </div>
                      </div>
                    </div>

                    {/* Secondary Data Grid */}
                    <div className="grid gap-4">
                      {/* Last Fuel */}
                      <div className="bg-white border border-gray-200 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="bg-gray-100 rounded-lg p-2">
                              <FuelPumpIcon size={20} className="text-gray-600" />
                            </div>
                            <div>
                              <h4 className="text-base font-medium text-gray-900">Último Abastecimento</h4>
                              <p className="text-xs text-gray-500">{vehicleData.lastFuel.type}</p>
                            </div>
                          </div>
                          <span className="text-xl font-bold text-gray-900">{vehicleData.lastFuel.amount}</span>
                        </div>
                        <div className="ml-11 pt-3 border-t border-gray-100">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-500">{vehicleData.lastFuel.date}</span>
                            <span className="text-gray-700 font-medium">
                              {vehicleData.lastFuel.pricePerLiter} • {vehicleData.lastFuel.totalPrice}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Tank Level */}
                      <div className="bg-white border border-gray-200 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="bg-gray-100 rounded-lg p-2">
                              <FuelTankIcon size={20} className="text-gray-600" level={vehicleData.tankLevel.percentage / 100} />
                            </div>
                            <div>
                              <h4 className="text-base font-medium text-gray-900">Nível do Tanque</h4>
                              <p className="text-xs text-gray-500">Combustível restante</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-xl font-bold text-gray-900">{vehicleData.tankLevel.percentage}%</span>
                            <p className="text-xs text-gray-500">{vehicleData.tankLevel.remaining}</p>
                          </div>
                        </div>
                        <div className="ml-11 pt-3 border-t border-gray-100">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-500">Autonomia estimada</span>
                            <div className="text-right">
                              <span className="text-sm font-medium text-gray-700">{vehicleData.tankLevel.autonomy}</span>
                              <p className="text-gray-500">{vehicleData.tankLevel.efficiency}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Average Consumption */}
                      <div className="bg-white border border-gray-200 rounded-xl p-5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-gray-100 rounded-lg p-2">
                              <Activity size={20} className="text-gray-600" />
                            </div>
                            <div>
                              <h4 className="text-base font-medium text-gray-900">Consumo Médio</h4>
                              <p className="text-xs text-gray-500">{vehicleData.avgConsumption.period}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-xl font-bold text-gray-900">{vehicleData.avgConsumption.value}</span>
                            <p className="text-xs text-green-600 font-medium">{vehicleData.avgConsumption.change}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {renderAlerts()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Chat Input */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 rounded-t-3xl transition-all duration-300" 
        ref={containerRef}
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
              className="w-full focus:outline-none focus:ring-0 text-gray-800 placeholder-gray-500 text-base border-none bg-transparent resize-none min-h-[1.5rem] max-h-32 overflow-y-auto"
              rows={1}
              aria-label="Mensagem de chat"
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
                <button
                  key={index}
                  onClick={() => handleToolClick(label.toLowerCase())}
                  className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  aria-label={label}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>

            <button 
              onClick={handleSendMessage}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-opacity-50 ${
                isMessageEmpty 
                  ? 'bg-gray-100 text-gray-500 opacity-50 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              disabled={isMessageEmpty}
              aria-label="Enviar mensagem"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}