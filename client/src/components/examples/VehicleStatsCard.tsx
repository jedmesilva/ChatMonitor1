import VehicleStatsCard from '../VehicleStatsCard';

export default function VehicleStatsCardExample() {
  return (
    <div className="space-y-4">
      <VehicleStatsCard isActive={true} />
      <VehicleStatsCard isActive={false} />
    </div>
  );
}