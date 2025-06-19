import { useSelector, useDispatch } from "react-redux";
import { completeQuestion, checkAnswer } from "./quizSlice"; 
import QuizQuestion from "./QuizQuestion";
import type { RootState } from "@/store";
import { Button } from "@/components/common/Button";
import { useEffect, useState } from "react";

export default function Quiz() {
  const dispatch = useDispatch();

  const {
    questions,
    currentQuestionIndex,
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

  if (isCompleted) return <div>Quiz finished!</div>;

  return (
    <div className="size-full px-5 pb-14.5 flex flex-col justify-between">
      <QuizQuestion
        key={currentQuestion.id}
        id={currentQuestion.id}
        question={currentQuestion.question}
        options={currentQuestion.options}
        answered={isAnswered}
        isCorrect={isCorrect}
      />
      <div className="flex">
        <Button
          onClick={handleContinue}
          disabled={!isOptionSelected}
          variant={"accent"}
          className="w-full uppercase text-base text-semibold text-muted-200 transition-colors duration-400 ease-in-out"
        >
          {isAnswered ? "Continue" : isOptionSelected ? "Check" : "Select an option"}
        </Button>
      </div>
    </div>
  );
}
