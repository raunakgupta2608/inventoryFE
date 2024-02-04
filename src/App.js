import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import GlobalState from "./context/GlobalState";
import LoginAndRegister from "./components/LoginAndRegister";

function App() {
  return (
    <BrowserRouter>
      <GlobalState>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginAndRegister />} />
        </Routes>
      </GlobalState>
    </BrowserRouter>
  );
}

export default App;
