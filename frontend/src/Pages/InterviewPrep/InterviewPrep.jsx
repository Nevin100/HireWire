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
        API_PATHS.SESSION.GET_ONE(sessionId)
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
        { question }
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
        API_PATHS.QUESTION.PIN(questionId)
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
        }
      );

      const generatedQuestions = aiResponse.data.data;
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.ADD_TO_SESSION,
        {
          sessionId,
          questions: generatedQuestions,
        }
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
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || "-"}
        questions={sessionData?.questions?.length || "-"}
        description={sessionData?.description || ""}
        lastUpdated={
          sessionData?.updatedAt
            ? moment(sessionData.updatedAt).format("DD MM YYYY")
            : ""
        }
      />

      <div className="container mx-auto pt-4 pb-4 px-4 md:px-0 ">
        <h2 className="text-lg font-semibold color-black">Interview Q&A</h2>
        <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
          <div
            className={`col-span-12 ${
              openLeanMoreDrawer ? "md:col-span-7" : "md:col-span-8"
            }`}
          >
            <AnimatePresence>
              {[...(sessionData?.questions || [])]
                .sort((a, b) => (b.isPinned === true) - (a.isPinned === true))
                .map((data, index) => {
                  return (
                    <motion.div
                      key={data._id || index}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{
                        duration: 0.4,
                        type: "spring",
                        stiffness: 100,
                        delay: index * 0.1,
                        deeping: 15,
                      }}
                      layout
                      layoutId={`question-${data._id || index}`}
                    >
                      <>
                        <QuestionCard
                          question={data?.question}
                          answer={data?.answer}
                          onLearnMore={() => {
                            generateConceptExplanation(data.question);
                          }}
                          isPinned={data?.isPinned}
                          onTogglePin={() => toggleQuestionPinState(data._id)}
                        />

                        {!isLoading &&
                          sessionData?.questions?.length == index + 1 && (
                            <div className="flex items-center justify-center mt-5">
                              <button
                                className="flex items-center gap-3 text-sm text-white font-medium bg-black px-5 py-3 mr-2 rounded text-nowrap cursor-pointer"
                                onClick={uploadMoreQuesions}
                                disabled={isLoading || isUpdateLoader}
                              >
                                {isUpdateLoader ? (
                                  <SpinnerLoader />
                                ) : (
                                  <LuListCollapse className="text-lg" />
                                )}{" "}
                                Load More
                              </button>
                            </div>
                          )}
                      </>
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          </div>
        </div>

        <Drawer
          isOpen={openLeanMoreDrawer}
          onClose={() => setOpenLeanMoreDrawer(false)}
          title={!isLoading && explanation?.title}
        >
          {error && (
            <p className="flex gap-2 text-red-500 text-md font-medium">
              <LuCircleAlert className="mt-1" />
              {error}
            </p>
          )}
          {isLoading && <DrawerLoader />}
          {!isLoading && explanation?.explanation && (
            <AiResponsePreviewer content={explanation?.explanation} />
          )}
        </Drawer>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
