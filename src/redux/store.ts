import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Difficulties, Types } from "../enums/ApiTypes";
import { TriviaType } from "../types/TriviaType";

export interface Setup {
    questionCategories: string[],
    questionAmount: number,
    questionDifficulty: Difficulties | null,
    questionType: Types | null,
    triviaQuestions: TriviaType[] | null,
    result: number,

}

const initialState : Setup = {
    questionCategories: [],
    questionAmount: 1,
    questionDifficulty: null,
    questionType: null,
    triviaQuestions: null,
    result: 0
}

const setupSlice = createSlice({
  name: 'setup',
  initialState,
  reducers: {
    addCategory(state, action: PayloadAction<string>) {
      state.questionCategories.push(action.payload);
    },
    addDifficulty(state, action: PayloadAction<Difficulties>) {
      state.questionDifficulty = action.payload || null;
    },
    addAmount(state, action: PayloadAction<number>) {
      state.questionAmount = action.payload;
    },
    addTriviaQuestions(state, action: PayloadAction<TriviaType[]>) {
      state.triviaQuestions = action.payload;
    },
    addResult(state) {
      state.result += 1;
    },
    clearState(state) {
      state = initialState;
    },
  },
})

export const { addCategory, addDifficulty, addAmount, addTriviaQuestions, addResult, clearState } = setupSlice.actions

const store = configureStore({
    reducer: {
        setup : setupSlice.reducer,
    },
});

type RootState = ReturnType<typeof store.getState>;

export const selectSetup = (state:RootState) => state.setup;

export default store;