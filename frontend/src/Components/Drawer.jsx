import { useEffect } from "react";
import { LuX } from "react-icons/lu";

const Drawer = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable page scroll
    } else {
      document.body.style.overflow = "auto"; // Enable it back
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup when component unmounts
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed top-[64px] right-0 z-40 h-[calc(100dvh-64px)] transition-transform bg-white w-full md:w-[40vw] shadow-2xl shadow-cyan-800/10 border-r border-l-gray-800 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      tabIndex="-1"
      aria-labelledby="drawer-right-label"
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h5
          id="drawer-right-label"
          className="text-base font-semibold text-black"
        >
          {title}
        </h5>
        <button
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center"
          type="button"
          onClick={onClose}
        >
          <LuX className="text-lg" />
        </button>
      </div>

      <div className="h-[calc(100%-64px)] overflow-y-auto p-4">
        <div className="text-md mb-6">{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
