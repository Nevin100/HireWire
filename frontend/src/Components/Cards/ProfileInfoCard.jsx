import { UserContext } from "../../Context/UserContext.jsx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
//
const ProfileInfoCard = () => {
  const navigate = useNavigate();
  const { user, clearUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  console.log("Profile Card : ", user);
  console.log(user);
  return (
    <div className="flex items-center gap-4">
      {/* <img
        src={user?.profileImageUrl}
        alt="Profile"
        className="w-11 h-11 bg-gray-300 rounded-full"
      /> */}

      <div className="flex flex-col justify-center gap-1">
        <span className="text-md text-black font-semibold">
          {user?.name || "User"}
        </span>

        <button
          onClick={handleLogout}
          className="text-white bg-amber-500 hover:bg-black hover:text-amber-500 transition-colors px-5 py-1 rounded-md text-sm font-medium cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoCard;
