import background from '@/assets/images/clubintro_bg.jpg';
import bookIcon from '@/assets/icon/book.png';
import awardIcon from '@/assets/icon/award.png';
import giftIcon from '@/assets/icon/gift.png';

interface ClubIntro_t {
    introText : string;
    purposeText : string;
}

export default function ClubIntro({ introText, purposeText } : ClubIntro_t) {
    return (
        <Background image={background}>
            <div className="px-4 md:px-8 lg:px-16 w-full">
                <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white mt-[10vh] mb-6 md:mb-10">학회소개</p>
                <p className='max-w-4xl mx-auto leading-relaxed whitespace-pre-line text-lg md:text-xl font-semibold text-center text-violet-300 mb-8 md:mb-12'>{introText}</p>

                <ShadowBox>
                    <div className='p-6 md:p-8 lg:p-10'>
                        <p className='text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6'>설립 목적</p>
                        <p className='leading-relaxed whitespace-pre-line text-lg md:text-xl font-semibold text-gray-200'>{purposeText}</p>
                    </div>
                </ShadowBox>

                <ShadowBox>
                    <div className='p-6 md:p-8 lg:p-10'>
                        <p className='text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8'>주요 활동</p>

                        <div className='flex flex-col lg:flex-row justify-center items-stretch gap-4 md:gap-6'>
                            <div className='flex flex-col border border-white rounded-xl flex-1 max-w-sm mx-auto lg:mx-0'>
                                <div className='p-6 md:p-8 text-center flex flex-col h-full'>
                                    <img src={bookIcon} alt="책 아이콘" className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] mx-auto mb-4"/>
                                    <p className='text-white text-lg md:text-xl lg:text-2xl font-semibold mb-3'>정기적인 알고리즘 스터디</p>
                                    <p className='text-gray-300 text-sm md:text-base flex-grow'>매주 알고리즘 문제를 풀며 실력을 쌓고 서로 피드백을 주고받는 스터디</p>
                                </div>
                            </div>
                            <div className='flex flex-col border border-white rounded-xl flex-1 max-w-sm mx-auto lg:mx-0'>
                                <div className='p-6 md:p-8 text-center flex flex-col h-full'>
                                    <img src={awardIcon} alt="트로피 아이콘" className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] mx-auto mb-4"/>
                                    <p className='text-white text-lg md:text-xl lg:text-2xl font-semibold mb-3'>프로그래밍 대회 참가 및 개최</p>
                                    <p className='text-gray-300 text-sm md:text-base flex-grow'>다양한 대학 및 기업 코딩 대회에 참가하여 실력을 검증하고 경험을 쌓는 기회를 제공</p>
                                </div>
                            </div>
                            <div className='flex flex-col border border-white rounded-xl flex-1 max-w-sm mx-auto lg:mx-0'>
                                <div className='p-6 md:p-8 text-center flex flex-col h-full'>
                                    <img src={giftIcon} alt="선물 아이콘" className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] mx-auto mb-4"/>
                                    <p className='text-white text-lg md:text-xl lg:text-2xl font-semibold mb-3'>코딩 캠프 및 이벤트</p>
                                    <p className='text-gray-300 text-sm md:text-base flex-grow'>알고리즘 대회 참가 및 실력 향상을 위한 집중적인 코딩 캠프 및 각종 이벤트를 개최</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ShadowBox>
            </div>
        </Background>
    );
}

function Background({ children, image }: { children: React.ReactNode; image?: string }) {
    return (
        <div className="relative w-full min-h-[60vh] bg-cover bg-center brightness-75"
            style={{ backgroundImage: `url(${image})` }}>
            <div className="inset-0 flex flex-col items-center justify-start pt-6 pb-32">
                {children}
            </div>
        </div>
    );
}

function ShadowBox({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`flex flex-col border border-white rounded-xl mt-10 bg-gray-600/40 backdrop-blur-[21px] shadow-[0_4px_22px_-2px_rgba(0,0,0,1),inset_0_0_200px_15px_rgba(230,230,230,0.35)] ${className}`}>
            {children}
        </div>
    );
}