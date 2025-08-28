export default function PillTab({tabElements, clickHandler, activeTabIdx, textclass}: { tabElements: { label: string, active: boolean }[], clickHandler: (index: number) => void, activeTabIdx: number, textclass?: string }) {
    return (
        <div className="relative flex justify-evenly p-1 bg-[#E0D7F1] rounded-3xl gap-2">
            {tabElements.map((element, index) => (
                <button key={index} onClick={() => clickHandler(index)} className="relative z-10 py-2 w-32 text-center">
                    <p className={`${textclass}`}>{element.label}</p>
                </button>
            ))}
            <div className="absolute p-2 px-4 bg-white w-32 rounded-3xl h-[calc(100%-0.5rem)] transition-all ease-in-out duration-300"
                 style={{ left: `calc(${activeTabIdx} * (100% / ${tabElements.length}) + 0.3rem)` }}>
            </div>
        </div>
    );
}