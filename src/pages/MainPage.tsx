import Awards from '@/components/sections/MainPage/Awards';
import ClubIntro from '@/components/sections/MainPage/ClubIntro';
import CompetitionHistory from '@/components/sections/MainPage/CompetitionHistory';
import Event from '@/components/sections/MainPage/Event';
import Hero from '@/components/sections/MainPage/Hero';

const Text = {
        introText: `안녕하세요! 영과일에 오신 것을 환영합니다. 저희 학회는 알고리즘과 프로그래밍에 관심 있는 학생들이 함께 모여
실력을 쌓고 다양한 경험을 나누는 공간입니다. 어려운 문제를 해결하며 얻은 성취감과 동료들과의 협력 속에서
우리는 함께 성장하고 있습니다. 앞으로도 지속적으로 발전하는 학회가 되도록 노력하겠습니다.`,
        purposeText: `영과일은 알고리즘 문제 해결을 통해 학문적 깊이를 더하고 실제 대회에서의 성과를 통해 현장 경험을 축적하는 것을 목표로 설립되었습니다. 
        학회원들은 기초부터 고급 수준까지의 다양한 알고리즘 문제를 풀며 실력을 향상시키고 국내외 대회에서 우수한 성적을 거두는 것을 목표로
하고 있습니다. 학회 활동을 통해 프로그래밍 실력뿐만 아니라 팀워크와 협력의 중요성도 배울 수 있습니다.
`
};

export default function MainPage() {
  return (
    <div className="min-w-full h-full  flex flex-col">
      <div className="flex flex-col h-screen">
        <Hero />
      </div>
      <div className="min-w-full flex flex-col items-center justify-center">
        <Event />
        <ClubIntro introText={Text.introText} purposeText={Text.purposeText} />
        <Awards />
        <CompetitionHistory />
      </div>
    </div>
  );
}