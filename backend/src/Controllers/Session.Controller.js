import Session from "../Models/session.model.js";
import Question from "../Models/question.model.js";

export const createSession = async (req, res) => {
  try {
    const { role, experience, description, topicsToFocus, questions } =
      req.body;
    const userId = req.user._id;

    const session = await Session.create({
      user: userId,
      role,
      experience,
      description,
      topicsToFocus,
    });

    const questionDocs = await Promise.all(
      questions.map(async (q) => {
        const question = await Question.create({
          session: session._id,
          question: q.question,
          answer: q.answer,
        });
        return question._id;
      })
    );

    session.questions = questionDocs;
    await session.save();

    res.status(200).json({
      message: "Session created successfully",
      data: session,
      error: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//get Sessions :
export const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("questions");

    res.status(200).json({
      message: "Sessions fetched successfully",
      data: sessions,
      error: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//get Single Session :
export const getSession = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await Session.findById(id)
      .populate("questions")
      .sort({ isPinned: -1, createdAt: 1 })
      .exec();

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.status(200).json({
      message: "Session fetched successfully",
      data: session,
      error: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Delete Session :
export const deleteSession = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await Session.findById(id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this session" });
    }

    await Question.deleteMany({ session: session._id });

    await session.deleteOne();

    res.status(200).json({
      message: "Session deleted successfully",
      error: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
