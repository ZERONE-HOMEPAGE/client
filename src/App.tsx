import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Layout from '@/components/layout/Layout';
import MainPage from '@/pages/MainPage';
import StudyPage from '@/pages/StudyPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/study" element={<StudyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
