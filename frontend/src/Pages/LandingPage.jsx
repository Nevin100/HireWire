/* eslint-disable no-unused-vars */
import { APP_FEATURES } from "../Util/data.js";
import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LuCpu, LuArrowRight, LuZap, LuLayoutList , LuGithub, LuLinkedin, LuLayoutGrid, LuCircleCheck } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./Auth/Login.jsx";
import SignUp from "./Auth/SignUp.jsx";
import { UserContext } from "../Context/UserContext.jsx";
import ProfileInfoCard from "../Components/Cards/ProfileInfoCard.jsx";
import Modal from "../Components/Modal.jsx";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setcurrentPage] = useState("login");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCTA = () => {
    !user ? setOpenAuthModal(true) : navigate("/dashboard");
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-orange-500/30 selection:text-orange-200 overflow-x-hidden">
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-orange-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-orange-900/10 blur-[120px] rounded-full" />
      </div>

      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-black/40 backdrop-blur-2xl border-b border-white/5 py-4" : "bg-transparent py-8"}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-2 rounded-xl shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
              <img src="/favicon.svg" alt="Logo" className="h-5 w-5 invert" />
            </div>
            <span className="text-2xl font-black tracking-tighter">HireWire <span className="text-[10px] text-orange-500 font-medium ml-1">PRO</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Features</a>
            
            {user && (
              <Link to="/dashboard" className="flex items-center gap-2 text-sm font-bold text-orange-500 hover:text-orange-400">
                <LuLayoutGrid size={16} /> Dashboard
              </Link>
            )}

            <div className="h-4 w-[1px] bg-white/10" />

            {user ? <ProfileInfoCard /> : (
              <div className="flex items-center gap-4">
                <button onClick={() => setOpenAuthModal(true)} className="text-sm font-bold text-gray-300 hover:text-white transition-all">Login</button>
                <button onClick={handleCTA} className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-black hover:bg-orange-500 hover:text-white transition-all active:scale-95 shadow-lg shadow-white/5">
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        <section className="pt-48 pb-20 container mx-auto px-6 text-center space-y-2">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[11px] font-black uppercase tracking-widest mb-10">
            <LuZap className="w-3 h-3 fill-current" />
            <span>Next-Gen Interview Simulation</span>
          </motion.div>
          
          <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-6xl py-2 md:text-[110px] font-black tracking-[ -0.05em] mb-10 leading-[0.85] text-white">
            Cracking Interviews.. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-t from-gray-600 to-gray-100">is now automated.</span>
          </motion.h1>
          
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            Stop guessing what the interviewer wants. Use HireWire's low-latency AI to simulate high-pressure role-specific interviews with real-time feedback.
          </motion.p>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <button onClick={handleCTA} className="group bg-orange-600 hover:bg-orange-500 text-white px-12 py-5 rounded-2xl font-black text-lg flex items-center gap-3 transition-all shadow-[0_20px_50px_rgba(234,88,12,0.3)] active:scale-95 cursor-pointer">
              Start Your First Session <LuArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>

          <motion.section 
            initial={{ y: 60, opacity: 0 }} 
            whileInView={{ y: 0, opacity: 1 }} 
            viewport={{ once: true }}
            className="relative max-w-6xl mx-auto mt-20"
          >
            <div className="absolute inset-0 bg-orange-500/20 blur-[120px] -z-10 rounded-full opacity-50" />
            <div className="relative rounded-[2.5rem] border border-white/10 bg-[#0a0a0a] p-3 shadow-2xl overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 pointer-events-none" />
               {/* Replace with your image_c97277.png equivalent */}
               <img src="/Landing.jpg" alt="HireWire Interface" className="rounded-[2rem] w-full border border-white/5 opacity-80 group-hover:opacity-100 transition-all duration-700" />
            </div>
          </motion.section>
        </section>

        <section id="features" className="py-32 container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Large Bento: Dashboard Preview */}
            <motion.div {...fadeInUp} className="md:col-span-8 group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-12">
               <div className="relative z-20">
                  <div className="bg-orange-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-orange-500/20">
                    <LuLayoutList  className="text-orange-500 text-3xl" />
                  </div>
                  <h3 className="text-4xl font-black mb-4">Centralized Hub</h3>
                  <p className="text-gray-400 text-lg max-w-md mb-8">Manage multiple job profiles from a single dashboard. Track progress, delete old sessions, and restart sessions instantly.</p>
               </div>
               {/* Decorative Element */}
               <div className="absolute right-[-10%] bottom-[-10%] w-2/3 opacity-20 group-hover:opacity-40 transition-opacity">
                  <img src="/Landing.jpg" className="rounded-2xl rotate-[-10deg]" alt="Decorative Dashboard" />
               </div>
            </motion.div>

            {/* Small Bento: Fast Inference */}
            <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="md:col-span-4 group rounded-[2.5rem] border border-white/10 bg-[#0a0a0a] p-12 hover:bg-white/[0.03] transition-all">
                <LuZap className="text-5xl text-blue-400 mb-8 animate-pulse" />
                <h3 className="text-2xl font-black mb-4 leading-tight">Groq-Speed Intelligence</h3>
                <p className="text-gray-500 font-medium">Sub-second AI generation for questions and deep-dive solutions. No loading screens, just pure performance.</p>
            </motion.div>

            {/* Bottom Row Features */}
            {APP_FEATURES.slice(0, 3).map((feature, idx) => (
              <motion.div {...fadeInUp} transition={{ delay: idx * 0.1 }} key={idx} className="md:col-span-4 rounded-[2rem] border border-white/5 bg-white/[0.02] p-10 hover:border-orange-500/30 transition-all">
                <div className="flex items-center gap-3 mb-6 text-orange-500">
                   <LuCircleCheck size={20} />
                   <span className="text-xs font-black uppercase tracking-widest">Feature {idx + 1}</span>
                </div>
                <h4 className="font-black text-xl text-white mb-4">{feature.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="py-20 bg-white/[0.01] border-y border-white/5">
           <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div {...fadeInUp}>
                 <h2 className="text-5xl font-black mb-8">AI Sessions that <br/><span className="text-orange-500">actually work.</span></h2>
                 <ul className="space-y-6">
                    {[
                      "Context-aware question generation",
                      "Deep-dive solutions for every query",
                      "Experience-level tuned difficulty",
                      "Personalized topic focus"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 text-gray-400 font-medium">
                        <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                          <div className="w-2 h-2 bg-orange-500 rounded-full" />
                        </div>
                        {item}
                      </li>
                    ))}
                 </ul>
              </motion.div>
              <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="relative">
                 <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full" />
                 <img src="/session-preview.jpg" className="relative rounded-3xl border border-white/10 shadow-2xl" alt="AI Answer Preview" />
              </motion.div>
           </div>
        </section>
      </main>

      <footer className="bg-[#050505] border-t border-white/5 py-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-2 rounded-xl shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
              <img src="/favicon.svg" alt="Logo" className="h-5 w-5 invert" />
            </div>
              <span className="text-2xl font-black tracking-tighter">HireWire</span>
            </div>
            <p className="text-gray-600 text-sm font-medium">Ultra-low latency AI interview coach for all students, professionals etc..</p>
            <p className="text-white text-sm font-medium"> - Developed By Nevin Bali</p>
          </div>
          <div className="flex gap-16">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-black uppercase text-gray-400 tracking-widest">Socials</span>
              <a href="https://github.com/Nevin100" className="text-gray-600 hover:text-white transition-colors flex items-center gap-2"><LuGithub /> GitHub</a>
              <a href="https://www.linkedin.com/in/nevin-bali-aa744a2b6/" className="text-gray-600 hover:text-white transition-colors flex items-center gap-2"><LuLinkedin /> LinkedIn</a>
            </div>
            <div className="flex flex-col gap-4">
               <span className="text-xs font-black uppercase text-gray-400 tracking-widest">Status</span>
               <span className="flex items-center gap-2 text-[10px] text-green-500 font-bold"><div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> AI NODE ACTIVE</span>
            </div>
          </div>
        </div>
      </footer>

      <Modal 
  isOpen={openAuthModal} 
  onClose={() => { setOpenAuthModal(false); setcurrentPage("login"); }} 
  hideHeader
>
  {/* White Background with Soft Shadow */}
  <div className="relative bg-white border border-slate-200 rounded-[3rem] p-2 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
    
    {/* Subtle Orange Accent Line at Top */}
    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
    
    <motion.div 
      key={currentPage} 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.4 }} 
      className="p-4"
    >
      {/* Forms inside will need to be light-themed or handled via their own components */}
      {currentPage === "login" && <Login setcurrentPage={setcurrentPage} />}
      {currentPage === "signup" && <SignUp setcurrentPage={setcurrentPage} />}
    </motion.div>
  </div>
</Modal>
    </div>
  );
};

export default LandingPage;