import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { QuizQuestionProps } from './QuizQuestion';

interface Answer {
  questionId: number;
  optionLetter: string;
}

interface Question extends QuizQuestionProps {
  answered: boolean;
  correctAnswer: string;
}

interface QuizState {
  questions: Question[];
  totalQuestions: number;
  currentQuestionIndex: number;
  completedQuestions: number;
  userAnswers: Answer[];
  isCompleted: boolean;
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
      ],
      answered: false,
      correctAnswer: "B"
    },
    {
      id: 2,
      question: "Q2",
      options: [
        { optionLetter: "A", stock: { stockIndex: "NIFTY50", price: "₹ 17,356,", priceChange: -0.31 }, questionId: 2 },
        { optionLetter: "B", stock: { stockIndex: "NIFTYNEXT50", price: "₹56,226,", priceChange: -0.31 }, questionId: 2 },
        { optionLetter: "C", stock: { stockIndex: "NIFTYBANK", price: "₹ 17,356,", priceChange: 2.12 }, questionId: 2 },
      ],
      answered: false,
      correctAnswer: "B"
    },
    {
      id: 3,
      question: "Q3",
      options: [
        { optionLetter: "A", stock: { stockIndex: "NIFTY50", price: "₹ 17,356,", priceChange: -0.31 }, questionId: 3 },
        { optionLetter: "B", stock: { stockIndex: "NIFTYNEXT50", price: "₹56,226,", priceChange: -0.31 }, questionId: 3 },
        { optionLetter: "C", stock: { stockIndex: "NIFTYBANK", price: "₹ 17,356,", priceChange: 2.12 }, questionId: 3 },
      ],
      answered: false,
      correctAnswer: "A"
    },
    {
      id: 4,
      question: "PREDICT THE TOP LOSER (for tomorrow) across these indices",
      options: [
        { optionLetter: "A", stock: { stockIndex: "NIFTY50", price: "₹ 17,356,", priceChange: -0.31 }, questionId: 4 },
        { optionLetter: "B", stock: { stockIndex: "NIFTYNEXT50", price: "₹56,226,", priceChange: -0.31 }, questionId: 4 },
        { optionLetter: "C", stock: { stockIndex: "NIFTYBANK", price: "₹ 17,356,", priceChange: 2.12 }, questionId: 4 },
      ],
      answered: false,
      correctAnswer: "C"
    },
    {
      id: 5,
      question: "PREDICT THE TOP LOSER (for tomorrow) across these indices",
      options: [
        { optionLetter: "A", stock: { stockIndex: "NIFTY50", price: "₹ 17,356,", priceChange: -0.31 }, questionId: 5 },
        { optionLetter: "B", stock: { stockIndex: "NIFTYNEXT50", price: "₹56,226,", priceChange: -0.31 }, questionId: 5 },
        { optionLetter: "C", stock: { stockIndex: "NIFTYBANK", price: "₹ 17,356,", priceChange: 2.12 }, questionId: 5 },
      ],
      answered: false,
      correctAnswer: "A"
    },
  ],
  totalQuestions: 5,
  completedQuestions: 0,
  currentQuestionIndex: 0,
  userAnswers: [],
  isCompleted: false
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {


    checkAnswer(state) {
      const currentQuestion = state.questions[state.currentQuestionIndex];
      const userAnswer = state.userAnswers.find(a => a.questionId === currentQuestion.id);

      if (currentQuestion && userAnswer) {
        currentQuestion.answered = true;
      }
    },

    answerQuestion(state, action: PayloadAction<{ questionId: number; optionLetter: string }>) {
      const { questionId, optionLetter } = action.payload;
      const question = state.questions.find(q => q.id === questionId);

      if (question && !question.answered) {
        const index = state.userAnswers.findIndex(answer => answer.questionId === questionId);

        if (index !== -1) {
          state.userAnswers[index] = { questionId: questionId, optionLetter };
        } else {
          state.userAnswers.push({ questionId: questionId, optionLetter });
        }
      }
    },
    completeQuestion(state) {
      if (!state.questions[state.currentQuestionIndex].answered) return;
      if (state.currentQuestionIndex + 1 >= state.totalQuestions) {
        state.isCompleted = true;
      } else {
        state.currentQuestionIndex += 1;
        state.completedQuestions += 1;
      }
    }
    ,
    resetQuiz() {
      return initialState;
    },
    setTotalQuestions(state, action: PayloadAction<number>) {
      state.totalQuestions = action.payload;
    },

  },
});

export const { completeQuestion, checkAnswer, resetQuiz, setTotalQuestions, answerQuestion } = quizSlice.actions;
export default quizSlice.reducer;