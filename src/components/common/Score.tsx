// Score.tsx
import ScoreIcon from "../../assets/icons/scoreIcon.svg?react"
export default function Score() {
  return (
    <div className="flex items-center justify-between py-1 px-2 bg-primary rounded-sm min-w-[60px]">
      <ScoreIcon />
      <span className="text-sm font-semibold text-primary-foreground">200</span>
    </div>
  )
}