import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Difficulties, Types } from "../enums/ApiTypes";
import { TriviaType } from "../types/TriviaType";

export interface Setup {
    categoryName: string | null,
    questionCategory: number | null,
    questionAmount: number,
    questionDifficulty: Difficulties | null,
    questionType: Types | null,
    triviaQuestions: TriviaType[] | null,
}

const initialState : Setup = {
    categoryName: null,
    questionCategory: null,
    questionAmount: 1,
    questionDifficulty: null,
    questionType: null,
    triviaQuestions: null
}

const setupSlice = createSlice({
  name: 'setup',
  initialState,
  reducers: {
    addCategory(state, action: PayloadAction<number | null>) {
      state.questionCategory = action.payload;
    },
    addCategoryName(state, action: PayloadAction<string | null>) {
      state.categoryName = action.payload;
    },
    addDifficulty(state, action: PayloadAction<Difficulties>) {
      state.questionDifficulty = action.payload || null;
    },
    addType(state, action: PayloadAction<Types>) {
      state.questionType = action.payload || null;
    },
    addAmount(state, action: PayloadAction<number>) {
      state.questionAmount = action.payload;
    },
    addTriviaQuestions(state, action: PayloadAction<TriviaType[]>) {
      state.triviaQuestions = action.payload;
    },
  },
})

export const { addCategory, addCategoryName, addDifficulty, addType, addAmount, addTriviaQuestions } = setupSlice.actions

const store = configureStore({
    reducer: {
        setup : setupSlice.reducer,
    },
});

type RootState = ReturnType<typeof store.getState>;

export const selectSetup = (state:RootState) => state.setup;

export default store;