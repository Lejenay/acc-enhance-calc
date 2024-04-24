import "./App.css";
import { Nav, CalcSection, Privacy, HowToUse } from "./sections";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <main className="min-h-screen flex justify-center">
      <Nav />
      <Routes>
        <Route path="/" element={<CalcSection />}></Route>
        <Route path="/how-to-use" element={<HowToUse />}></Route>
        <Route path="/privacy" element={<Privacy />}></Route>
      </Routes>
    </main>
  );
}

export default App;
