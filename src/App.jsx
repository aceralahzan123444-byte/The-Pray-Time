import { Route , Routes } from "react-router-dom";
import Dashboard from "./Components/Athkar";
import Home from "./Components/Home";
import Quran from "./Components/Quran";
import Tasbeeh from "./Components/Tasbeeh";
import Header from "./Components/Header";
import { useTheme } from "./Context/DarkmodContext";
import AthkarDetailsPage from "./AthkarData/AthkarDetailsPage";
import OfflineDetector from "./Components/OfflineDetector";
import './index.css'
export default function App() {
  const { Darkmod } = useTheme();
  return (
  <>
    <Header /> 
    <OfflineDetector />
    <div className={Darkmod ? "Dark-main-pages-wrapper" : "main-pages-wrapper"}>
      <Routes>
        <Route path="/Athkar" element={<Dashboard />} />
        <Route path="/Athkar/:title" element={<AthkarDetailsPage />} />
        <Route path="/Quran" element={<Quran />} />
        <Route path="/Tasbeeh" element={<Tasbeeh />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  </>
);
}