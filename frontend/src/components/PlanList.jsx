import { CheckCircle, Circle, Utensils, Dumbbell } from "lucide-react";

const PlanList = ({ plan }) => {
  if (!plan)
    return (
      <div className="p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-center text-slate-400">
        Complete your profile to generate your plan.
      </div>
    );

  return (
    <div className="space-y-4">
      {/* Diet Section */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 mb-3 text-orange-600 font-bold">
          <Utensils size={18} />
          <h3>Dietary Plan</h3>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed bg-orange-50/50 p-3 rounded-xl border border-orange-100">
          {plan.dietDetails}
        </p>
      </div>

      {/* Exercise Section */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 mb-3 text-health-blue font-bold">
          <Dumbbell size={18} />
          <h3>Fitness Routine</h3>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed bg-blue-50/50 p-3 rounded-xl border border-blue-100">
          {plan.exerciseDetails}
        </p>
      </div>
    </div>
  );
};

export default PlanList;
