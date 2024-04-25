import "./App.css";
import { Nav, CalcSection, Privacy, HowToUse, Header } from "./sections";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <main className=" flex-col justify-center items-center">
      <div className="flex justify-center">
        <Nav />
        <Routes>
          <Route path="/" element={<CalcSection />}></Route>
          <Route path="/how-to-use" element={<HowToUse />}></Route>
          <Route path="/privacy" element={<Privacy />}></Route>
        </Routes>
      </div>
      <div className="flex justify-center">
        <Header />
      </div>
    </main>
  );
}

export default App;
