import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Scale, Ruler, Target, RefreshCw } from "lucide-react";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [stats, setStats] = useState({
    weight: "",
    height: "",
    goal: "Weight Loss",
  });
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`, // Send the JWT token
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/health/calculate-bmi",
        {
          userId: user._id,
          ...stats,
        },
        config,
      );
      setUser({ ...user, ...data.user }); // Updates local context with new BMI
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ ...user, ...data.user }),
      );
      alert("Health stats updated!");
    } catch (err) {
      alert("Failed to update stats");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8">
      <h2 className="text-3xl font-bold mb-8">Personal Health Profile</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Form */}
        <form
          onSubmit={handleUpdate}
          className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-6"
        >
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">
              Weight (kg)
            </label>
            <div className="relative">
              <Scale
                className="absolute left-3 top-3 text-slate-400"
                size={20}
              />
              <input
                type="number"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200"
                placeholder="e.g. 70"
                onChange={(e) => setStats({ ...stats, weight: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">
              Height (cm)
            </label>
            <div className="relative">
              <Ruler
                className="absolute left-3 top-3 text-slate-400"
                size={20}
              />
              <input
                type="number"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200"
                placeholder="e.g. 175"
                onChange={(e) => setStats({ ...stats, height: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">
              Fitness Goal
            </label>
            <div className="relative">
              <Target
                className="absolute left-3 top-3 text-slate-400"
                size={20}
              />
              <select
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 appearance-none bg-white"
                onChange={(e) => setStats({ ...stats, goal: e.target.value })}
              >
                <option>Weight Loss</option>
                <option>Muscle Gain</option>
                <option>Maintenance</option>
              </select>
            </div>
          </div>

          <button className="w-full bg-health-blue text-white py-4 rounded-xl font-bold hover:bg-blue-600 transition-all flex items-center justify-center gap-2">
            {loading ? (
              <RefreshCw className="animate-spin" />
            ) : (
              "Update & Calculate BMI"
            )}
          </button>
        </form>

        {/* Display Result Card */}
        <div className="bg-health-green text-white p-8 rounded-3xl shadow-lg flex flex-col items-center justify-center text-center">
          <p className="text-lg opacity-90">Current BMI</p>
          <h3 className="text-7xl font-black my-4">{user?.bmi || "--"}</h3>
          <p className="text-xl font-semibold">
            {user?.bmi
              ? user.bmi < 18.5
                ? "Underweight"
                : user.bmi < 25
                  ? "Normal"
                  : "Overweight"
              : "Enter details to see status"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
