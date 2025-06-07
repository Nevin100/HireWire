import { useContext } from "react";
import { UserContext } from "../../Context/UserContext.jsx";
import Navbar from "../../Components/layout/Navbar.jsx";

const DashboardLayout = ({ children }) => {
  const { user } = useContext(UserContext);
  console.log("Dashboard Layout :", user);
  return (
    <div>
      <Navbar />

      {user ? (
        <div>{children}</div>
      ) : (
        <div>
          <h2 className="bg-red-500 text-center font-semibold">
            You need to be Authorize
          </h2>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
