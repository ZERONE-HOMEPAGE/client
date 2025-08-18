import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import zeroneCharacter from '@/assets/images/zerone_character.jpg';
import clockIcon from '@/assets/images/clock.png';

interface EventBoxProps {
    title: string;
    start: string;
    end: string;
    imgUrl?: string;
}

function EventBox({ title, start, end, imgUrl }: EventBoxProps) {
    return (
        <div className="bg-white pb-4 rounded m-2 h-full w-auto">
            {imgUrl ? <img width="100%" src={imgUrl} alt={title} className="mt-2 rounded h-60 object-cover" /> : <img src={zeroneCharacter} alt="기본 이미지" className="mt-2 h-60 object-cover rounded w-full"/>}
            <div className='pr-4 pl-4'>
                <h2 className="text-lg font-bold mt-2">{title}</h2>
                <div className="flex items-center gap-2 text-gray-600">
                    <img src={clockIcon} alt="" className="w-4 h-4" />
                    <p>{start} ~ {end}</p>
                </div>
            </div>
        </div>
    );
}

export default function Event() {
    const events = [
        {
        title: "알고리즘 대회",
        start: "2023.10.15",
        end: "2023.10.20",
        imgUrl: "data:image/jpeg;base64,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"
        },
        {
        title: "해커톤 대회",
        start: "2023.10.22",
        end: "2023.10.24",
        imgUrl: "data:image/jpeg;base64,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"
        },
        {
        title: "개발자 세미나",
        start: "2023.10.29",
        end: "2023.10.29",
        imgUrl: ""
        },
        {
        title: "네트워킹 파티",
        start: "2023.11.05",
        end: "2023.11.05",
        imgUrl: ""
        }
    ];

    return (
        <div className="w-full flex flex-col items-center justify-center p-4 gap-5 h-full">
            <p className="text-3xl lg:text-4xl font-bold text-center mb-6">이달의 주요 이벤트</p>
            {/* 1번째 줄 */}
            <div className="w-full max-w-7xl mx-auto">
                <Swiper 
                modules={[Navigation, Pagination, Autoplay]} 
                spaceBetween={3} 
                breakpoints= {{
                    0: { slidesPerView: 1 },
                    1024: { slidesPerView: 3 }
                }}
                navigation 
                pagination={{ clickable: true }} 
                autoplay={{ delay: 9000, disableOnInteraction: false }}>
                {events.map((event, index) => (
                    <SwiperSlide key={index}>
                        <EventBox title={event.title} start={event.start} end={event.end} imgUrl={event.imgUrl}/>
                    </SwiperSlide>
                ))}
                </Swiper>
            </div>
            {/* 2번째 줄 */}
            <div className="w-full max-w-7xl mx-auto">
                <Swiper 
                modules={[Navigation, Pagination, Autoplay]} 
                spaceBetween={3} 
                breakpoints= {{
                    0: { slidesPerView: 1 },
                    1024: { slidesPerView: 3 }
                }}
                navigation 
                pagination={{ clickable: true }} 
                autoplay={{ delay: 3000, disableOnInteraction: false }}>
                {events.map((event, index) => (
                    <SwiperSlide key={index}>
                        <EventBox title={event.title} start={event.start} end={event.end} imgUrl={event.imgUrl}/>
                    </SwiperSlide>
                ))}
                </Swiper>
            </div>
        </div>
    );
}