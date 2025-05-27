// Question and Answer Prompt for Technical Interviews
export const questionAnswerPrompt = (
  role,
  experience,
  topicsToFocus,
  numberOfQuestions
) => {
  return `You are an AI trained to generate technical interview questions and answers.
  
  Task:
  - Role: ${role}
  - Candidate Experience: ${experience} years
  - Focus Topics: ${topicsToFocus}
  - Number of Questions: ${numberOfQuestions} interview questions
  - For each question, generate a detailded but beginner-friendly answer.
  - If an answer needs a code example, then add a small block inside.
  - keep formatting very clean.
  - Return a pure JSON array like:
  [
    {
      "question": "Question here",
      "answer": "Answer here"  
    },
    '''
  ]
  Important: Do NOT add any extra text. Only return valid JSON.
  `;
};

// Explanation Prompt :
export const conceptExplainPrompt = (question) => {
  return `
    You are an AI trained to generate explanations for a given interview question.

    Task:
    - Explain the following interview question and its concept in depth as if you're teaching a beginner developer.
    - Question: "${question}"
    - After the explanation, provide a short and clear title that summarizes the concept for the article or page header.
    - If the explanation includes a code example, provide a small code block.
    - Keep the formatting very clean and clear.
    - Return the result as a valid JSON Object in the following format:
    {
      "title": "Short title here?",
      "explanation": "Explanation here"
    }
    Important: Do NOT add any extra text outside the JSON Format. Only return valid JSON.  
    `;
};
