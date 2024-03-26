import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginScreen from "./components/LoginScreen";
import Registerscreen from "./components/RegisterScreen";
import HomePage from "./components/HomeScreen";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/register" element={<Registerscreen />} />
          <Route path="/homepage" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
