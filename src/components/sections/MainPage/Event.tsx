import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

interface EventBoxProps {
    title: string;
    description: string;
    imgUrl?: string;
}

function EventBox({ title, description, imgUrl }: EventBoxProps) {
    return (
        <div className="bg-white p-4 rounded shadow-md m-2 h-75 w-full">
            {imgUrl ? <img width="100%" src={imgUrl} alt={title} className="mt-2 rounded h-48 object-cover" /> : <div className="mt-2 h-48 bg-gray-200 rounded"/>}
            <h2 className="text-lg font-bold mt-2">{title}</h2>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}

export default function Event() {
    const events = [
        {
        title: "알고리즘 대회",
        description: "다음 주에 열리는 알고리즘 대회에 참여하세요!",
        imgUrl: "https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Algorithm+Contest"
        },
        {
        title: "해커톤 대회",
        description: "36시간 동안 진행되는 해커톤에 도전해보세요!",
        imgUrl: "https://via.placeholder.com/300x200/10B981/FFFFFF?text=Hackathon"
        },
        {
        title: "개발자 세미나",
        description: "최신 개발 트렌드를 배워보는 세미나입니다.",
        imgUrl: "https://via.placeholder.com/300x200/F59E0B/FFFFFF?text=Dev+Seminar"
        },
        {
        title: "네트워킹 파티",
        description: "개발자들과 네트워킹할 수 있는 파티입니다.",
        }
    ];

    return (
        <div className="w-full flex flex-col items-center justify-center p-4 gap-10">
            <p className="text-xl font-bold text-center">이달의 주요 이벤트</p>
            <div className="w-full max-w-6xl">
                <Swiper modules={[Navigation, Pagination, Autoplay]} spaceBetween={20} slidesPerView={3} navigation pagination={{ clickable: true }} autoplay={{ delay: 3000, disableOnInteraction: false }}>
                {events.map((event, index) => (
                    <SwiperSlide key={index}>
                    <EventBox title={event.title} description={event.description} imgUrl={event.imgUrl}/>
                    </SwiperSlide>
                ))}
                </Swiper>
            </div>
        </div>
    );
}