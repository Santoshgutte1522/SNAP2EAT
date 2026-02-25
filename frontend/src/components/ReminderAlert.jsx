import { Bell, X, Clock, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const ReminderAlert = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative overflow-hidden bg-health-green text-white p-4 sm:p-5 rounded-3xl shadow-lg shadow-green-100 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-top duration-500">
      {/* Decorative Background Pattern */}
      <div className="absolute top-0 right-0 opacity-10 -rotate-12 translate-x-4 -translate-y-4">
        <Bell size={120} />
      </div>

      <div className="flex items-center gap-4 relative z-10">
        <div className="bg-white/20 p-3 rounded-2xl">
          <Clock size={24} className="animate-pulse" />
        </div>
        <div className="text-center sm:text-left">
          <h4 className="font-bold text-lg">Compliance Alert</h4>
          <p className="text-green-50 text-sm">
            It's time for your Afternoon Meal Tracking!
          </p>
        </div>
      </div>

      <div className="flex gap-2 w-full sm:w-auto relative z-10">
        <button
          onClick={() => setVisible(false)}
          className="flex-1 sm:flex-none bg-white text-health-green px-6 py-2 rounded-xl font-bold text-sm hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
        >
          <CheckCircle2 size={16} /> Mark Done
        </button>
        <button
          onClick={() => setVisible(false)}
          className="p-2 hover:bg-white/10 rounded-xl transition-colors"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default ReminderAlert;
