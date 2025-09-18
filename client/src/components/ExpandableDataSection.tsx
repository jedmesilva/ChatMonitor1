import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { ChevronUp, ChevronDown, ChevronRight, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OdometerIcon, FuelPumpIcon, FuelTankIcon } from './icons/CustomIcons';

interface Vehicle {
  id: string;
  name: string;
  year: string;
  plate: string;
  color: string;
  odometer: string;
  lastFuel: {
    amount: string;
    date: string;
    pricePerLiter: string;
    totalPrice: string;
    type: string;
  };
  tankLevel: {
    percentage: number;
    remaining: string;
    autonomy: string;
    efficiency: string;
  };
  avgConsumption: {
    value: string;
    change: string;
    period: string;
  };
  alerts: Array<{
    type: 'warning' | 'info';
    title: string;
    message: string;
    detail: string;
    color: 'amber' | 'gray';
    priority: 'high' | 'medium' | 'low';
  }>;
}

interface ExpandableDataSectionProps {
  isVisible: boolean;
  isExpanded: boolean;
  onToggleExpansion: () => void;
  textareaHeight: number;
}

export default function ExpandableDataSection({ 
  isVisible, 
  isExpanded, 
  onToggleExpansion,
  textareaHeight 
}: ExpandableDataSectionProps) {
  const [selectedVehicle, setSelectedVehicle] = useState(0);
  const [showVehicleSelector, setShowVehicleSelector] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowVehicleSelector(false);
      }
    };

    if (showVehicleSelector) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showVehicleSelector]);

  // todo: remove mock functionality - replace with real data from API
  const vehicles: Vehicle[] = useMemo(() => [
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
          message: 'Restam cerca de 300km de autonomia',
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

  // todo: remove mock functionality
  const cardData = useMemo(() => [
    {
      id: 'km',
      title: 'Registrar KM',
      description: 'Atualizar quilometragem atual',
      icon: <OdometerIcon size={20} className="text-muted-foreground" />,
    },
    {
      id: 'combustivel',
      title: 'Abastecimento',
      description: 'Registrar novo abastecimento',
      icon: <FuelPumpIcon size={20} className="text-muted-foreground" />,
    },
    {
      id: 'tanque',
      title: 'Nível do Tanque',
      description: 'Atualizar combustível restante',
      icon: <FuelTankIcon size={20} className="text-muted-foreground" />,
    }
  ], []);

  const handleCardClick = useCallback((cardId: string) => {
    console.log(`Card clicked: ${cardId}`);
    // todo: implement specific logic for each card
  }, []);

  const handleVehicleChange = useCallback((vehicleIndex: number) => {
    setSelectedVehicle(vehicleIndex);
    setShowVehicleSelector(false);
  }, []);

  const handleAddNewVehicle = useCallback(() => {
    setShowVehicleSelector(false);
    console.log('Add new vehicle clicked');
    // TODO: Implement add new vehicle functionality
    // This could open a modal, navigate to a form, or trigger a different UI state
  }, []);

  const toggleVehicleSelector = useCallback(() => {
    // Se a seção estiver recolhida, expandir automaticamente
    if (!isExpanded) {
      onToggleExpansion();
    }
    setShowVehicleSelector(prev => !prev);
  }, [isExpanded, onToggleExpansion]);

  const renderCards = useCallback(() => (
    <div className="mb-6">
      <div className="mb-3">
        <h3 className="text-base font-medium text-card-foreground mb-1">Ações Rápidas</h3>
        <p className="text-sm text-muted-foreground">Registre novos dados do seu veículo</p>
      </div>

      <div className="overflow-x-auto scrollbar-hide -mx-4">
        <div className="flex gap-4 px-4 py-2" style={{ width: 'max-content' }}>
          {cardData.map((card) => (
            <button 
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className="bg-card rounded-xl p-4 flex flex-col items-center text-center hover-elevate transition-all duration-200 border border-card-border hover:shadow-sm group focus:outline-none focus:ring-2 focus:ring-ring w-40 flex-shrink-0 snap-start"
              data-testid={`card-${card.id}`}
            >
              <div className="bg-muted rounded-lg p-3 mb-3 transition-transform duration-200 group-hover:scale-105">
                {card.icon}
              </div>
              <h3 className="text-card-foreground text-base font-medium mb-1">{card.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{card.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  ), [cardData, handleCardClick]);

  const renderAlerts = useCallback(() => (
    <div className="mt-8 space-y-3">
      <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Notificações</h4>

      {currentVehicle.alerts.map((alert, index) => {
        const colorClasses = {
          amber: {
            bg: 'bg-chart-3/10',
            border: 'border-chart-3/20',
            dot: 'bg-chart-3',
            title: 'text-chart-3',
            text: 'text-chart-3'
          },
          gray: {
            bg: 'bg-muted',
            border: 'border-border',
            dot: 'bg-muted-foreground',
            title: 'text-card-foreground',
            text: 'text-muted-foreground'
          }
        };

        const colors = colorClasses[alert.color];
        const isPriority = alert.priority === 'high';

        return (
          <div 
            key={index} 
            className={`${colors.bg} ${colors.border} rounded-xl p-4 flex items-start gap-3 ${isPriority ? 'ring-1 ring-chart-3/20' : ''}`}
            data-testid={`alert-${index}`}
          >
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
  ), [currentVehicle.alerts]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed left-0 right-0 bottom-0 z-30 transition-all duration-300 ${
        isExpanded ? 'top-0 bg-background rounded-none' : 'bg-primary rounded-t-3xl'
      }`}
      style={{ paddingBottom: `${textareaHeight}px` }}
      data-testid="expandable-data-section"
    >
      {/* Header */}
      <div className={`bg-primary text-primary-foreground ${isExpanded ? 'rounded-none' : 'rounded-t-3xl'}`}>
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Monitor</span>

              {/* Vehicle Selector */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleVehicleSelector}
                  className="flex items-center gap-2 px-3 py-1.5 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-lg text-xs transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-opacity-30"
                  data-testid="button-vehicle-selector"
                >
                  <span className="font-medium">{currentVehicle.name}</span>
                  <span className="text-primary-foreground/70">{currentVehicle.plate}</span>
                  <ChevronRight 
                    size={12} 
                    className={`transition-transform duration-200 ${showVehicleSelector ? 'rotate-90' : ''}`}
                  />
                </button>

                {/* Vehicle Dropdown */}
                {showVehicleSelector && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-card rounded-xl shadow-lg border border-border py-2 z-40" data-testid="vehicle-dropdown">
                    {vehicles.map((vehicle, index) => (
                      <button
                        key={vehicle.id}
                        onClick={() => handleVehicleChange(index)}
                        className={`w-full px-4 py-3 text-left hover:bg-muted transition-colors duration-150 ${
                          index === selectedVehicle ? 'bg-accent border-r-2 border-primary' : ''
                        }`}
                        data-testid={`vehicle-option-${index}`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-card-foreground text-sm">
                              {vehicle.name} {vehicle.year}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {vehicle.plate} • {vehicle.color}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-card-foreground">{vehicle.odometer}</p>
                            <p className="text-xs text-muted-foreground">KM atual</p>
                          </div>
                        </div>
                      </button>
                    ))}
                    
                    {/* Separator */}
                    <div className="mx-4 my-2 h-px bg-border" />
                    
                    {/* Add New Vehicle Option */}
                    <button
                      onClick={handleAddNewVehicle}
                      className="w-full px-4 py-3 text-left hover:bg-muted transition-colors duration-150 text-primary"
                      data-testid="add-new-vehicle-option"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                        <div>
                          <p className="font-medium text-primary text-sm">
                            Adicionar novo veículo
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Cadastrar um novo veículo
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <Button 
              onClick={onToggleExpansion}
              variant="ghost"
              size="icon"
              className="w-8 h-8 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground"
              data-testid="button-toggle-expansion"
            >
              {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div 
          className="flex-1 overflow-y-auto bg-background" 
          style={{ height: `calc(100vh - ${textareaHeight}px - 55px)` }}
          data-testid="expanded-content"
        >
          <div className="max-w-4xl mx-auto">
            <div className="px-4 pt-6">
              {renderCards()}
            </div>

            <div className="px-4 pb-16">
              {/* Current Data */}
              <div className="space-y-6">
                <div className="border-b border-border pb-4">
                  <h3 className="text-xl font-semibold text-card-foreground">Dados do Veículo</h3>
                  <p className="text-sm text-muted-foreground mt-1">Informações atualizadas do seu carro</p>
                </div>

                <div className="space-y-4">
                  {/* Odometer - Primary Highlight */}
                  <div className="bg-card border border-card-border rounded-2xl p-6 shadow-sm" data-testid="odometer-card">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary rounded-xl p-3">
                          <OdometerIcon size={24} className="text-primary-foreground" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-card-foreground">Quilometragem</h4>
                          <p className="text-sm text-muted-foreground">Odômetro total do veículo</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-bold text-card-foreground">{currentVehicle.odometer}</span>
                      </div>
                    </div>
                  </div>

                  {/* Secondary Data Grid */}
                  <div className="grid gap-4">
                    {/* Last Fuel */}
                    <div className="bg-card border border-card-border rounded-xl p-5" data-testid="last-fuel-card">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-muted rounded-lg p-2">
                            <FuelPumpIcon size={20} className="text-muted-foreground" />
                          </div>
                          <div>
                            <h4 className="text-base font-medium text-card-foreground">Último Abastecimento</h4>
                            <p className="text-xs text-muted-foreground">{currentVehicle.lastFuel.type}</p>
                          </div>
                        </div>
                        <span className="text-xl font-bold text-card-foreground">{currentVehicle.lastFuel.amount}</span>
                      </div>
                      <div className="ml-11 pt-3 border-t border-border">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-muted-foreground">{currentVehicle.lastFuel.date}</span>
                          <span className="text-card-foreground font-medium">
                            {currentVehicle.lastFuel.pricePerLiter} • {currentVehicle.lastFuel.totalPrice}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Tank Level */}
                    <div className="bg-card border border-card-border rounded-xl p-5" data-testid="tank-level-card">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-muted rounded-lg p-2">
                            <FuelTankIcon size={20} className="text-muted-foreground" level={currentVehicle.tankLevel.percentage / 100} />
                          </div>
                          <div>
                            <h4 className="text-base font-medium text-card-foreground">Nível do Tanque</h4>
                            <p className="text-xs text-muted-foreground">Combustível restante</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xl font-bold text-card-foreground">{currentVehicle.tankLevel.percentage}%</span>
                          <p className="text-xs text-muted-foreground">{currentVehicle.tankLevel.remaining}</p>
                        </div>
                      </div>
                      <div className="ml-11 pt-3 border-t border-border">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-muted-foreground">Autonomia estimada</span>
                          <div className="text-right">
                            <span className="text-sm font-medium text-card-foreground">{currentVehicle.tankLevel.autonomy}</span>
                            <p className="text-muted-foreground">{currentVehicle.tankLevel.efficiency}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Average Consumption */}
                    <div className="bg-card border border-card-border rounded-xl p-5" data-testid="avg-consumption-card">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-muted rounded-lg p-2">
                            <Activity size={20} className="text-muted-foreground" />
                          </div>
                          <div>
                            <h4 className="text-base font-medium text-card-foreground">Consumo Médio</h4>
                            <p className="text-xs text-muted-foreground">{currentVehicle.avgConsumption.period}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xl font-bold text-card-foreground">{currentVehicle.avgConsumption.value}</span>
                          <p className="text-xs text-chart-1 font-medium">{currentVehicle.avgConsumption.change}</p>
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
  );
}