import "./App.css";
import { Nav, CalcSection, CalcMethod, HowToUse } from "./sections";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <main className="min-h-screen flex justify-center">
      <Nav />
      <Routes>
        <Route path="/" element={<CalcSection />}></Route>
        <Route path="/calc-method" element={<CalcMethod />}></Route>
        <Route path="/update-log" element={<></>}></Route>
        <Route path="/privacy" element={<></>}></Route>
        <Route path="/how-to-use" element={<HowToUse />}></Route>
      </Routes>
    </main>
  );
}

export default App;
