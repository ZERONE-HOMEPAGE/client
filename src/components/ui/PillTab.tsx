export default function PillTab({tabElements, clickHandler, activeTabIdx}: { tabElements: { label: string, active: boolean }[], clickHandler: (index: number) => void, activeTabIdx: number }) {
    return (
        <div className="flex justify-evenly p-1 bg-[#DCDAEF] rounded-3xl gap-2">
            {tabElements.map((element, index) => (
                <div onClick={() => clickHandler(index)} key={index} className={`p-2 px-4 rounded-3xl hover:cursor-pointer ${activeTabIdx === index ? 'bg-white' : ''}`}>
                    {element.label}
                </div>
            ))}
        </div>
    );
}