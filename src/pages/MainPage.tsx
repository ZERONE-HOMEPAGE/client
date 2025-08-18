import Header from "@/components/layout/Header";
import ClubIntro from "@/components/sections/MainPage/ClubIntro";
import Event from "@/components/sections/MainPage/Event";
import Hero from "@/components/sections/MainPage/Hero";

export default function MainPage() {
    return (
        <div className="flex flex-col min-w-full bg-white min-h-screen">
            <div className="flex flex-col h-[60vh] lg:h-screen">
                <Header />
                <Hero />
            </div>
            <div className="flex flex-col items-center justify-center p-4 h-full lg:h-[130vh] bg-blue-100">
                <Event />
            </div>
            <ClubIntro />
        </div>
    );
}
