import PillTab from "@/components/ui/PillTab";
import { useState } from "react";
import CheckIcon from "@/assets/icon/CheckIcon.png";
import LineIcon from "@/assets/icon/line.png";
import UserIcon from "@/assets/icon/user.png";
import HomeIcon from "@/assets/icon/home.png";
import MailIcon from "@/assets/icon/mail.png";
import { text } from "stream/consumers";

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
    ImgUrl?: string;
    Name: string;
    Department: string;
    Email: string;
}

export default function StudyIntro() {
    const Class = [{
        tabIdx: 0,
        name: "C언어 기초반",
        intro:["C언어에 대한 이해를 높이고 문제를 통해 적용해보며 학습", "직접 코드를 작성해보며 프로그램 동작 원리에 대한 이해", "이후에 듣게 될 자료구조나 알고리즘 스터디 대비 및 문제 해결 능력 향상"],
        target: "프로그래밍이 처음이거나, C언어를 기초부터 배우고 싶으신 분",
        contents: ["입출력", "연산자", "조건문", "반복문", "배열", "함수"],
        mentor: [["여지훈", "컴퓨터학부 · 23학번", "zasc90@hanyang.ac.kr"],
                ["여지훈", "컴퓨터학부 · 23학번", "zasc90@hanyang.ac.kr"],
                ["여지훈", "컴퓨터학부 · 23학번", "zasc90@hanyang.ac.kr"]]
    }, {
        tabIdx: 1,
        name: "브릿지반",
        intro:["기초반과 자료구조반 사이의 난이도를 다루는 중간 단계", "포인터 개념과 메모리 구조 이해를 중심으로 학습"],
        target: "C언어 문법은 익혔지만 포인터와 심화 문법을 배우고 싶은 분",
        contents: ["포인터 기초", "포인터와 배열", "동적 메모리 할당", "문자열과 포인터", "함수 포인터", "포인터 활용 프로젝트"],
        mentor: [["여지훈", "컴퓨터학부 · 23학번", "zasc90@hanyang.ac.kr"],
                ["여지훈", "컴퓨터학부 · 23학번", "zasc90@hanyang.ac.kr"],
                ["여지훈", "컴퓨터학부 · 23학번", "zasc90@hanyang.ac.kr"]]
    }, {
        tabIdx: 2,
        name: "자료구조반",
        intro:["실제 문제 해결에 필요한 핵심 자료구조들을 학습", "스택, 큐, 그래프, 트리 등 기초 알고리즘에 필수적인 구조 다룸", "BFS, DFS와 같은 탐색 알고리즘을 구현해봄"],
        target: "프로그래밍 기초를 마치고 자료구조와 탐색 알고리즘을 배우고 싶은 분",
        contents: ["스택", "큐", "힙", "맵", "그래프", "BFS/DFS", "트리", "정리 및 실습"],
        mentor: [["여지훈", "컴퓨터학부 · 23학번", "zasc90@hanyang.ac.kr"],
                ["여지훈", "컴퓨터학부 · 23학번", "zasc90@hanyang.ac.kr"],
                ["여지훈", "컴퓨터학부 · 23학번", "zasc90@hanyang.ac.kr"]]
    }, {
        tabIdx: 3,
        name: "알고리즘반",
        intro:["다양한 문제 해결 패턴과 고급 알고리즘 학습", "코딩 테스트와 프로그래밍 대회 준비를 위한 필수 개념", "시간 복잡도와 공간 복잡도 최적화에 집중"],
        target: "자료구조를 이해하고 더 어려운 알고리즘 문제를 풀고 싶은 분",
        contents: ["그리디 알고리즘", "분할 정복", "DP 기초", "고급 DP", "그래프 최단 경로", "이분 탐색", "세그먼트 트리", "최적화 기법"],
        mentor: [["여지훈", "컴퓨터학부 · 23학번", "zasc90@hanyang.ac.kr"],
                ["여지훈", "컴퓨터학부 · 23학번", "zasc90@hanyang.ac.kr"],
                ["여지훈", "컴퓨터학부 · 23학번", "zasc90@hanyang.ac.kr"]]
    } ,{
        tabIdx: 4,
        name: "코드포스반",
        intro:["국제 프로그래밍 대회를 대비한 난이도 높은 알고리즘 학습", "시간/메모리 최적화 스킬과 구현 능력 향상"],
        target: "코딩 테스트 이상의 대회 문제를 해결해보고 싶은 분",
        contents: ["고급 그래프 알고리즘", "고급 DP", "네트워크 플로우", "퍼시스턴트 자료구조", "문자열 알고리즘", "수학적 알고리즘", "최적화 기법", "실전 모의 대회"],
        mentor: [["여지훈", "컴퓨터학부 · 23학번", "zasc90@hanyang.ac.kr"],
                ["여지훈", "컴퓨터학부 · 23학번", "zasc90@hanyang.ac.kr"],
                ["여지훈", "컴퓨터학부 · 23학번", "zasc90@hanyang.ac.kr"]]
    } ,{
        tabIdx: 5,
        name: "변태반",
        intro:["실무나 대회에서는 잘 쓰이지 않는 특이한 알고리즘을 탐구", "취미와 호기심 기반의 손동열 중심 반"],
        target: "특이한 알고리즘을 배우며 즐기고 싶은 분",
        contents: ["유클리드 확장 알고리즘", "회문 트리", "희소 배열", "오일러 경로", "로프 알고리즘", "이상한 트리 구조", "특수 문자열 알고리즘", "잡다한 희귀 알고리즘"],
        mentor: [["여지훈", "컴퓨터학부 · 23학번", "zasc90@hanyang.ac.kr"],
                ["여지훈", "컴퓨터학부 · 23학번", "zasc90@hanyang.ac.kr"],
                ["여지훈", "컴퓨터학부 · 23학번", "zasc90@hanyang.ac.kr"]]
    }];

    const [activeTabIdx, setActiveTabIdx] = useState<number>(0);

    return (
        <div className="w-full min-h-[100vh] flex flex-col items-center p-4">
            <h1 className="text-4xl font-bold mt-24 mb-8">스터디 소개</h1>
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
            <div key={index} className="w-full max-w-6xl flex flex-col items-start border-[3px] border-[#E0D7F1] rounded-lg p-10 mt-10 mx-8">
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
                    <Mentor key={k} Name={mentor[0]} Department={mentor[1]} Email={mentor[2]}/>
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

function Mentor({ ImgUrl, Name, Department, Email }: MentorProps) {
    return (
         <div className={"flex flex-row pb-4"}>
            {ImgUrl ? <img src={ImgUrl} alt="사진" className="w-24 h-32 object-cover" /> : <div className="w-24 h-32 bg-[#D9D9D9]"/>}
            <div className="flex flex-col justify-center ml-4">
                <Icon_TextBox text={Name} iconSrc={UserIcon} divClassName="m-0.5" textClassName="font-semibold text-md" iconClassName="w-4 h-4"/>
                <Icon_TextBox text={Department} iconSrc={HomeIcon} divClassName="m-0.5" textClassName="text-[#919191] text-md" iconClassName="w-4 h-4"/>
                <Icon_TextBox text={Email} iconSrc={MailIcon} divClassName="m-0.5" textClassName="text-[#919191] text-md" iconClassName="w-4 h-4"/>
            </div>
        </div>
    );
}