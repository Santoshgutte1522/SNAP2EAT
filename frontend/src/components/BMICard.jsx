import { Activity, Info } from "lucide-react";

const BMICard = ({ bmi }) => {
  // Logic to determine color and category based on BMI score
  const getStatus = (val) => {
    if (!val)
      return {
        label: "No Data",
        color: "bg-slate-100 text-slate-400",
        desc: "Complete your profile",
      };
    if (val < 18.5)
      return {
        label: "Underweight",
        color: "bg-orange-100 text-orange-600",
        desc: "Consider a surplus diet",
      };
    if (val < 25)
      return {
        label: "Healthy",
        color: "bg-green-100 text-green-600",
        desc: "You are in great shape!",
      };
    return {
      label: "Overweight",
      color: "bg-red-100 text-red-600",
      desc: "Try a calorie deficit",
    };
  };

  const status = getStatus(bmi);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 h-full flex flex-col justify-between">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-health-green/10 rounded-2xl text-health-green">
          <Activity size={24} />
        </div>
        <span
          className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${status.color}`}
        >
          {status.label}
        </span>
      </div>

      <div>
        <h3 className="text-slate-400 text-sm font-bold uppercase mb-1">
          Your Body Mass Index
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-black text-slate-900">
            {bmi || "--"}
          </span>
          <span className="text-slate-400 font-medium">kg/m²</span>
        </div>
      </div>

      <div className="mt-6 p-4 bg-slate-50 rounded-2xl flex items-start gap-3">
        <Info size={18} className="text-slate-400 mt-0.5" />
        <p className="text-xs text-slate-500 leading-relaxed">
          {status.desc} BMI is a screening tool, not a diagnostic of body
          fatness or health.
        </p>
      </div>
    </div>
  );
};

export default BMICard;
