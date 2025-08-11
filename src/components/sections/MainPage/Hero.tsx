
import Button from "@/components/ui/Button";

const PIXEL_COLS = 60;
const PIXEL_ROWS = 30;
const pixelArray = new Array(PIXEL_COLS * PIXEL_ROWS).fill(0);




export default function Hero() {
    

    return (
        <div className="relative flex flex-row items-center justify-start p-4 bg-gray-100 h-full overflow-hidden">
            <div className="absolute inset-0 z-0">
                {
                    pixelArray.map((_, index) => (
                        <div 
                            key={index} 
                            className="absolute bg-gray-300 border border-gray-400"
                            style={{
                                width: `${100/PIXEL_COLS}vw`,
                                height: `${100/PIXEL_ROWS}vh`,
                                left: `${(index % PIXEL_COLS) * (100/PIXEL_COLS)}vw`,
                                top: `${Math.floor(index / PIXEL_COLS) * (100/PIXEL_ROWS)}vh`
                            }}
                        />
                    ))
                }
            </div>
            <div className="relative flex flex-col ml-[20%] items-start gap-4 z-10">
                <p className="text-2xl text-gray-600 font-medium">한양대학교 ERICA 소프트웨어융합대학</p>
                <h1 className="text-4xl text-black font-bold">알고리즘학회 영과일</h1>
                <Button variant="primary">가입하기</Button>
            </div>
        </div>
    );
}