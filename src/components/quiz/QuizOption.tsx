// QuizOption.tsx
import { Button } from "@/components/common/Button";
import { useDispatch } from "react-redux";
import { answerQuestion } from "./quizSlice";
import { cn } from "@/utils/utils";

export interface Stock {
  stockIndex: string;
  price: string;
  priceChange: number;
}

export interface QuizOptionProps {
  questionId: number;
  optionLetter: string;
  stock: Stock;
}

export default function QuizOption({ optionLetter, stock }: QuizOptionProps) {
  const dispatch = useDispatch();
  const handleAnswer = () => {
    console.log("ckick")
    dispatch(answerQuestion({ questionId: 1, optionLetter: optionLetter }));
  }

  console.log(stock);
  return (
    <Button className="flex items-center justify-start bg-primary rounded-lg py-3 gap-4 text-foreground" 
    onClick={handleAnswer}>
      <span className="rounded-full bg-background font-bold px-3 py-1.5 text-base">
        {optionLetter}
        </span>
        <div className="inline-block font-medium">
          <span className="text-base font-semibold mr-3">{stock.stockIndex}</span>
          <span className="text-base ">{stock.price} <span className={cn( stock.priceChange > 0 ? "text-green" : "text-red" )}>{stock.priceChange}%</span></span>
          
        </div>
      
    </Button>
  );
}