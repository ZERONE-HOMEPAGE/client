import Awards from '@/components/sections/MainPage/Awards';
import ClubIntro from '@/components/sections/MainPage/ClubIntro';
import CompetitionHistory from '@/components/sections/MainPage/CompetitionHistory';
import Event from '@/components/sections/MainPage/Event';
import Hero from '@/components/sections/MainPage/Hero';
import Contact from '@/components/sections/MainPage/Contact';

export default function MainPage() {
  return (
    <div className="min-w-full h-full  flex flex-col">
      <div className="flex flex-col h-screen -mt-14">
        <Hero />
      </div>
      <div className="min-w-full flex flex-col items-center justify-center">
        <Event />
        <ClubIntro />
        <Awards />
        <CompetitionHistory />
        <Contact />
      </div>
    </div>
  );
}
