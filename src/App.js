import "./App.css";
import Messages from "./components/Mesages";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Messages />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
