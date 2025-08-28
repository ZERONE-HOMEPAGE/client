import { useEffect } from "react";

export default function CompilerPage() {
    useEffect(() => {
        // 새 탭에서 컴파일러 열고 이전 페이지로 돌아가기
        window.open('https://zerone01.kr/compiler', '_blank');
        window.history.back();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">컴파일러로 이동 중...</h1>
            <p className="text-gray-600">새 탭에서 컴파일러가 열립니다.</p>
        </div>
    );
}