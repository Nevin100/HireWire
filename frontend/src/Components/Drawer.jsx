import { useEffect } from "react";
import { LuX } from "react-icons/lu";

const Drawer = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; 
    } else {
      document.body.style.overflow = "auto"; 
    }
    return () => {
      document.body.style.overflow = "auto"; 
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-opacity"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 z-40 h-screen transition-transform duration-500 ease-in-out bg-[#0a0a0a] border-l border-white/10 w-full md:w-[45vw] lg:w-[35vw] shadow-[-20px_0_50px_rgba(0,0,0,0.5)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        tabIndex="-1"
        aria-labelledby="drawer-right-label"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02]">
          <h5
            id="drawer-right-label"
            className="text-lg font-black text-white tracking-tight"
          >
            {title}
          </h5>
          <button
            className="text-gray-500 bg-white/5 hover:bg-orange-500/10 hover:text-orange-500 rounded-xl text-sm w-10 h-10 inline-flex items-center justify-center transition-all border border-white/5"
            type="button"
            onClick={onClose}
          >
            <LuX className="text-xl" />
          </button>
        </div>

        <div className="h-[calc(100%-85px)] overflow-y-auto custom-scrollbar">
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Drawer;