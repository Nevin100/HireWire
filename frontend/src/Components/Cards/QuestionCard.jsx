import { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import AiResponsePreviewer from "../AiResponsePreviewer";

const QuestionCard = ({ question, answer, onLearnMore, isPinned, onTogglePin }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    setHeight(isExpanded ? contentRef.current.scrollHeight + 20 : 0);
  }, [isExpanded]);

  return (
    <div className={`group mb-6 transition-all duration-500 rounded-[2rem] border ${isExpanded ? 'bg-white/[0.04] border-white/20' : 'bg-[#121212] border-white/5 hover:border-white/20'}`}>
      <div className="p-6 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-5">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs transition-colors ${isExpanded ? 'bg-orange-500 text-white' : 'bg-white/5 text-gray-500'}`}>
              Q
            </div>
            <h3 className={`text-base md:text-lg font-bold tracking-tight leading-snug transition-colors ${isExpanded ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
              {question}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
             <button
                onClick={(e) => { e.stopPropagation(); onTogglePin(); }}
                className={`p-2 rounded-xl border transition-all ${isPinned ? 'bg-orange-500/10 border-orange-500 text-orange-500' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white'}`}
              >
                {isPinned ? <LuPinOff size={18} /> : <LuPin size={18} />}
              </button>
              
              <button
                onClick={(e) => { e.stopPropagation(); setIsExpanded(true); onLearnMore(); }}
                className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/5 px-4 py-2 rounded-xl text-xs font-black text-gray-400 hover:text-cyan-400 transition-all"
              >
                <LuSparkles size={14} /> EXPLORE AI
              </button>
              
              <LuChevronDown className={`text-gray-600 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} size={20} />
          </div>
        </div>
      </div>

      <div className="overflow-hidden transition-all duration-500 ease-in-out" style={{ maxHeight: `${height}px` }}>
        <div ref={contentRef} className="px-6 pb-8">
          <div className="bg-black/40 border border-white/5 rounded-2xl p-6 shadow-inner">
             <div className="flex items-center gap-2 mb-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">
               <div className="w-1.5 h-1.5 rounded-full bg-orange-500" /> AI Generated Answer
             </div>
             <AiResponsePreviewer content={answer} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default QuestionCard;
