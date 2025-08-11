import Card from '@/components/ui/Card';

export default function ClubIntro() {
    return (
        <div className='w-full flex flex-col items-center justify-center p-4 gap-4'>
            <p className="text-xl font-bold text-center">학회소개</p>
            <Card className="w-[80%] mt-4">
                <p>우리 학회는 알고리즘과 프로그래밍에 관심이 있는 학생들의 모임입니다.</p>
            </Card>
        </div>
    );
}