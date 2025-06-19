import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { QuizQuestionProps } from './QuizQuestion';

interface Answer {
  questionIndex: number;
  optionLetter: string;
}

interface QuizState {
  questions: QuizQuestionProps[];
  totalQuestions: number;
  currentQuestionId: number;
  completedQuestions: number;
  userAnswers: Answer[];
}


const initialState: QuizState = {
  questions: [
    {
      id: 1,
      question: "PREDICT THE TOP LOSER (for tomorrow) across these indices",
      options: [
        { optionLetter: "A", stock: { stockIndex: "NIFTY50", price: "₹ 17,356,", priceChange: -0.31 }, questionId: 1 },
        { optionLetter: "B", stock: { stockIndex: "NIFTYNEXT50", price: "₹56,226,", priceChange: -0.31 }, questionId: 1 },
        { optionLetter: "C", stock: { stockIndex: "NIFTYBANK", price: "₹ 17,356,", priceChange: 2.12 }, questionId: 1 },
      ]
    },
    {
      id: 2,
      question: "Q2",
      options: [
        { optionLetter: "A", stock: { stockIndex: "NIFTY50", price: "₹ 17,356,", priceChange: -0.31 }, questionId: 2 },
        { optionLetter: "B", stock: { stockIndex: "NIFTYNEXT50", price: "₹56,226,", priceChange: -0.31 }, questionId: 2 },
        { optionLetter: "C", stock: { stockIndex: "NIFTYBANK", price: "₹ 17,356,", priceChange: 2.12 }, questionId: 2 },
      ]
    },
    {
      id: 3,
      question: "Q3",
      options: [
        { optionLetter: "A", stock: { stockIndex: "NIFTY50", price: "₹ 17,356,", priceChange: -0.31 }, questionId: 3 },
        { optionLetter: "B", stock: { stockIndex: "NIFTYNEXT50", price: "₹56,226,", priceChange: -0.31 }, questionId: 3 },
        { optionLetter: "C", stock: { stockIndex: "NIFTYBANK", price: "₹ 17,356,", priceChange: 2.12 }, questionId: 3 },
      ]
    },
  ],
  totalQuestions: 5,
  completedQuestions: 3,
  currentQuestionId: 0,
  userAnswers: [],
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    answerQuestion(state, action: PayloadAction<{ questionId: number, optionLetter: string }>) {
      const existingAnswer = state.userAnswers.find(answer => answer.questionIndex === action.payload.questionId);
      if (existingAnswer) {
        existingAnswer.optionLetter = action.payload.optionLetter;
      } else {
        state.userAnswers.push({
          questionIndex: action.payload.questionId,
          optionLetter: action.payload.optionLetter,
        });
      }
    },
    completeQuestion(state) {
      if (state.completedQuestions < state.totalQuestions) {
        state.completedQuestions += 1;
        state.currentQuestionId += 1;
      }
    },
    resetQuiz(state) {
      state = {
        ...initialState,
      };
    },
    setTotalQuestions(state, action: PayloadAction<number>) {
      state.totalQuestions = action.payload;
    },
  },
});

export const { completeQuestion, resetQuiz, setTotalQuestions, answerQuestion } = quizSlice.actions;
export default quizSlice.reducer;