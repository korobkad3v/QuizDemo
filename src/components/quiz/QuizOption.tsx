// QuizOption.tsx
import { Button } from "@/components/common/Button";
import { useDispatch, useSelector } from "react-redux";
import { answerQuestion } from "./quizSlice";
import { cn } from "@/utils/utils";
import type { RootState } from "@/store";

export interface Stock {
  stockIndex: string;
  price: string;
  priceChange: number;
}

export interface QuizOptionProps {
  questionId: number;
  optionLetter: string;
  stock: Stock;
  selected?: boolean
}

export default function QuizOption({ questionId,optionLetter, stock }: QuizOptionProps) {
  
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) =>
  state.quiz.userAnswers.find(
    (answer) => answer.questionId === questionId
  )?.optionLetter === optionLetter
);
  const handleAnswer = () => {
  
    dispatch(answerQuestion({ questionId, optionLetter }));
  };
  return (
    <Button className={cn(
    "flex items-center justify-start rounded-lg py-3 gap-4 text-foreground",
    selected ? "bg-accent-600 text-primary hover:bg-accent-600" : "bg-primary"
  )} 
    onClick={handleAnswer}>
      <span className="rounded-full bg-background text-primary-foreground font-bold px-3 py-1.5 text-base">
        {optionLetter}
        </span>
        <div className="inline-block font-medium">
          <span className="text-base font-semibold mr-3">{stock.stockIndex}</span>
          <span className="text-base ">{stock.price} <span className={cn( stock.priceChange > 0 ? "text-green" : "text-red",  selected && "text-primary")}>{stock.priceChange}%</span></span>
          
        </div>
      
    </Button>
  );
}