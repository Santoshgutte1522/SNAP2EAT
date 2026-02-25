import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Shield, Flame } from "lucide-react";

const MyRecords = () => {
  const { user } = useContext(AuthContext);
  const [files, setFiles] = useState([]);
  const [activeTab, setActiveTab] = useState("Prescription"); // State to switch categories
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFiles = async () => {
      // 1. ADD THIS GUARD: If user is null or token is missing, stop here.
      if (!user || !user.token) return;

      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get(
          "http://localhost:5000/api/upload/my-files",
          config,
        );
        setFiles(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchFiles();
  }, [user]);

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-health-green mx-auto"></div>
          <p className="text-slate-500 font-medium">
            Verifying your session...
          </p>
        </div>
      </div>
    );
  }

  const filteredData = files.filter((f) => f.type === activeTab);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Back Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-slate-100 rounded-full"
        >
          <ChevronLeft />
        </button>
        <h1 className="text-3xl font-black text-slate-900">Health Records</h1>
      </div>

      {/* TABS: Switch between Prescription and Proof */}
      <div className="flex gap-4 border-b border-slate-200">
        <button
          onClick={() => setActiveTab("Prescription")}
          className={`pb-4 px-2 font-bold flex items-center gap-2 transition-all ${activeTab === "Prescription" ? "border-b-2 border-blue-500 text-blue-500" : "text-slate-400"}`}
        >
          <Shield size={18} /> Medical Vault
        </button>
        <button
          onClick={() => setActiveTab("Proof")}
          className={`pb-4 px-2 font-bold flex items-center gap-2 transition-all ${activeTab === "Proof" ? "border-b-2 border-health-green text-health-green" : "text-slate-400"}`}
        >
          <Flame size={18} /> Activity Logs
        </button>
      </div>

      {/* GALLERY GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filteredData.map((file) => (
          <div
            key={file._id}
            className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm"
          >
            <img
              // This .replace(/\\/g, '/') converts all \ to /
              src={`http://localhost:5000/${file.filePath.replace(/\\/g, "/")}`}
              alt="Record"
              className="w-full h-full object-cover"
            />
            <p className="text-[10px] font-bold text-slate-400 uppercase">
              {new Date(file.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-20 text-slate-400">
          No records found for this category.
        </div>
      )}
    </div>
  );
};

export default MyRecords;
