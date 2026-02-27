import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-[100] h-20 bg-[#050505]/80 backdrop-blur-xl border-b border-white/10 px-4 md:px-8">
      <div className="container mx-auto h-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link 
            to="/" 
            className="p-2 rounded-full text-gray-500 hover:text-orange-500 hover:bg-orange-500/10 transition-all duration-300 group"
            title="Back to Home"
          >
            <LuArrowRight size={24} className="group-hover:rotate-180 transition-transform duration-300" />
          </Link>
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full group-hover:bg-orange-500/40 transition-all duration-500" />
              <div className="relative z-10 w-full h-full bg-orange-500/70 border border-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:border-orange-500/50 transition-all duration-500">
                <img 
                  src="/favicon.svg" 
                  alt="Logo" 
                  className="w-6 h-6 object-contain group-hover:rotate-12 transition-transform duration-500" 
                />
              </div>
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tighter flex items-baseline">
              <span className="text-white">Hire</span>
              <span className="text-orange-500 inline-block translate-y-[1px]">Wire</span>
            </span>
          </Link>
        </div>

        <ProfileInfoCard />
        
      </div>
    </nav>
  );
};

export default Navbar;