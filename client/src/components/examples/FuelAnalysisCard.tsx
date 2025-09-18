import FuelAnalysisCard from '../FuelAnalysisCard';

export default function FuelAnalysisCardExample() {
  return (
    <div className="space-y-4">
      <FuelAnalysisCard 
        fuelData={{
          liters: 42.5,
          price: 255.30,
          station: 'Shell Centro',
          km: 45230,
          kmTraveled: 540
        }} 
        isActive={true} 
      />
      <FuelAnalysisCard 
        fuelData={{
          liters: 38.2,
          price: 220.45,
          station: 'Petrobras Norte',
          km: 44690,
          kmTraveled: 485
        }} 
        isActive={false} 
      />
    </div>
  );
}