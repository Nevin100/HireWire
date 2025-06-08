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

  const deleteSession = async (sessionData) => {};

  useEffect(() => {
    fetchAllSessions();
  }, []);
  return (
    <div>
      <DashboardLayout>
        <div className="container mx-auto pt-4 pb-4 ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
            {sessions?.map((data, index) => (
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
          <button
            className="h-12 md:h-12 flex items-center justfy-center gap-3 bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-md font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-orange-300 fixed bottom-10 md:bottom-20 right-10 md:right-20 "
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
        </div>
      </DashboardLayout>
      ;
    </div>
  );
};

export default Dashboard;
