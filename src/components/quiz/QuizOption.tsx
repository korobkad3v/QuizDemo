// QuizOption.tsx
import { Button } from "@/components/common/Button";
import { useDispatch, useSelector } from "react-redux";
import { answerQuestion } from "./quizSlice";
import { cn } from "@/utils/utils";
import type { RootState } from "@/store";
import { Check, X } from "lucide-react";

export interface Stock {
  stockIndex: string;
  price: string;
  priceChange: number;
}

export interface QuizOptionProps {
  questionId: number;
  optionLetter: string;
  stock: Stock;
  selected?: boolean;
  isCorrect?: boolean | null;
}

export default function QuizOption({
  questionId,
  isCorrect = null,
  optionLetter,
  stock,
}: QuizOptionProps) {
  const dispatch = useDispatch();
  const selected = useSelector(
    (state: RootState) =>
      state.quiz.userAnswers.find((answer) => answer.questionId === questionId)
        ?.optionLetter === optionLetter
  );
  const handleAnswer = () => {
    dispatch(answerQuestion({ questionId, optionLetter }));
  };
  return (
    <Button
      className={cn(
        "flex items-center justify-start rounded-lg py-3 gap-4 text-foreground",
        selected &&
          isCorrect === true &&
          "bg-accent-600 text-primary hover:bg-accent-600",
        selected && isCorrect === false && "bg-red text-primary hover:bg-red",
        selected &&
          isCorrect === null &&
          "border-2 border-primary-foreground hover:bg-primary"
      )}
      onClick={handleAnswer}>
      <span
        className={cn(
          "rounded-full bg-background text-primary-foreground font-bold text-base",
          selected && (isCorrect === true || isCorrect === false)
            ? "p-2"
            : "px-3 py-1.5"
        )}>
        {selected ? (
          isCorrect === true ? (
            <Check size={20} />
          ) : isCorrect === false ? (
            <X size={20} />
          ) : (
            optionLetter
          )
        ) : (
          optionLetter
        )}
      </span>
      <div className="inline-block font-medium">
        <span className="text-base font-semibold mr-3">{stock.stockIndex}</span>
        <span className="text-base ">
          {stock.price}{" "}
          <span
            className={cn(
              stock.priceChange > 0 ? "text-green" : "text-red",
              isCorrect && "text-primary"
            )}>
            {stock.priceChange}%
          </span>
        </span>
      </div>
    </Button>
  );
}
