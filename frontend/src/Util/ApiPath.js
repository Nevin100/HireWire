export const BASE_URL = "http://localhost:4000";

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    GET_PROFILE: "/api/auth/profile",
  },

  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-image",
  },

  AI: {
    GENERATE_QUESTIONS: "/api/ai/generate-questions",
    GENERATE_EXPLANATIONS: "/api/ai/generate-explanations",
  },

  SESSION: {
    CREATE: "/api/sessions/create-session",
    GET_ONE: (id) => `/api/sessions/get-session/${id}`,
    GET_ALL: "/api/sessions/get-all-sessions",
    DELETE: (id) => `/api/sessions/delete-session/${id}`,
  },

  QUESTION: {
    ADD_TO_SESSION: "/api/questions/add",
    PIN: (id) => `/api/questions/${id}/pin`,
    UPDATE_NOTE: (id) => `/api/questions/${id}/note`,
  },
};
