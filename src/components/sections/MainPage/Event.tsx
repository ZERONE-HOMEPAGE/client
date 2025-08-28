import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import zeroneCharacter from '@/assets/images/zerone_character.jpg';
import clockIcon from '@/assets/icon/clock.png';

interface EventBoxProps {
    title: string;
    start: string;
    end: string;
    imgUrl?: string;
    className?: string;
}

function EventBox({ title, start, end, imgUrl, className}: EventBoxProps) {
    return (
        <div className={`bg-white pb-4 rounded h-full shadow-md ${className}`}>
            {imgUrl ? <img width="100%" src={imgUrl} alt={title} className="h-56 object-cover rounded w-full" /> : <img src={zeroneCharacter} alt="기본 이미지" className="h-56 object-cover rounded w-full"/>}
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
        
        },
        {
        title: "해커톤 대회",
        start: "2023.10.22",
        end: "2023.10.24",
        imgUrl: ""
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
        },
        {
        title: "여름방학 백준 빙고",
        start: "2023.11.05",
        end: "2023.11.05",
        imgUrl: ""
        },
        {
        title: "백준 마라톤",
        start: "2023.11.05",
        end: "2023.11.05",
        imgUrl: ""
        }
    ];
    
    return (
        <div id='event' className='w-full flex flex-col items-center justify-center gap-5 h-full pb-20'>
            <p className="text-3xl font-bold text-center mb-6 mt-10">이달의 주요 이벤트</p>

            <div className="block md:hidden w-full px-4"> {/* 모바일 화면 */}
                <div className="w-full flex flex-col gap-8">

                    <Swiper modules={[Navigation, Pagination, Autoplay]} 
                            spaceBetween={12} 
                            slidesPerView={1}
                            navigation 
                            autoplay={{ delay: 9000, disableOnInteraction: false }}
                            className='w-full'>
                        {events.map((event, index) => (
                        <SwiperSlide key={index}>
                            <EventBox title={event.title} start={event.start} end={event.end} imgUrl={event.imgUrl}/>
                        </SwiperSlide>
                        ))}
                    </Swiper>
                    
                </div>
            </div>

            <div className="hidden md:block w-full px-4"> {/* 컴퓨터 화면 */}
                <div className="grid grid-cols-3 gap-4 max-w-5xl mx-auto">
                    {events.map((event, index) =>
                    <EventBox key={index} title={event.title} start={event.start} end={event.end} imgUrl={event.imgUrl} className='h-full w-full'/>
                    )}
                </div>
            </div>
        </div>
    );
}