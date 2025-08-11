import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from "@/pages/MainPage";
import StudyPage from "@/pages/StudyPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/study" element={<StudyPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;