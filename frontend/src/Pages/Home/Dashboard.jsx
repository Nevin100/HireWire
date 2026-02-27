/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { LuPlus, LuZap } from "react-icons/lu";
import { CARD_BG } from "../../Util/data.js";
import toast from "react-hot-toast";
import DashboardLayout from "../../Components/layout/DashboardLayout.jsx";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Util/axiosInstance.js";
import { API_PATHS } from "../../Util/ApiPath.js";
import moment from "moment";
import SummaryCard from "../../Components/Cards/SummaryCard.jsx";
import Modal from "../../Components/Modal.jsx";
import CreateSessionForm from "./CreateSessionForm.jsx";
import DeleteAlertContent from "../../Components/DeleteAlertContent.jsx";
import { VscEmptyWindow } from "react-icons/vsc";
import { motion, AnimatePresence } from "framer-motion"; // Add framer-motion for that smooth feel

const Dashboard = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [OpenDeleteAlert, setOpenDeleteAlert] = useState({
    data: null,
    open: false,
  });

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response?.data?.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to load sessions");
    }
  };

  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));
      toast.success("Session Deleted Successfully");
      setOpenDeleteAlert({ open: false, data: null });
      fetchAllSessions();
    } catch (error) {
      toast.error("Internal server issue");
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      <div className="relative min-h-screen bg-[#050505] text-white">
        {/* Top Radial Glow for Landing Page vibe */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 container mx-auto pt-10 pb-24 px-4 md:px-8">
          {/* Enhanced Header */}
          <header className="mb-16 relative">
            <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-orange-500/5 border border-orange-500/10 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-orange-500 uppercase tracking-[0.2em] text-[10px] font-black">
                Ai Intelligence Active
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-5">
              Your{" "}
              <span className="bg-gradient-to-r from-white via-white/90 to-white/40 bg-clip-text text-transparent">
                Interview
              </span>
              <br />
              <span className="text-orange-500">Preparation Sessions...</span>
            </h1>

            <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-transparent rounded-full mb-6" />

            <p className="text-gray-500 text-base md:text-lg max-w-2xl leading-relaxed">
              Precision-engineered preparation guides. Select a roadmap below to
              begin your deep-dive session.
            </p>
          </header>

          <AnimatePresence mode="wait">
            {sessions.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="min-h-[50vh] flex flex-col items-center justify-center border border-white/5 rounded-[3rem] bg-white/[0.02] backdrop-blur-sm"
              >
                <div className="w-20 h-20 bg-orange-500/10 rounded-3xl flex items-center justify-center mb-6 border border-orange-500/20 shadow-[0_0_30px_rgba(249,115,22,0.1)]">
                  <LuZap className="text-3xl text-orange-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  No active sessions
                </h2>
                <p className="text-gray-500 text-center max-w-xs mb-8">
                  Launch your first preparation session and start mastering your
                  role.
                </p>
                <button
                  onClick={() => setOpenCreateModal(true)}
                  className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-bold hover:bg-orange-500 hover:text-white transition-all duration-300"
                >
                  <LuPlus className="group-hover:rotate-90 transition-transform" />{" "}
                  Create New
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {sessions.map((data, index) => (
                  <SummaryCard
                    key={data?._id}
                    colors={CARD_BG[index % CARD_BG.length]}
                    role={data?.role || ""}
                    topicsToFocus={data?.topicsToFocus || "-"}
                    experience={data?.experience || "-"}
                    questions={data?.questions?.length || "0"}
                    description={data?.description || ""}
                    lastUpdated={
                      data?.updatedAt
                        ? moment(data.updatedAt).format("DD MMM YYYY")
                        : ""
                    }
                    onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                    onDelete={() => setOpenDeleteAlert({ open: true, data })}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>

          {/* Floating Action Button */}
          <button
            className="fixed bottom-10 right-10 md:bottom-12 md:right-12 h-16 flex items-center gap-3 bg-gradient-to-br from-orange-400 to-orange-600 text-white px-8 rounded-[2rem] font-bold shadow-2xl z-50 hover:scale-105 active:scale-95 transition-all border border-orange-300/20"
            onClick={() => setOpenCreateModal(true)}
          >
            <LuPlus className="text-2xl" />
            <span className="hidden sm:inline">Add New Session</span>
          </button>
        </div>
      </div>

      {/* Modals Containers remain logically same but within the layout */}
      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
      >
        <div className="bg-white p-2 rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-2xl">
          <CreateSessionForm />
        </div>
      </Modal>

      <Modal
        isOpen={OpenDeleteAlert?.open}
        onClose={() => setOpenDeleteAlert({ open: false, data: null })}
        title="Confirm Delete"
      >
        <div className="w-full md:w-[400px] p-2">
          <DeleteAlertContent
            content="This will permanently delete this preparation card. Continue?"
            onDelete={() => deleteSession(OpenDeleteAlert.data)}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;
