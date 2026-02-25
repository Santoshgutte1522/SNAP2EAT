import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  HeartPulse,
  LogOut,
  User as UserIcon,
  LayoutDashboard,
  Menu,
} from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-slate-200 px-4 sm:px-8 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand Name - Responsive Text Size */}
        <Link
          to="/"
          className="flex items-center gap-2 text-health-green font-bold text-lg sm:text-xl"
        >
          <HeartPulse size={24} className="sm:w-7 sm:h-7" />
          <span>SNAP2EAT</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-3 sm:gap-6 items-center font-medium text-slate-600 text-sm sm:text-base">
          {user ? (
            <>
              {/* Dashboard and Profile - Hidden text on very small screens, icons always visible */}
              <Link
                to="/dashboard"
                className="flex items-center gap-1 hover:text-health-green transition-colors"
              >
                <LayoutDashboard size={18} />
                <span className="hidden xs:inline">Dashboard</span>
              </Link>
              <Link
                to="/profile"
                className="flex items-center gap-1 hover:text-health-green transition-colors"
              >
                <UserIcon size={18} />
                <span className="hidden xs:inline">Profile</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-red-500 hover:text-red-600 cursor-pointer transition-colors"
              >
                <LogOut size={18} />
                <span className="hidden xs:inline">Logout</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-health-green text-white px-4 py-2 sm:px-6 sm:py-2.5 rounded-full hover:bg-green-600 transition-all shadow-sm"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
