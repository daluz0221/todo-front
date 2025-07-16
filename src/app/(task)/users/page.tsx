import { StatCard, UsersTable } from "@/components";
import { RotateCcw, UserCheck, UserIcon, UserPlus } from "lucide-react";

export default function UsersPage() {
  return (
      <div className="flex-1 overflow-auto relative <-10">
        <div className="mx-w-7xl mx-auto py-6 px-4 lg:px-8">
             <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8 animate-fade-in-up">
                <StatCard name="Total Cleints" icon={<UserIcon className="mr-2" />} value="4,352" />
                <StatCard name="New clients" icon={<UserPlus className="mr-2" />} value="18,450" />
                <StatCard name="Active clients" icon={<UserCheck className="mr-2" />} value="$12,780" />
                <StatCard name="Returning clinets" icon={<RotateCcw className="mr-2" />} value={"8"} />
             </div>

             <UsersTable />
        </div>
    </div>
  );
}