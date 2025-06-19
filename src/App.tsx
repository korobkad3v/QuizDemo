import  Header  from './components/layout/Header'
import Quiz from './components/quiz/Quiz'

function App() {

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto w-full">
        <Quiz />
      </main>
    </>
  )
}

export default App
