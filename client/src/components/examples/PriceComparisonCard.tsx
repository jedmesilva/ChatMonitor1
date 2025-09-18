import PriceComparisonCard from '../PriceComparisonCard';

export default function PriceComparisonCardExample() {
  return (
    <div className="space-y-4">
      <PriceComparisonCard currentPrice={6.01} isActive={true} />
      <PriceComparisonCard currentPrice={5.95} isActive={false} />
    </div>
  );
}