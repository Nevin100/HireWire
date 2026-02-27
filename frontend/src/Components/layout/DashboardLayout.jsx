/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext.jsx";
import Navbar from "../../Components/layout/Navbar.jsx";
import { motion } from "framer-motion";
import { LuLock } from "react-icons/lu";

const DashboardLayout = ({ children }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-orange-500/30">
      <Navbar />

      <main className="relative">
        {user ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        ) : (
          /* 🟠 Premium Unauthorized State */
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6">
            <div className="relative mb-8">
              {/* Animated Glow behind icon */}
              <div className="absolute inset-0 bg-orange-500/20 blur-[50px] rounded-full animate-pulse" />
              <div className="relative z-10 w-20 h-20 bg-white/[0.03] border border-white/10 rounded-3xl flex items-center justify-center backdrop-blur-md">
                <LuLock className="text-orange-500" size={32} />
              </div>
            </div>

            <div className="text-center max-w-sm">
              <h2 className="text-2xl font-black text-white tracking-tighter mb-3">
                Authorization Required
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                This area is precision-locked. Please sign in to your account to access your personalized interview roadmaps.
              </p>
              
              <button 
                onClick={() => window.location.href = '/'}
                className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all shadow-[0_10px_30px_-10px_rgba(249,115,22,0.5)]"
              >
                Return to Login
              </button>
            </div>
          </div>
        )}
      </main>
      
      {/* Background Decorative Element */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>
    </div>
  );
};

export default DashboardLayout;