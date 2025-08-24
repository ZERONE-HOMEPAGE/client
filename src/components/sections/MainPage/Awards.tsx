import PillTab from "@/components/ui/PillTab";
import { useState } from "react";

export default function Awards() {
    const awards = [{
        tabIdx: 0,
        year: 2019,
        type: '장려상',
        number: 1
    }, {
        tabIdx: 0,
        year: 2020,
        type: '동상',
        number: 2
    }, {
        tabIdx: 1,
        year: 2023,
        type: '금상',
        number: 1
    },
    {
        tabIdx: 0,
        year: 2019,
        type: '장려상',
        number: 1
    }, {
        tabIdx: 0,
        year: 2020,
        type: '동상',
        number: 2
    }, {
        tabIdx: 1,
        year: 2023,
        type: '금상',
        number: 1
    },{
        tabIdx: 0,
        year: 2019,
        type: '장려상',
        number: 1
    }, {
        tabIdx: 0,
        year: 2020,
        type: '동상',
        number: 2
    }, {
        tabIdx: 1,
        year: 2023,
        type: '금상',
        number: 1
    }, {
        tabIdx: 1,
        year: 2023,
        type: '금상',
        number: 1
    }];

    const [activeTabIdx, setActiveTabIdx] = useState<number>(0);

    return (
        <div className="w-full h-[120vh] flex flex-col items-center justify-evenly bg-[#EDEEFF]">
            <div>
                <p className="font-bold text-lg">각종 경진대회</p>
                <h1 className="text-2xl font-bold">수상 이력</h1>
            </div>

            <div className="flex flex-col w-[80%] h-1/2 items-center justify-center gap-4">
                <PillTab tabElements={[
                    { label: 'shake!', active: activeTabIdx === 0 },
                    { label: 'HEPC', active: activeTabIdx === 1 },
                ]}  clickHandler={(index) => setActiveTabIdx(index)} activeTabIdx={activeTabIdx}/>


                <div className="w-[80%] bg-[#DCDAEF] h-full rounded-lg grid grid-cols-3 gap-2 p-2 overflow-y-auto">
                    {awards.filter((award) => award.tabIdx === activeTabIdx).map((award, index) => (
                        <div key={index} className="flex flex-row items-center gap-2 p-1 bg-white rounded-lg">
                            <span>{award.year}년</span>
                            <span>{award.type}</span>
                            <span>{award.number}회</span>
                        </div>
                    ))}
                </div>
            </div>
            <p>위와 같은 수상 경험을 통해 알고리즘 문제 해결 능력을 입증하였으며 다양한 문제 유형을 분석하고 해결하는 과정에서 논리적 사고력과 실전 감각을 지속적으로 향상시켜 왔습니다.</p>
        </div>
    );
}