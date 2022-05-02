export const BASE_URL = "https://the-trivia-api.com/api";

export const API_URL = { 
  GET_QUESTIONS : `${BASE_URL}/questions/`,
  GET_CATEGORIES : `${BASE_URL}/categories`,
} as const;
