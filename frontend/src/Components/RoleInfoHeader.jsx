/* eslint-disable no-unused-vars */
const RoleInfoHeader = ({ role, topicsToFocus, experience, questions, lastUpdated, description }) => {
  return (
    <div className="relative overflow-hidden bg-[#0a0a0a] border-b border-white/10">
      {/* Background Animated Blobs */}
      <div className="absolute top-0 right-0 w-[50%] h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-orange-600 blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[10%] w-64 h-64 bg-blue-600 blur-[120px] animate-blob" />
      </div>

      <div className="container mx-auto px-4 md:px-8 py-16 relative z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Active Session</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4 leading-tight">
            {role} <span className="text-orange-500 text-2xl md:text-3xl block md:inline font-medium">Preparation</span>
          </h1>
          
          <p className="text-gray-400 text-base md:text-lg mb-8 max-w-2xl font-medium leading-relaxed">
            Focused on: <span className="text-white">{topicsToFocus}</span>
          </p>

          <div className="flex flex-wrap items-center gap-4">
            {[
              { label: "Experience", value: `${experience} Years` },
              { label: "Resources", value: `${questions} Q&A` },
              { label: "Refreshed", value: lastUpdated }
            ].map((stat, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/10 px-4 py-2 rounded-xl">
                <span className="text-[10px] block uppercase tracking-widest text-gray-500 font-bold mb-0.5">{stat.label}</span>
                <span className="text-sm text-white font-bold">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleInfoHeader;