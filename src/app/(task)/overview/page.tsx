import { CategoryDistributionChart, SalesOverviewChart, StatCard } from "@/components";
import { DollarSign, ShoppingBag, SquareActivity, Users } from "lucide-react";



export default function OverviewPage() {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <div className="mx-w-7xl mx-auto pt-4 pb-4 pr-4 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8 animate-fade-in-up">
          <StatCard name="Total Sales" icon={<DollarSign className="mr-2" />} value="$185,023" />
          <StatCard name="Total Clients" icon={<Users className="mr-2" />} value="1,234" />
          <StatCard name="Total Products" icon={<ShoppingBag className="mr-2" />} value="524" />
          <StatCard name="Stock" icon={<SquareActivity className="mr-2" />} value="58,349" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SalesOverviewChart />
          <CategoryDistributionChart />
        </div>
      </div>
    </div>
  );
}