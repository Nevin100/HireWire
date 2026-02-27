import { UserContext } from "../../Context/UserContext.jsx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { getInitials } from "../../Util/helper.js"; 
import axiosInstance from "../../Util/axiosInstance.js";
import { API_PATHS } from "../../Util/ApiPath.js";

const ProfileInfoCard = () => {
  const navigate = useNavigate();
  const { user, clearUser } = useContext(UserContext);

  const handleLogout = async () => {
  try {
    await axiosInstance.post(API_PATHS.AUTH.LOGOUT);
  } catch (err) {
    console.error(err);
  } finally {
    clearUser();
    navigate("/");
  }
};
  return (
    <div className="flex items-center gap-3 md:gap-4 bg-white/[0.03] border border-white/10 p-1.5 pr-4 rounded-2xl">
      
      {/* Avatar Circle - Mobile friendly */}
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-orange-500/20">
        {getInitials(user?.name || "User")}
      </div>

      <div className="flex flex-col">
        {/* Name - Hidden on very small screens if needed, or kept short */}
        <span className="text-sm md:text-md text-white font-bold tracking-tight leading-none mb-1">
          {user?.name?.split(" ")[0] || "User"}
        </span>

        {/* Logout Button as a sleek link */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-[10px] md:text-[11px] font-bold text-gray-500 hover:text-orange-500 uppercase tracking-widest transition-colors cursor-pointer"
        >
          <LuLogOut size={12} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoCard;