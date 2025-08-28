import useScrollTo from '@/hooks/useScrollTo';

export default function ScrollDownBtn() {
    const { scrollDown } = useScrollTo();
    return (
        <div className="absolute bottom-10 left-0 right-0 flex justify-center pointer-events-none">
            <div onClick={scrollDown} className="p-3 hover:cursor-pointer pointer-events-auto animate-bounce flex flex-col items-center gap-2">
                <p className="text-lg text-white hidden md:block">Scroll</p>
                <div className="w-4 h-4 border-r-2 border-b-2 border-gray-100 rotate-45"></div>
            </div>
        </div>
    );
}