// Header.tsx
import Score from "../common/Score"
import { X } from "lucide-react";
import { Button } from "@/components/common/Button";
import QuizProgressBar from "@/components/quiz/QuizProgressBar";
import { useDispatch } from "react-redux";
import { resetQuiz } from "@/components/quiz/quizSlice";

export default function Header() {
  const dispatch = useDispatch();
  const handleReset = () => {
    dispatch(resetQuiz());
  };
  return (
    <header className="flex flex-col items-center justify-between py-10 px-5 lg:px-15">
      <div className="flex items-center justify-between w-full">
        <Score />
        <h1 className="text-lg font-semibold tracking-normal text-center">
          Fantasy Quiz #156
        </h1>
        <Button className="rounded-full cursor-pointer p-1.5" variant="default" size="icon"
        aria-label="Close" onClick={handleReset}>
          <X size={24} />
        </Button>
      </div>
      <div className="w-full mt-6 lg:hidden">
        <QuizProgressBar/>
      </div>
      
      
    </header>
  )
}
