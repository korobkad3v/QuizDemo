// Quiz.tsx

import { useSelector } from "react-redux";
import QuizQuestion from "./QuizQuestion";
import type { RootState } from "@/store";
import { Button } from "@/components/common/Button";

export default function Quiz() {
  const { questions, currentQuestionId } = useSelector(
    (state: RootState) => state.quiz
  );
  const currentQuestion = questions[currentQuestionId];

  if (!currentQuestion) return <div>Quiz finished!</div>;

  return (
    <div className="size-full px-5 pb-14.5 flex flex-col 
    justify-between
    ">
      <QuizQuestion
        key={currentQuestion.id}
        id={currentQuestion.id}
        question={currentQuestion.question}
        options={currentQuestion.options}
      />
      <div className="flex">
        <Button variant={"disabled"} className=" w-full text-base text-semibold text-muted-200">CONTINUE</Button>
      </div>
    </div>
  );
}
