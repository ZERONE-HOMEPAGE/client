
import Button from "@/components/ui/Button";
export default function Hero() {
    return (
        <div className="flex flex-row items-center justify-evenly p-4 bg-gray-100 h-full">
            <div>
                <p>한양대학교 ERICA 소프트웨어융합대학</p>
                <h1>알고리즘학회 영과일</h1>
                <Button variant="primary">가입하기</Button>
            </div>
            <div>LOGO</div>
        </div>
    );
}