import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// import Login from "./pages/Auth/Login.jsx";
// import SignUp from "./pages/Auth/SignUp.jsx";
import LandingPage from "./Pages/LandingPage.jsx";
import Dashboard from "./Pages/Home/Dashboard.jsx";
import InterviewPrep from "./Pages/InterviewPrep/InterviewPrep.jsx";
import UserProvider from "./Context/UserContext.jsx";

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} /> */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/interview-prep/:sessionId"
              element={<InterviewPrep />}
            />
          </Routes>
        </Router>

        <Toaster
          toastOptions={{
            className: "",
            style: {
              fontSize: "13px",
            },
          }}
        />
      </div>
    </UserProvider>
  );
};

export default App;
