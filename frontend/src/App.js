import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import LoginScreen from "./components/LoginScreen";
import Registerscreen from "./components/RegisterScreen";
import HomeScreen from "./components/HomeScreen";
import UserProfile from "./components/UserProfile";
import Footer from "./components/Footer";
import VoiceToText from "./components/VoiceToText";
import CheckerDemo from "./components/GrammerCheck/CheckerDemo";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/register" element={<Registerscreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/Voicetotext" element={<VoiceToText />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/grammerCheck" element={<CheckerDemo />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
