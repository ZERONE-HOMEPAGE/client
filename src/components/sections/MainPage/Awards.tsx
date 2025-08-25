import Trophyicon from "@/assets/icon/Trophy.png";
import PillTab from "@/components/ui/PillTab";
import { useState } from "react";

export default function Awards() {
    const awards = [{
        tabIdx: 0, 
        year: 2019, 
        type: [0, 0, 1] 
    }, { 
        tabIdx: 0, 
        year: 2021, 
        type: [1, 0, 1] 
    }, { 
        tabIdx: 0, 
        year: 2022, 
        type: [1, 1, 1] 
    }, { 
        tabIdx: 0,
        year: 2023, 
        type: [0, 1, 0] 
    }, { 
        tabIdx: 0, 
        year: 2024, 
        type: [1, 2, 0] 
    }, {
        tabIdx: 1, 
        year: 2019, 
        type: [0, 0, 2] 
    }, { 
        tabIdx: 1, 
        year: 2021, 
        type: [1, 0, 1] 
    }, { 
        tabIdx: 1, 
        year: 2022, 
        type: [0, 1, 2] 
    }, { 
        tabIdx: 1, 
        year: 2023, 
        type: [1, 0, 0] 
    }, { 
        tabIdx: 1, 
        year: 2024, 
        type: [0, 1, 1] 
    }];

  const [activeTabIdx, setActiveTabIdx] = useState<number>(0);

  const labels = ["최우수상", "우수상", "장려상"];

  return (
    <div className="w-full h-[120vh] flex flex-col items-center justify-evenly bg-[#EDEEFF]">
        <div>
            <p className="font-bold text-2xl mt-16">각종 경진대회</p>
            <h1 className="text-4xl font-bold mt-5">수상 이력</h1>
        </div>

    <div className="flex flex-col w-[80%] h-1/2 items-center justify-center gap-4">
        <PillTab
        tabElements={[
            { label: "shake!", active: activeTabIdx === 0 },
            { label: "HEPC", active: activeTabIdx === 1 },
        ]}
        clickHandler={(index) => setActiveTabIdx(index)}
        activeTabIdx={activeTabIdx}/>

        <div className="w-[80%] bg-[#DCDAEF] h-full rounded-lg grid grid-cols-2 md:grid-cols-3 gap-2 p-2">
            {awards.filter((award) => award.tabIdx === activeTabIdx).map((award, index) => (
            <div key={index} className="flex flex-col justify-between gap-2 p-2 bg-white rounded-lg">
                <span className="font-bold text-left">{award.year}년</span>
                <div className="flex flex-row justify-end gap-3">
                    {award.type.map((count, i) => {
                    if (count === 0) return null;
                    return (
                        <div key={i} className="flex flex-col items-center">
                            <div className="flex gap-1 mb-1">
                            {Array.from({ length: count }).map((_, j) => (
                                <img key={j} src={Trophyicon} alt="트로피 아이콘" className="w-[40px] h-[40px]"/>
                          ))}
                            </div>
                        <span className="font-bold text-sm">{labels[i]} {count}회</span>
                        </div>
                    )})}
                    </div>
                </div>
            ))}
            </div>
        </div>

        <p className="max-w-[51rem] mx-auto leading-relaxed text-lg font-bold text-center mb-12">
        위와 같은 수상 경험을 통해 알고리즘 문제 해결 능력을 입증하였으며 다양한 문제 유형을 분석하고 해결하는 과정에서 논리적 사고력과 실전 감각을 지속적으로 향상시켜 왔습니다.
        </p>
    </div>
  )}