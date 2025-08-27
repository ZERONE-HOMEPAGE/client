import Card from "@/components/ui/Card";
import competetionImg from "@/assets/images/competition.jpg";

export default function CompetitionHistory() {
    return (
        <div className="w-full min-h-[100vh] flex flex-col items-center justify-center p-4">
            <p className="font-bold text-lg">자체 경진대회</p>
            <h1 className="text-2xl font-bold mb-4">개최 이력</h1>

            <Card animation="fade-right" className="relative w-[95%] md:w-[60%] h-48 text-white mb-4 flex flex-row items-end justify-evenly p-0 overflow-hidden">
                <img 
                    src={competetionImg} 
                    alt="배경" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60" 
                />
                <div className="absolute inset-0 bg-[rgba(10,25,59,0.58)]" />
                <div className="relative flex flex-col items-end justify-end h-full">
                    <h1 className="text-4xl -mb-3 md:text-7xl font-bold md:-mb-5 leading-none translate-y-2">
                        HEPC
                    </h1>
                </div>
                <ul className="relative p-4 list-disc list-inside">
                    <li>개최 시기: 매년 5월 초</li>
                    <li>참가 규모: 80~100명</li>
                    <li>대회 성격: 알고리즘 대회</li>
                    <li>특징: 신입생/재학생 부문별 대회 참가 가능</li>
                </ul>
            </Card>

            <Card animation="fade-left" className="relative w-[95%] md:w-[60%] h-48 text-white mb-8 flex flex-row items-end justify-evenly p-0 overflow-hidden">
                <img 
                    src={competetionImg}
                    alt="배경" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60" 
                />
                <div className="absolute inset-0 bg-[rgba(10,25,59,0.58)]" />
                <ul className="relative p-4 list-disc list-inside">
                    <li>개최 시기: 매년 11월 초</li>
                    <li>참가 규모: 20~30명</li>
                    <li>대회 성격: 알고리즘 대회</li>
                    <li>특징 : 경인지역 연합 프로그래밍 대회의 선발전</li>
                </ul>
                <div className="relative flex flex-col items-end justify-end h-full">
                    <h1 className="text-4xl -mb-3 md:text-7xl font-bold md:-mb-5 leading-none translate-y-2">
                        ZOAC
                    </h1>
                </div>
            </Card>

            <p className="w-[80%] text-center">
                학회에서는 알고리즘 및 프로그래밍 실력을 향상시키고 우수 인재를 발굴하기 위한 다양한 경진대회를 주최하고 있습니다. 이러한 경진대회는 참가자들에게 실력을 검증할 기회를 제공할 뿐만 아니라 학회 차원에서 프로그래밍 학습 문화와 경쟁력을 강화하는 데 기여하고 있습니다. 이를 통해 실전 경험을 쌓고 보다 심화된 문제 해결 능력을 배양할 수 있는 환경이 조성되고 있습니다.
            </p>
        </div>
    );
}
