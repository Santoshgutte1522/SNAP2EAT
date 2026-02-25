import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import {
  UploadCloud,
  FileText,
  CheckCircle,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";

const Upload = () => {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [type, setType] = useState("Prescription"); // Options: Prescription or Proof
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setStatus({ ...status, success: false, error: "" });
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file)
      return setStatus({ ...status, error: "Please select a file first." });

    setStatus({ ...status, loading: true });

    // Using FormData to handle file transfer to the backend
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);
    formData.append("userId", user._id);

    try {
      // Connects to the /api/upload route you protected with authMiddleware
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.post("http://localhost:5000/api/upload", formData, config);
      setStatus({ loading: false, success: true, error: "" });
      setFile(null);
    } catch (err) {
      console.error("FULL ERROR OBJECT:", err.response?.data || err.message); // This will tell you the EXACT backend error
      setStatus({
        loading: false,
        success: false,
        error: "Upload failed. Try again.",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900">Upload Center</h2>
        <p className="text-slate-500 mt-2">
          Digitize prescriptions or verify your health activities.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Toggle Type Selector */}
        <div className="flex border-b border-slate-100">
          <button
            onClick={() => setType("Prescription")}
            className={`flex-1 py-4 font-bold transition-all ${type === "Prescription" ? "text-health-green bg-green-50" : "text-slate-400"}`}
          >
            Medical Prescription
          </button>
          <button
            onClick={() => setType("Proof")}
            className={`flex-1 py-4 font-bold transition-all ${type === "Proof" ? "text-health-blue bg-blue-50" : "text-slate-400"}`}
          >
            Activity Proof
          </button>
        </div>

        <form onSubmit={handleUpload} className="p-8 space-y-8">
          {/* Custom Dropzone UI */}
          <div
            onClick={() => document.getElementById("fileInput").click()}
            className="border-3 border-dashed border-slate-200 rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-health-green hover:bg-slate-50 transition-all group"
          >
            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="bg-slate-100 p-4 rounded-2xl group-hover:scale-110 transition-transform mb-4">
              {type === "Prescription" ? (
                <FileText className="text-slate-400" size={40} />
              ) : (
                <ImageIcon className="text-slate-400" size={40} />
              )}
            </div>
            <p className="font-bold text-slate-700">
              {file ? file.name : `Select ${type} Image/PDF`}
            </p>
            <p className="text-sm text-slate-400">
              Supported formats: JPG, PNG, PDF
            </p>
          </div>

          {status.error && (
            <p className="text-red-500 text-center font-medium">
              {status.error}
            </p>
          )}
          {status.success && (
            <div className="flex items-center justify-center gap-2 text-health-green font-bold">
              <CheckCircle size={20} /> Upload Successful!
            </div>
          )}

          <button
            type="submit"
            disabled={status.loading}
            className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer 
    ${type === "Prescription" ? "bg-health-green" : "bg-health-blue"} 
    text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {status.loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <UploadCloud size={22} />
            )}
            {status.loading ? "Uploading..." : `Upload ${type}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
