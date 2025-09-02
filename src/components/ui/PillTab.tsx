export default function PillTab({tabElements, clickHandler, activeTabIdx, textclass}: { tabElements: { label: string, active: boolean }[], clickHandler: (index: number) => void, activeTabIdx: number, textclass?: string }) {
    return (
        <>
            {/* Desktop - PillTab */}
            <div className="hidden md:flex relative justify-evenly p-1 bg-[#E0D7F1] rounded-3xl gap-2">
                {tabElements.map((element, index) => (
                    <button key={index} onClick={() => clickHandler(index)} className="relative z-10 py-2 w-32 text-center">
                        <p className={`${textclass}`}>{element.label}</p>
                    </button>
                ))}
                <div className="absolute p-2 px-4 bg-white w-32 rounded-3xl h-[calc(100%-0.5rem)] transition-all ease-in-out duration-300"
                     style={{ left: `calc(${activeTabIdx} * (100% / ${tabElements.length}) + 0.3rem)` }}>
                </div>
            </div>

            {/* Mobile - Dropdown */}
            <div className="md:hidden relative">
                <select 
                    value={activeTabIdx}
                    onChange={(e) => clickHandler(parseInt(e.target.value))}
                    className="w-full p-3 bg-white rounded-2xl appearance-none pr-8 border-2 border-[#E0D7F1]"
                >
                    {tabElements.map((element, index) => (
                        <option className="text-xs"  key={index} value={index}>
                            {element.label}
                        </option>
                    ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </>
    );
}