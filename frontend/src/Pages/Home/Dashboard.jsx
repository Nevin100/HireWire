/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { LuPlus } from "react-icons/lu";
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
      setSessions(response?.data?.data);
    } catch (err) {
      console.error("Signup error:", err);
      if (err.response) {
        console.log("Response:", err.response.data);
        setError(err.response.data.message || "Signup failed.");
      } else {
        console.log("Error Message:", err.message);
        setError("Network error. Check console.");
      }
    }
  };

  //delete Session
  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));
      toast.success("Session Deleted Successfully");
      setOpenDeleteAlert({
        open: false,
        data: null,
      });
      fetchAllSessions();
    } catch (error) {
      console.log(error);
      toast.error("Internal server issue");
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);
  return (
    <div>
      <DashboardLayout>
        <div className="container mx-auto pt-4 pb-4 px-4 md:px-0">
          {sessions.length === 0 ? (
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="text-amber-500 text-2xl md:text-4xl font-bold text-center tracking-normal flex md:gap-4 ">
                No current interview preperation cards present!!
                <span className="text-2xl md:text-4xl text-amber-400 hidden md:block">
                  <VscEmptyWindow />
                </span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7">
              {sessions.map((data, index) => (
                <SummaryCard
                  key={data?._id}
                  colors={CARD_BG[index % CARD_BG.length]}
                  role={data?.role || ""}
                  topicsToFocus={data?.topicsToFocus || "-"}
                  experience={data?.experience || "-"}
                  questions={data?.questions?.length || "-"}
                  description={data?.description || ""}
                  lastUpdated={
                    data?.updatedAt
                      ? moment(data.updatedAt).format("DD MM YYYY")
                      : ""
                  }
                  onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                  onDelete={() => setOpenDeleteAlert({ open: true, data })}
                />
              ))}
            </div>
          )}

          {/* ➕ Add Button */}
          <button
            className="h-12 md:h-12 flex items-center justfy-center gap-3 bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-md font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-orange-300 fixed bottom-10 md:bottom-20 right-10 md:right-20"
            onClick={() => setOpenCreateModal(true)}
          >
            <LuPlus className="text-2xl text-white" />
            Add New
          </button>
        </div>

        <div className="">
          <Modal
            isOpen={openCreateModal}
            onClose={() => {
              setOpenCreateModal(false);
            }}
            hideHeader
          >
            <div>
              <CreateSessionForm />
            </div>
          </Modal>

          <Modal
            isOpen={OpenDeleteAlert?.open}
            onClose={() => {
              setOpenDeleteAlert({ open: false, data: null });
            }}
            title="Delete Alert"
          >
            <div className="w-[30vw]">
              <DeleteAlertContent
                content="Are you sure you want to delete this session details ?"
                onDelete={() => {
                  deleteSession(OpenDeleteAlert.data);
                }}
              />
            </div>
          </Modal>
        </div>
      </DashboardLayout>
      ;
    </div>
  );
};

export default Dashboard;
