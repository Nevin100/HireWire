import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
    },
    question: {
      type: String,
    },
    answer: {
      type: String,
    },
    note: {
      type: String,
    },
    isPinned: {
      type: Boolean,
      default: null,
    },
  },
  {
    timeStamps: true,
  }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;
