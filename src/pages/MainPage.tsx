import ClubIntro from '@/components/sections/MainPage/ClubIntro';
import Event from '@/components/sections/MainPage/Event';
import Hero from '@/components/sections/MainPage/Hero';

export default function MainPage() {
  return (
    <div className="min-w-full h-full  flex flex-col">
      <div className="flex flex-col h-screen">
        <Hero />
      </div>
      <div className="min-w-full flex flex-col items-center justify-center p-4 gap-10">
        <Event />
        <ClubIntro />
      </div>
    </div>
  );
}
