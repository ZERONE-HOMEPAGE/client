import Card from '@/components/ui/Card';
import Background from '@/assets/images/clubintro_bg.jpg';
import bookIcon from '@/assets/icon/book.png';
import awardIcon from '@/assets/icon/award.png';
import giftIcon from '@/assets/icon/gift.png';

interface ClubIntro_t {
    introText : string;
    purposeText : string;
}

export default function ClubIntro({ introText, purposeText } : ClubIntro_t) {
    return (
        <div className="relative w-full h-auto">
            <img src={Background} className="w-full h-full object-cover brightness-75" />
            <div className="absolute inset-0 flex flex-col items-center justify-start pt-[6vh]">
                <p className="text-4xl font-bold text-center text-white mt-[10vh] mb-10">학회소개</p>
                <p className='max-w-4xl mx-auto leading-relaxed whitespace-pre-line text-xl font-semibold text-center text-violet-300'>{introText}</p>

                <div className="flex flex-col border border-white rounded-xl mt-10 
                                bg-gray-600/40 backdrop-blur-[21px] 
                                shadow-[0_4px_22px_-2px_rgba(0,0,0,1),inset_0_0_200px_15px_rgba(230,230,230,0.35)] ">
                    <p className='text-3xl font-bold text-white mt-10 ml-10'>설립 목적</p>
                    <p className='max-w-6xl m-9 leading-relaxed whitespace-pre-line text-xl font-semibold text-gray-200'>{purposeText}</p>
                </div>

                <div className="max-w-6xl flex flex-col border border-white rounded-xl mt-10 
                                bg-gray-600/40 backdrop-blur-[21px] 
                                shadow-[0_4px_22px_-2px_rgba(0,0,0,1),inset_0_0_200px_15px_rgba(230,230,230,0.35)] ">
                    <p className='text-3xl font-bold text-white mt-10 ml-10'>주요 활동</p>

                    <div className='flex justify-center mt-5 px-10 gap-6 mb-14'>
                        <div className='flex-col border border-white rounded-xl'>
                            <img src={bookIcon} alt="" className="w-30 h-30 m-8"/>
                            <p className='text-white text-2xl ml-10 -mt-2'>정기적인 알고리즘 스터디</p>
                            <p className='text-gray-300 text-base ml-10 mb-8 pr-5'>매주 알고리즘 문제를 풀며 실력을 쌓고 서로 피드백을 주고받는 스터디</p>
                        </div>
                        <div className='border border-white rounded-xl'>
                            <img src={awardIcon} alt="" className="w-30 h-30 m-8"/>
                            <p className='text-white text-2xl ml-10 -mt-2'>프로그래밍 대회 참가 및 개최</p>
                            <p className='text-gray-300 text-base ml-10 mb-8 pr-5'>다양한 대학 및 기업 코딩 대회에 참가하여 실력을 검증하고 경험을 쌓는 기회를 제공</p>
                        </div>
                        <div className='border border-white rounded-xl'>
                            <img src={giftIcon} alt="" className="w-30 h-30 m-8"/>
                            <p className='text-white text-2xl ml-10 -mt-2'>코딩 캠프 및 이벤트</p>
                            <p className='text-gray-300 text-base ml-10 mb-8 pr-5'>알고리즘 대회 참가 및 실력 향상을 위한 집중적인 코딩 캠프 및 각종 이벤트를 개최</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}