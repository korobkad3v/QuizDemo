// QuizProgressBar.tsx
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { cn } from '@/utils/utils';

export default function QuizProgressBar({className, lineClassName}: {className?: string, lineClassName?: string}) {
  const { completedQuestions, totalQuestions } = useSelector(
    (state: RootState) => state.quiz
  );
  const completedQuestionsPlusOne = completedQuestions + 1;
  
  const progressPercent = (completedQuestionsPlusOne / totalQuestions) * 100;

  return (
    <div className={cn("w-full flex items-center gap-3 py-1", className)}>
      <div className={cn("w-full h-3 bg-primary rounded-full", lineClassName)}>
        <div className="w-1/2 h-full bg-accent-400 rounded-full transition-discrete duration-500" style={{ width: `${progressPercent}%` }}/>
      </div>
      <span className="text-sm text-muted-400 font-semibold">{completedQuestionsPlusOne}/{totalQuestions}</span>
    </div>
  );
}
