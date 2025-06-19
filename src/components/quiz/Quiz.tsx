// Quiz.tsx

import { useSelector, useDispatch } from "react-redux";
import { completeQuestion } from "./quizSlice";
import QuizQuestion from "./QuizQuestion";
import type { RootState } from "@/store";
import { Button } from "@/components/common/Button";

export default function Quiz() {
  const { questions, currentQuestionIndex } = useSelector(
    (state: RootState) => state.quiz
  );

  const currentQuestion = questions[currentQuestionIndex];
  const dispatch = useDispatch();
  const userAnswers = useSelector((state: RootState) => state.quiz.userAnswers);

  const isAnswered = userAnswers.some(
    (answer) => answer.questionId === currentQuestion.id
  );
  const isCompleted = useSelector((state: RootState) => state.quiz.isCompleted);

  const handleContinue = () => {
    console.log("user answers", userAnswers);
    dispatch(completeQuestion());
  };

  if (isCompleted) return <div>Quiz finished!</div>;
  return (
    <div
      className="size-full px-5 pb-14.5 flex flex-col 
    justify-between
    ">
      <QuizQuestion
        key={currentQuestion.id}
        id={currentQuestion.id}
        question={currentQuestion.question}
        options={currentQuestion.options}
      />
      <div className="flex">
        <Button
          onClick={handleContinue}
          disabled={!isAnswered}
          variant={"accent"}
          className=" w-full text-base text-semibold text-muted-200 transition-colors duration-400 ease-in-out">
          CONTINUE
        </Button>
      </div>
    </div>
  );
}
