import { useSelector, useDispatch } from "react-redux";
import { completeQuestion, checkAnswer } from "./quizSlice";
import QuizQuestion from "./QuizQuestion";
import type { RootState } from "@/store";
import { Button } from "@/components/common/Button";
import { useState } from "react";
import Header from "../layout/Header";
import QuizCompletion from "./QuizCompletion";
import QuizProgressBar from "./QuizProgressBar";

export default function Quiz() {
  const dispatch = useDispatch();

  const {
    questions,
    currentQuestionIndex,
    totalQuestions,
    userAnswers,
    isCompleted,
  } = useSelector((state: RootState) => state.quiz);

  const currentQuestion = questions[currentQuestionIndex];
  const isAnswered = currentQuestion.answered;
  const isOptionSelected = userAnswers.some(
    (answer) => answer.questionId === currentQuestion.id
  );

  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleContinue = () => {
    if (!isAnswered) {
      dispatch(checkAnswer());
      const userAnswer = userAnswers.find(
        (a) => a.questionId === currentQuestion.id
      );

      if (userAnswer?.optionLetter === currentQuestion.correctAnswer) {
        setIsCorrect(true);
      } else {
        setIsCorrect(false);
      }
    } else {
      dispatch(completeQuestion());
      setIsCorrect(null);
    }
  };

  if (isCompleted) return <QuizCompletion />;

  return (
    <>
      <Header />
      <main className="flex flex-col flex-grow size-full lg:mt-12.5">
        <div className="size-full px-5  flex flex-col justify-between max-w-[510px] mx-auto">
          <QuizQuestion
            key={currentQuestion.id}
            id={currentQuestion.id}
            question={currentQuestion.question}
            options={currentQuestion.options}
            answered={isAnswered}
            isCorrect={isCorrect}
          />
        </div>
        <div className="flex px-5 pb-14.5 items-center justify-center gap-x-52.5 flex-grow w-full lg:bg-primary lg:p-0 lg:py-5">
          <QuizProgressBar className="hidden lg:flex lg:max-w-[240px]" lineClassName="bg-background"/>
          <Button
            onClick={handleContinue}
            disabled={!isOptionSelected}
            variant={"accent"}
            className="w-full uppercase text-base text-semibold text-muted-200 transition-colors duration-400 ease-in-out
            lg:max-w-[240px]">
            {isAnswered && currentQuestionIndex + 1 === totalQuestions
              ? "Finish"
              : isAnswered
              ? "Continue"
              : isOptionSelected
              ? "Check"
              : "Select an option"}
          </Button>
        </div>
      </main>
    </>
  );
}
