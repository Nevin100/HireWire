import Question from "../Models/question.model.js";
import Session from "../Models/session.model.js";

//Create Question :
export const addQuestionsToSession = async (req, res) => {
  try {
    const { sessionId, questions } = req.body;

    if (!sessionId || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // Find the session by ID
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Create new questions and associate them with the session
    const createdQuestions = await Question.insertMany(
      questions.map((q) => ({
        session: sessionId,
        question: q.question,
        answer: q.answer,
      }))
    );

    session.questions.push(...createdQuestions.map((q) => q._id));
    await session.save();

    res.status(201).json({
      message: "Questions added successfully",
      data: createdQuestions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: true });
  }
};

//Get toggle Pin Question:
export const togglePinQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res
        .status(404)
        .json({ message: "Question not found", error: true });
    }

    question.isPinned = !question.isPinned;

    await question.save();
    res.status(200).json({
      message: "Question pin status updated successfully",
      data: question,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Update Question Note:
export const updateQuestionNote = async (req, res) => {
  try {
    const { note } = req.body;
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res
        .status(404)
        .json({ message: "Question not found", error: true });
    }

    question.note = note || "";
    await question.save();

    res.status(200).json({
      message: "Question note updated successfully",
      data: question,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
