// Header.tsx
import Score from "../common/Score"

export default function Header() {
  return (
    <header className="flex flex-col items-center justify-between pt-10 px-5">
      <div className="flex items-center justify-between w-full">
        <Score />
        <h1 className="text-lg font-semibold tracking-normal text-center">
          Fantasy Quiz #156
        </h1>
      </div>
    </header>
  )
}
