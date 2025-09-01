import PillTab from "@/components/ui/PillTab";
import { useState } from "react";
import CheckIcon from "@/assets/icon/CheckIcon.png";
import LineIcon from "@/assets/icon/line.png";
import UserIcon from "@/assets/icon/user.png";
import HomeIcon from "@/assets/icon/home.png";
import MailIcon from "@/assets/icon/mail.png";

interface CheckTextProps {
    text: string;
    divClassName?: string;
    iconClassName?: string;      
    textClassName?: string;      
    iconSrc?: string;           
}

interface ContentsProps {
    Week: number;
    Content: string;
}

interface MentorProps {
    Name: string;
    Department: string;
    Email: string;
    Message?: string;
}

export default function StudyIntro() {
    const Class = [{
        tabIdx: 0,
        name: "C언어 기초반",
        intro:["C언어에 대한 이해를 높이고 문제를 통해 적용해보며 학습", "직접 코드를 작성해보며 프로그램 동작 원리에 대한 이해", "이후에 듣게 될 자료구조나 알고리즘 스터디 대비 및 문제 해결 능력 향상"],
        target: "프로그래밍이 처음이거나, C언어를 기초부터 배우고 싶으신 분",
        contents: ["입출력", "연산자", "조건문", "반복문", "배열", "함수"],
        mentor: [["남동우", "컴퓨터학부 · 23학번", "askska1002@naver.com", "화이팅"],
                ["김예림", "컴퓨터학부 · 24학번", "yerim2298@hanyang.ac.kr", "화이팅!"]]
    }, {
        tabIdx: 1,
        name: "브릿지반",
        intro:["기초반과 자료구조반 사이의 난이도를 다루는 중간 단계", "포인터, 재귀함수, 자료구조 등 C언어에서 심화 학습에 필요한 핵심 개념을 다룸"],
        target: "C언어에서 함수와 다차원 배열을 모두 다뤄보신 분",
        contents: ["포인터", "다차원 배열 복습", "재귀함수", "구조체"],
        mentor: [["김재민", "컴퓨터학부 · 21학번", "jaemkim01@hanyang.ac.kr", "코딩으로 먹고 살기 힘들다"]]
    }, {
        tabIdx: 2,
        name: "자료구조반",
        intro:["자료구조에 대한 설명과 C++기반 문제풀이 위주 진행", "C언어 기초 개념을 알고 있고, 구현이 가능하다는 전제 하에 진행됩니다."],
        target: "배열을 이용한 구현이 가능한 분 또는 본인이 자료구조에 대한 이해가 부족하다고 생각하시는 분",
        contents: ["C++ STL", "스택", "큐", "그래프", "트리"],
        mentor: [["김동건", "ICT융합학부 · 23학번", "fir3work72@gmail.com", "PS 재밌어요 같이 하실래요?"],
                ["신경현", "컴퓨터학부 · 23학번", "tlsrudgus0501@hanyang.ac.kr", "화이팅!"],]
    }, {
        tabIdx: 3,
        name: "알고리즘반",
        intro:["C++ 기반 문제풀이에 주로 쓰이는 알고리즘 위주의 문제 해결 및 설명"],
        target: "기본적인 자료구조를 알고 있고 코딩테스트에서 주로 나오는 알고리즘을 공부하고 싶으신 분",
        contents: ["완전탐색", "이분탐색", "백트래킹", "분할정복", "동적계획법", "그리디"],
        mentor: [["이준호", "수리데이터사이언스과 · 21학번", "rhdqor213@gmail.com", "알골반 멀리하시고 변태반 사랑해주세요"],]
    } ,{
        tabIdx: 4,
        name: "변태반",
        intro:["알고리즘반 이상의 심화 주제에 대한 설명과 문제풀이 위주로 진행"],
        target: "어려운 문제 풀이에서 재미를 느끼는 분, 알고리즘반 수준의 지식을 갖추고 더 어려운 알고리즘을 공부해보고 싶은 분",
        contents: ["모노톤 큐", "세그먼트 트리", "위상정렬 & DAG DP", "ETT", "LCA", "볼록껍질", "KMP"],
        mentor: [["김범수", "인공지능학과 · 23학번", "zasc90@hanyang.ac.kr", "변태반 멀리하시고 알골반 사랑해주세요"],]
    },{
        tabIdx: 5,
        name: "코드포스반",
        intro:["이전에 열린 코드포스 대회를 가상 참가하고 codeforces anytime으로 자신의 위치를 확인하는 것을 목표"],
        target: "문제 풀이(PS)에 재미를 느끼고 계신 분",
        contents: ["코드포스 대회진행(1)", "코드포스 대회진행(2)", "코드포스 대회진행(3)", "코드포스 대회진행(4)", "코드포스 대회진행(5)", "코드포스 대회진행(6)"],
        mentor: [["여지훈", "컴퓨터학부 · 23학번", "zasc90@hanyang.ac.kr", "코드포스로 세계 무대에 도전해보세요!"],]
    }
    ];

    const [activeTabIdx, setActiveTabIdx] = useState<number>(0);

    return (
        <div className="px-4 w-full flex flex-col items-center my-20">
            <h1 className="text-3xl font-bold mb-8">스터디 소개</h1>
            <PillTab
            tabElements={[
                { label: "C언어 기초반", active: activeTabIdx === 0 },
                { label: "브릿지반", active: activeTabIdx === 1 },
                { label: "자료구조반", active: activeTabIdx === 2 },
                { label: "알고리즘반", active: activeTabIdx === 3 },
                { label: "코드포스반", active: activeTabIdx === 4 },
                { label: "변태반", active: activeTabIdx === 5 }
            ]}
            clickHandler={(index) => setActiveTabIdx(index)}
            activeTabIdx={activeTabIdx}
            textclass="font-semibold"/>

            {Class.filter(item => item.tabIdx === activeTabIdx).map((item, index) => (
            <div key={index} className="w-full max-w-5xl flex flex-col items-start border-2 border-[#E0D7F1] rounded-lg p-10 mt-10 mx-8">
                <p className="text-2xl font-bold my-4">{item.name}</p>
                {item.intro.map((introText, i) => (
                <Icon_TextBox key={i} text={introText} divClassName="m-2" iconClassName="w-6 h-6" textClassName="text-lg text-[#9747FF] font-semibold max-w-7xl" iconSrc={CheckIcon}/>
                ))}
                <div className="w-full self-center bg-[#EBEBEB] rounded-lg p-6 mt-5">
                    <p className="mb-2">대상</p>
                    <p className="font-semibold text-lg">{item.target}</p>
                </div>

                {/* 주차별 내용 */}
                <p className="text-lg font-semibold mt-10 mb-5">주차별 내용</p>
                {item.contents.map((weekContents, j) => (
                <Line Week={j + 1} Content={weekContents}/>
                ))}

                {/* 멘토진 */}
                <p className="text-lg font-semibold mt-10 mb-5">멘토진</p>
                <div className="flex flex-wrap gap-8">
                    {item.mentor.map((mentor, k) => (
                    <Mentor key={k} Name={mentor[0]} Department={mentor[1]} Email={mentor[2]} Message={mentor[3]}/>
                    ))}
                </div>
            </div>
            ))}
        </div>
    );
}

function Icon_TextBox({ text, divClassName = "", iconClassName = "", textClassName = "", iconSrc }: CheckTextProps) {
    return (
        <div className={`flex items-center gap-3 ${divClassName}`}>
        <img src={iconSrc} alt="Icon" className={`${iconClassName}`}/>
        <p className={`${textClassName}`}>{text}</p>
        </div>
    );
}

function Line({ Week, Content }: ContentsProps) {
    return (
        <div className="w-full flex flex-row h-full items-center">
            <img src={LineIcon} alt="라인아이콘" className="w-3 h-18" />
            <div className="w-full ml-8 p-3 flex flex-row items-center border-2 border-[#D9D9D9] rounded-xl">
                <p className="text-[#919191] font-semibold text-sm mx-4">{Week}주차</p>
                <p className="mx-4 font-semibold">{Content}</p>
            </div>
        </div>
    );
}

function Mentor({ Name, Department, Email, Message }: MentorProps) {
    return (
        <div className={"flex flex-col pb-4"}>
            <div className="flex flex-row">
                <div className="flex flex-col justify-center ml-4">
                    <Icon_TextBox text={Name} iconSrc={UserIcon} divClassName="m-0.5" textClassName="font-semibold text-md" iconClassName="w-4 h-4"/>
                    <Icon_TextBox text={Department} iconSrc={HomeIcon} divClassName="m-0.5" textClassName="text-[#919191] text-md" iconClassName="w-4 h-4"/>
                    <Icon_TextBox text={Email} iconSrc={MailIcon} divClassName="m-0.5" textClassName="text-[#919191] text-md" iconClassName="w-4 h-4"/>
                </div>
            </div>
            {Message && (
                <div className="mt-3 p-3 bg-[#F8F4FF] border border-[#E0D7F1] rounded-lg max-w-xs">
                    <p className="text-sm text-[#666666] italic">"{Message}"</p>
                </div>
            )}
        </div>
    );
}