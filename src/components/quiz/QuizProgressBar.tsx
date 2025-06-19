// QuizProgressBar.tsx
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

export default function QuizProgressBar() {
  const { completedQuestions, totalQuestions } = useSelector(
    (state: RootState) => state.quiz
  );
  const progressPercent = (completedQuestions / totalQuestions) * 100;

  return (
    <div className="w-full flex items-center gap-3 py-1">
      <div className="w-full h-3 bg-primary rounded-full">
        <div className="w-1/2 h-full bg-accent-400 rounded-full" style={{ width: `${progressPercent}%` }}/>
      </div>
      <span className="text-sm text-muted-400 font-semibold">{completedQuestions}/{totalQuestions}</span>
    </div>
  );
}
