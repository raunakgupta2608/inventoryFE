import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import GlobalState from "./context/GlobalState";
import AddNewUser from "./components/AddNewUser";

function App() {
  return (
    <BrowserRouter>
      <GlobalState>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addUser" element={<AddNewUser />} />
        </Routes>
      </GlobalState>
    </BrowserRouter>
  );
}

export default App;
