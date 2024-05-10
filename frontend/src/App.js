import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginScreen from "./components/LoginScreen";
import Registerscreen from "./components/RegisterScreen";
import HomeScreen from "./components/HomeScreen";
import UserProfile from "./components/UserProfile";
import AboutUs from "./components/AboutUScreen";
import VoiceToText from "./components/VoiceToText";
import HistoryScreen from "./components/HistoryScreen";
import GrmmerChecker from "./components/GrammerCheck/CheckerDemo";
import { ToastContainer } from "react-toastify";
// Layout component to conditionally render header and footer
function Layout({ children }) {
  const location = useLocation();

  // Define an array of paths where header and footer should be shown
  const showHeaderFooterPaths = [
    "/home",
    "/Voicetotext",
    "/user",
    "/History",
    "/aboutus",
    "/grammercheck",
  ];

  // Check if the current path is included in the array
  const showHeaderFooter = showHeaderFooterPaths.includes(location.pathname);

  // Render header and footer only if the current path matches the conditions
  return (
    <div className="App">
      {showHeaderFooter && <Header />}
      {children}
      {showHeaderFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/register" element={<Registerscreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/Voicetotext" element={<VoiceToText />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/History" element={<HistoryScreen />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/grammercheck" element={<GrmmerChecker />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
