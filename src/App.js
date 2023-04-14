import logo from "./logo.svg";
import "./App.css";
import Messages from "./components/Mesages";
import Other from "./components/Other";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/other" element={<Other />} />
        <Route path="/" element={<Messages />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
