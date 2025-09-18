import ConsumptionTrendsCard from '../ConsumptionTrendsCard';

export default function ConsumptionTrendsCardExample() {
  return (
    <div className="space-y-4">
      <ConsumptionTrendsCard isActive={true} />
      <ConsumptionTrendsCard isActive={false} />
    </div>
  );
}