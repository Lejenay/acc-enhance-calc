import "./App.css"
import { Nav, CalcSection } from "./sections"

function App() {
  return (
    <main className="flex flex-1">
      <Nav />
      <section className="w-ful">
        <CalcSection />
      </section>
    </main>
  )
}

export default App
