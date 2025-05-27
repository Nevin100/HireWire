import HeroImg from "../assets/hero-imd1.jpg";
import { APP_FEATURES } from "../Util/data.js";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";
import Modal from "../Components/Modal.jsx";
import Login from "./Auth/Login.jsx";
import SignUp from "./Auth/SignUp.jsx";
import { UserContext } from "../Context/UserContext.jsx";
import ProfileInfoCard from "../Components/Cards/ProfileInfoCard.jsx";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setcurrentPage] = useState("login");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <div className="w-full min-h-full bg-[#FFFCEF] relative overflow-hidden mb-56">
        <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-amber-200/20 blur-[65px] z-0" />

        <div className="container mx-auto px-4 pt-6 pb-[200px] relative z-10">
          {/* Header */}
          <header className="flex justify-between items-center mb-[120px] relative">
            <div className="text-3xl text-black font-bold flex gap-4 items-center">
              <img src={"/favicon.svg"} alt="Logo" height={50} width={50} />
              HireWire
            </div>

            {/* Desktop Auth Button */}
            <div className="hidden md:block">
              {user ? (
                <ProfileInfoCard />
              ) : (
                <button
                  className="bg-black text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-800 transition-colors cursor-pointer"
                  onClick={() => {
                    setOpenAuthModal(true);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Login / SignUp
                </button>
              )}
            </div>

            {/* Hamburger Menu Button - Mobile only */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-3xl text-black focus:outline-none"
              >
                ☰
              </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMobileMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-amber-300 rounded-xl shadow-lg p-4 z-50 md:hidden">
                {user ? (
                  <ProfileInfoCard />
                ) : (
                  <button
                    className="block w-full text-left font-medium text-black py-2"
                    onClick={() => {
                      setOpenAuthModal(true);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Login / SignUp
                  </button>
                )}
              </div>
            )}
          </header>

          {/* Hero Section */}
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
              <div className="flex items-center justify-start mb-2">
                <div className="flex items-center gap-2 text-[14px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border-amber-300">
                  <LuSparkles className="text-amber-600" />
                  AI Powered
                </div>
              </div>
              <h1 className="text-5xl text-black font-semibold leading-tight">
                Ace Interviews with <br />
                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324_0%,#FCD760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold">
                  AI Powered
                </span>{" "}
                Learning
              </h1>
            </div>

            <div className="w-full md:w-1/2">
              <p className="text-[17px] text-gray-900 mr-0 md:mr-20 mb-6 font-semibold">
                Get role-specific questions, expand answers when you need them,
                dive deeper into concepts and organise your way, drive from
                preparation to mastery - Your ultimate interview toolkit is here
              </p>

              <button
                className="bg-black text-sm md:text-md font-semibold text-white px-4 py-2 md:px-7 sm:px-3 md:py-2.5 rounded-full"
                onClick={handleCTA}
              >
                Get Started!
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="w-full min-h-full relative z-10">
        <section className="flex justify-center items-center -mt-59">
          <img src={HeroImg} alt="Hero img" className="w-[75vw] rounded-xl" />
        </section>
      </div>

      {/* Features Section */}
      <div className="w-full min-h-full bg-[#FFFCEF] mt-10">
        <div className="container mx-auto px-4 pt-10 pb-20">
          <section className="mt-5">
            <h2 className="text-4xl font-medium text-center mb-12">
              Features That Make You Shine
            </h2>
            <div className="flex flex-col items-center gap-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                {APP_FEATURES.slice(0, 3).map((feature) => (
                  <div
                    key={feature.id}
                    className="bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-200 transition border border-amber-300"
                  >
                    <h3 className="text-base font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {APP_FEATURES.slice(3).map((feature) => (
                  <div
                    key={feature.id}
                    className="bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-200 transition border border-amber-300"
                  >
                    <h3 className="text-base font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setcurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setcurrentPage={setcurrentPage} />}
          {currentPage === "signup" && (
            <SignUp setcurrentPage={setcurrentPage} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;
