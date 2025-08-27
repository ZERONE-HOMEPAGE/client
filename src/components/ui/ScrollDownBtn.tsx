import useScrollTo from '@/hooks/useScrollTo';

export default function ScrollDownBtn() {
    const { scrollDown } = useScrollTo();
    return (
        <div className="flex flex-col items-center">
            <div onClick={scrollDown} className="p-3 hover:cursor-pointer animate-bounce absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
                <p className="text-lg text-white">Scroll</p>
                <div className="w-4 h-4 border-r-2 border-b-2 border-gray-100 rotate-45"></div>
            </div>
        </div>
    );
}