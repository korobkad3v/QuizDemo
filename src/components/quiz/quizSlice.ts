import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface QuizState {
  totalQuestions: number;
  completedQuestions: number;
}

const initialState: QuizState = {
  totalQuestions: 5, 
  completedQuestions: 3,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    completeQuestion(state) {
      if (state.completedQuestions < state.totalQuestions) {
        state.completedQuestions += 1;
      }
    },
    resetQuiz(state) {
      state.completedQuestions = 0;
    },
    setTotalQuestions(state, action: PayloadAction<number>) {
      state.totalQuestions = action.payload;
    },
  },
});

export const { completeQuestion, resetQuiz, setTotalQuestions } = quizSlice.actions;
export default quizSlice.reducer;