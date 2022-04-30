export const BASE_URL = "https://opentdb.com";

export const API_URL = { 
  GET_NEW_SESSION_TOKEN : `${BASE_URL}/api_token.php?command=request`,
  GET_CATEGORIES : `${BASE_URL}/api_category.php`,
} as const;
