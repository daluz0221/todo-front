import { ProductsTable, StatCard } from "@/components";
import { ChartBarStacked, DollarSign, ShoppingBag, SquareActivity } from "lucide-react";

export default function ProductPage() {
  return (
    <div className="flex-1 overflow-auto relative <-10">
        <div className="mx-w-7xl mx-auto py-6 px-4 lg:px-8">
             <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8 animate-fade-in-up">
                <StatCard name="Total Products" icon={<ShoppingBag className="mr-2" />} value="4,352" />
                <StatCard name="Total Stock" icon={<SquareActivity className="mr-2" />} value="18,450" />
                <StatCard name="Total Sales" icon={<DollarSign className="mr-2" />} value="$12,780" />
                <StatCard name="Total Categories" icon={<ChartBarStacked className="mr-2" />} value={"8"} />
             </div>

             <ProductsTable />
        </div>
    </div>
  );
}