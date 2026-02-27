/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import DrawerLoader from "../../Components/Loaders/DrawerLoader.jsx";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../Components/layout/DashboardLayout.jsx";
import RoleInfoHeader from "../../Components/RoleInfoHeader.jsx";
import axiosInstance from "../../Util/axiosInstance.js";
import { API_PATHS } from "../../Util/ApiPath.js";
import QuestionCard from "../../Components/Cards/QuestionCard.jsx";
import AiResponsePreviewer from "../../Components/AiResponsePreviewer.jsx";
import Drawer from "../../Components/Drawer.jsx";
import SpinnerLoader from "../../Components/Loaders/SpinnerLoader.jsx";

const InterviewPrep = () => {
  const { sessionId } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [error, setError] = useState("");

  const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId),
      );
      console.log("Individual Session data : ", response.data.data);
      if (response.data && response.data.data) {
        setSessionData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generateConceptExplanation = async (question) => {
    try {
      setError("");
      setExplanation(null);
      setIsLoading(true);
      setOpenLeanMoreDrawer(true);

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATIONS,
        { question },
      );

      const explanationObj = response.data.data;
      console.log("Explanation :", explanationObj);

      setExplanation(explanationObj);
      setIsLoading(false);
    } catch (error) {
      setError("Failed to generate Explanation");
      setExplanation(null);
      setIsLoading(false);
      console.log(error);
    }
  };

  const toggleQuestionPinState = async (questionId) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.PIN(questionId),
      );

      if (response.data && response.data.data.question) {
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadMoreQuesions = async () => {
    try {
      setIsUpdateLoader(true);
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role: sessionData?.role,
          experience: sessionData?.experience,
          topicsToFocus: sessionData?.topicsToFocus,
          numberOfQuestions: 10,
        },
      );

      const generatedQuestions = aiResponse.data.data;
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.ADD_TO_SESSION,
        {
          sessionId,
          questions: generatedQuestions,
        },
      );

      if (response.data) {
        toast.success("Added More Question Answers");
        setIsUpdateLoader(false);
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }
    return () => {};
  }, [sessionId]);
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#050505]">
        <RoleInfoHeader
          role={sessionData?.role || ""}
          topicsToFocus={sessionData?.topicsToFocus || ""}
          experience={sessionData?.experience || "-"}
          questions={sessionData?.questions?.length || "-"}
          description={sessionData?.description || ""}
          lastUpdated={
            sessionData?.updatedAt
              ? moment(sessionData.updatedAt).format("DD MMM YYYY")
              : ""
          }
        />

        <div className="container mx-auto pt-12 pb-20 px-4 md:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-6 w-1 bg-orange-500 rounded-full" />
            <h2 className="text-2xl font-black text-white tracking-tight">
              Curated Interview Q&A
            </h2>
          </div>

          <div className="grid grid-cols-12 gap-8">
            <div
              className={`col-span-12 ${openLeanMoreDrawer ? "lg:col-span-7" : "lg:col-span-8"} transition-all duration-500`}
            >
              <AnimatePresence mode="popLayout">
                {[...(sessionData?.questions || [])]
                  .sort((a, b) => (b.isPinned === true) - (a.isPinned === true))
                  .map((data, index) => (
                    <motion.div
                      key={data._id || index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      layout
                    >
                      <QuestionCard
                        question={data?.question}
                        answer={data?.answer}
                        onLearnMore={() =>
                          generateConceptExplanation(data.question)
                        }
                        isPinned={data?.isPinned}
                        onTogglePin={() => toggleQuestionPinState(data._id)}
                      />
                    </motion.div>
                  ))}
              </AnimatePresence>

              {/* Load More Button - Styled like a premium action */}
              {!isLoading && sessionData?.questions?.length > 0 && (
                <div className="flex items-center justify-center mt-12">
                  <button
                    className="group flex items-center gap-3 text-sm font-bold text-white bg-white/5 border border-white/10 hover:border-orange-500/50 hover:bg-orange-500/5 px-10 py-4 rounded-2xl transition-all cursor-pointer"
                    onClick={uploadMoreQuesions}
                    disabled={isUpdateLoader}
                  >
                    {isUpdateLoader ? (
                      <SpinnerLoader />
                    ) : (
                      <LuListCollapse className="text-lg group-hover:rotate-180 transition-transform duration-500" />
                    )}
                    Load More Insights
                  </button>
                </div>
              )}
            </div>
          </div>

          <Drawer
            isOpen={openLeanMoreDrawer}
            onClose={() => setOpenLeanMoreDrawer(false)}
            title={!isLoading ? explanation?.title : "AI Reasoning..."}
          >
            <div className="p-4 bg-[#0a0a0a] min-h-full">
              {isLoading && <DrawerLoader />}
              {!isLoading && explanation?.explanation && (
                <AiResponsePreviewer content={explanation?.explanation} />
              )}
            </div>
          </Drawer>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
