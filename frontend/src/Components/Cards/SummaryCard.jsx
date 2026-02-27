import { LuTrash2, LuCalendar, LuBrainCircuit, LuArrowRight } from "react-icons/lu";
import { getInitials } from "../../Util/helper.js";

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      className="group relative bg-[#0f0f0f] border border-white/[0.08] rounded-[2.5rem] p-3 cursor-pointer transition-all duration-500 hover:border-orange-500/40 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden"
      onClick={onSelect}
    >
      <div 
        className="absolute -top-16 -right-16 w-40 h-40 blur-[60px] rounded-full opacity-0 group-hover:opacity-20 transition-all duration-700 pointer-events-none"
        style={{ background: colors.bgcolor }}
      />

      <div
        className="rounded-[2rem] p-6 relative overflow-hidden mb-3"
        style={{ background: colors.bgcolor }} 
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[3px] group-hover:bg-black/40 transition-colors" />

        <div className="relative flex items-center gap-5 z-10">
          <div className="flex-shrink-0 w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform duration-500">
            <span className="text-2xl font-black text-white tracking-tighter drop-shadow-md">
              {getInitials(role)}
            </span>
          </div>
          
          <div className="flex-grow">
            <h2 className="text-xl font-bold text-white tracking-tight leading-[1.1] group-hover:text-orange-300 transition-colors">
              {role}
            </h2>
            <div className="flex items-center gap-1.5 mt-2 opacity-80">
              <LuBrainCircuit className="text-orange-400" size={14} />
              <p className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">
                {topicsToFocus}
              </p>
            </div>
          </div>
        </div>

        <button
          className="flex items-center justify-center w-10 h-10 text-white/50 hover:text-rose-500 hover:bg-rose-500/10 rounded-full transition-all absolute top-4 right-4 z-20"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <LuTrash2 size={18} />
        </button>
      </div>

      <div className="px-5 py-4">
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <div className="text-[10px] font-black text-gray-300 px-3 py-1.5 bg-white/[0.03] border border-white/[0.08] rounded-lg tracking-widest uppercase">
            {experience} {experience == 1 ? "Year" : "Years"} Exp
          </div>
          <div className="text-[10px] font-black text-orange-500 px-3 py-1.5 bg-orange-500/5 border border-orange-500/20 rounded-lg tracking-widest uppercase">
            {questions} Questions
          </div>
        </div>

        <p className="text-[13.5px] text-gray-400 leading-[1.6] line-clamp-2 h-[44px] group-hover:text-gray-300 transition-colors">
          {description || "Explore your personalized roadmap tailored for " + role + " preparation."}
        </p>

        <div className="flex items-center justify-between mt-6 pt-5 border-t border-white/[0.05]">
          <div className="flex items-center gap-2 text-gray-600 group-hover:text-gray-500 transition-colors">
            <LuCalendar size={13} />
            <span className="text-[10px] font-bold uppercase tracking-widest">{lastUpdated}</span>
          </div>
          <div className="flex items-center gap-2 text-orange-500 font-bold text-[11px] opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500 uppercase tracking-tighter">
             Start Prep <LuArrowRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;