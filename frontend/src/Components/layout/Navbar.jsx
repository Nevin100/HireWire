import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="h-20 bg-white border border-b border-gray-200/50 shadow-md shadow-orange-300/65 backdrop-blur=[2px] py-2.5">
      <div className=" container mx-auto flex flex-row items-center justify-between gap-5">
        <Link to={"/dashboard"}>
          <div className="text-3xl text-black font-bold flex gap-2 items-center">
            <img src={"/favicon.svg"} alt="Logo" height={50} width={50} />
            HireWire
          </div>
        </Link>

        <ProfileInfoCard />
      </div>
    </div>
  );
};

export default Navbar;
