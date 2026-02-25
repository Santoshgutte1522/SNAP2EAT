import { Link } from "react-router-dom";
import { Camera, Calculator, FileText, ChevronRight } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 sm:py-24 text-center">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
          Smart Health Tracking for a <br className="hidden sm:block" />
          <span className="text-health-green">Better You.</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          Snap your prescriptions, calculate your BMI, and get personalized diet
          and fitness plans tailored for your lifestyle.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
          <Link
            to="/login"
            className="bg-health-green text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-lg hover:shadow-green-200 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
          >
            Get Started <ChevronRight size={20} />
          </Link>
        </div>

        {/* Feature Grid - Responsive Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10 text-left">
          <FeatureCard
            icon={<Calculator className="text-blue-500" size={32} />}
            title="Calculate BMI"
            desc="Input your unique body details to assess your current health status instantly."
          />
          <FeatureCard
            icon={<FileText className="text-green-500" size={32} />}
            title="Analyze Prescriptions"
            desc="Digitize medical advice to ensure you never miss a step in your recovery."
          />
          <FeatureCard
            icon={<Camera className="text-purple-500" size={32} />}
            title="Proof Verification"
            desc="Upload proof of activity to maintain discipline and reach your goals faster."
          />
        </div>
      </section>

      {/* Mobile-Friendly Footer Quote */}
      <footer className="bg-slate-100 py-10 px-6 text-center text-slate-500 text-sm">
        <p>© 2026 HealthTech Innovations</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-100 hover:border-health-green transition-colors group">
    <div className="mb-4 bg-slate-50 w-16 h-16 flex items-center justify-center rounded-2xl group-hover:bg-green-50 transition-colors">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-slate-800">{title}</h3>
    <p className="text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

export default Home;
