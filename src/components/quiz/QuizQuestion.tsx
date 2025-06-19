// QuizQuestion.tsx
import type { QuizOptionProps } from "./QuizOption";
import QuizOption from "./QuizOption";

export interface QuizQuestionProps {
  id: number;
  question: string;
  options: QuizOptionProps[];
  isCorrect?: boolean | null;
  answered?: boolean;
}

export default function QuizQuestion(
  { question = "Qs",
    options,
    isCorrect
  }: QuizQuestionProps
) {
  return (
    <div className="flex flex-col gap-16">
      <h2 className="text-[22px] text-left font-semibold text-primary-foreground">{question}</h2>
      <div className="flex flex-col gap-4">
        {options.map((option, index) => (
          <QuizOption key={index} questionId={option.questionId} isCorrect={isCorrect} optionLetter={option.optionLetter} stock={option.stock} />
        ))}
      </div>
    </div>
  )
}