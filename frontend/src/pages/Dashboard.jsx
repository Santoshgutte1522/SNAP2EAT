import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import BMICard from "../components/BMICard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Utensils,
  Dumbbell,
  Activity,
  Bell,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [plan, setPlan] = useState(null);
  const [userFiles, setUserFiles] = useState([]);
  const navigate = useNavigate();

  const [reminders, setReminders] = useState([
    { id: 1, time: "08:00 AM", task: "Breakfast & Vitamins", completed: true },
    { id: 2, time: "01:00 PM", task: "Protein Rich Lunch", completed: false },
    { id: 3, time: "05:30 PM", task: "Evening HIIT Session", completed: false },
  ]);

  const handleTestWhatsApp = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      await axios.post(
        "http://localhost:5000/api/health/test-whatsapp",
        {},
        config,
      );

      alert("Test message sent! Check your WhatsApp. 📱");
    } catch (err) {
      // This catches errors like the backend browser not being ready
      const errorMsg =
        err.response?.data?.message || "Check terminal for QR code!";
      alert(`Trigger failed: ${errorMsg}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.token) return;
      const config = { headers: { Authorization: `Bearer ${user.token}` } };

      try {
        // Fetch Plan
        if (user.goal) {
          const planRes = await axios.get(
            `http://localhost:5000/api/health/get-plan/${user.goal}`,
            config,
          );
          setPlan(planRes.data);
        }
        // Fetch User Uploads
        const filesRes = await axios.get(
          "http://localhost:5000/api/upload/my-files",
          config,
        );
        setUserFiles(filesRes.data);
      } catch (err) {
        console.error("Data fetch failed", err);
      }
    };
    fetchData();
  }, [user]);

  const handleToggleReminder = (id) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r)),
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">
            Health Dashboard
          </h1>
          <p className="text-slate-500 font-medium">
            Welcome back, {user?.name || "User"} 👋
          </p>

          <button
            onClick={handleTestWhatsApp}
            className="text-[10px] uppercase tracking-widest font-bold bg-slate-100 text-slate-400 px-2 py-1 rounded-lg hover:bg-health-green hover:text-white transition-all"
          >
            Manual Trigger
          </button>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
          <Activity className="text-health-green" />
          <div>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">
              Status
            </p>
            <p className="font-bold text-slate-700">
              {user?.bmi ? "Plan Active" : "Profile Incomplete"}
            </p>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BMICard bmi={user?.bmi} />

        {/* Meal Tracking Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <Utensils className="text-orange-500" size={24} />
            <span className="text-xs font-bold text-orange-500 bg-orange-50 px-3 py-1 rounded-full uppercase">
              Meals
            </span>
          </div>
          <p className="text-slate-400 text-sm font-bold uppercase mb-1">
            Diet Focus
          </p>
          <p className="text-slate-700 font-semibold leading-relaxed">
            {plan?.diet || "Setup your profile to see your daily diet."}
          </p>
        </div>

        {/* Fitness Goal Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <Dumbbell className="text-health-blue" size={24} />
            <span className="text-xs font-bold text-health-blue bg-blue-50 px-3 py-1 rounded-full uppercase">
              Fitness
            </span>
          </div>
          <p className="text-slate-400 text-sm font-bold uppercase mb-1">
            Target Workout
          </p>
          <p className="text-slate-700 font-semibold leading-relaxed">
            {plan?.exercise || "Setup your profile to see your exercise plan."}
          </p>
        </div>
      </div>

      {/* Reminders & Proof Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side: Reminders */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Bell className="text-health-green" />
              <h3 className="text-xl font-bold">Upcoming Reminders</h3>
            </div>

            {/* Navigation to Records (Proofs Tab) */}
            <button
              onClick={() => navigate("/my-records")}
              className="flex items-center gap-1 text-xs font-bold text-health-green hover:underline uppercase tracking-widest"
            >
              Logs <ChevronRight size={14} />
            </button>
          </div>

          <ul className="space-y-4">
            {reminders.map((reminder) => (
              <ReminderItem
                key={reminder.id}
                id={reminder.id}
                time={reminder.time}
                task={reminder.task}
                completed={reminder.completed}
                onToggle={handleToggleReminder}
              />
            ))}
          </ul>
        </div>

        {/* Right Side: Verification/Records Card */}
        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col justify-center items-center text-center space-y-6">
          <div className="space-y-2">
            <CheckCircle2 size={48} className="text-health-green mx-auto" />
            <h3 className="text-2xl font-bold">Verification Center</h3>
            <p className="text-slate-400 text-sm max-w-xs">
              Upload activity proof for your streak or save a prescription to
              your medical vault.
            </p>
          </div>

          <div className="flex flex-col w-full gap-3">
            <button
              onClick={() => navigate("/upload")}
              className="bg-health-green text-white px-8 py-3 rounded-xl font-bold hover:bg-green-600 transition-all cursor-pointer w-full"
            >
              Upload New Proof
            </button>

            {/* Navigation to Records (Prescription Tab) */}
            <button
              onClick={() => navigate("/my-records")}
              className="text-slate-400 text-xs font-bold hover:text-white transition-all uppercase tracking-widest flex items-center justify-center gap-1"
            >
              Open Medical Vault <ChevronRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReminderItem = ({ id, time, task, completed, onToggle }) => (
  <li
    onClick={() => onToggle(id)}
    className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border ${
      completed
        ? "bg-green-50 border-green-100"
        : "bg-slate-50 border-slate-100 hover:border-health-green"
    }`}
  >
    <div className="flex items-center gap-4">
      <div
        className={`w-3 h-3 rounded-full ${completed ? "bg-health-green" : "bg-slate-300 animate-pulse"}`}
      />
      <div>
        <p
          className={`font-bold ${completed ? "text-slate-400 line-through" : "text-slate-700"}`}
        >
          {task}
        </p>
        <p className="text-xs text-slate-400 font-medium">{time}</p>
      </div>
    </div>
    {completed && (
      <span className="text-health-green text-xs font-black uppercase tracking-widest">
        Done
      </span>
    )}
  </li>
);

export default Dashboard;
