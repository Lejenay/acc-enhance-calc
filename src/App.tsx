import "./App.css";
import { Nav, CalcSection, HowToUse, Header } from "./sections";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <main className=" flex-col justify-center items-center h-full">
      <div className="flex justify-center">
        <Nav />
        <Routes>
          <Route path="/" element={<CalcSection />}></Route>
          <Route path="/how-to-use" element={<HowToUse />}></Route>
        </Routes>
      </div>
      <div className="flex justify-center">
        <Header />
      </div>
    </main>
  );
}

export default App;
