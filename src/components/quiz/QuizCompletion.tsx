// QuizCompletion.tsx
import CongratSvg from "@/assets/congrat.svg?react";
import MarkIcon from "@/assets/icons/mark.svg?react";
import MoneyIcon from "@/assets/icons/money.svg?react";
import { useRef, useEffect, useState } from "react";
import { Button } from "../common/Button";
import { useDispatch } from "react-redux";
import { resetQuiz } from "./quizSlice";
import { CloseButton } from "../common/closeButton";
import { cn } from "@/utils/utils";
export default function QuizCompletion() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true);
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  const dispatch = useDispatch();
  const handleReset = () => {
    dispatch(resetQuiz());
  };

  return (
    <>
      <main className="size-full flex flex-col items-center justify-around px-5 max-w-xl mx-auto">
        <div className="flex w-full flex-col justify-between;">
          <div className="flex flex-col justify-center items-center mb-14.5 ">
            <CongratSvg ref={svgRef} className={cn(isActive && "active", "transform translate-x-[6%]")} />
            <h1 className="mt-10 text-[22px] text-primary-foreground font-semibold tracking-normal text-center">
              Thank you for completing!
            </h1>
            <CloseButton className="absolute top-10 right-5 lg:right-15" onClick={handleReset} />
          </div>
          <ul className="flex flex-col rounded-lg bg-primary px-0.5 w-full [&>*]:border-b-1 [&>*]:border-background [&>*:last-child]:border-none">
            <li className="flex justify-between items-center py-4.5 px-3.5 ">
              <div className="inline-flex items-center gap-4 uppercase text-base font-medium">
                <MoneyIcon className="size-9" />
                score gained
              </div>
              <span className="font-semibold">120</span>
            </li>
            <li className="flex justify-between items-center py-4.5 px-3.5">
              <div className="inline-flex items-center  gap-4 uppercase text-base font-medium">
                <MarkIcon className="size-9" />
                correct predictions
              </div>
              <span className="font-semibold">4</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col-reverse w-full ">
          <Button
            onClick={handleReset}
            variant={"accent"}
            className="w-full uppercase text-base text-semibold text-muted-200 transition-colors duration-400 ease-in-out">
            okay
          </Button>
        </div>
      </main>
    </>
  );
}
