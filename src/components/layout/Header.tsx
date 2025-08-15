import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  const [barOpen, setBarOpen] = useState(false);
  function barClick() {
    setBarOpen(!barOpen);
  }
  return (
    <header className="sticky top-0 z-50 p-4  h-16 bg-transparent">
      <div
        className="absolute inset-0 bg-gradient-to-b
  from-black/95
  via-black/50
  
  to-transparent pointer-events-none"
      ></div>
      <nav
        className="flex flex-row md:justify-around justify-between relative text-white 
      
      "
      >
        <Link to="/">zerone</Link>

        <div>
          <ul className="md:flex hidden flex-row space-x-5">
            <li>
              <NavLink to="/study" className={({ isActive }) => (isActive ? 'font-bold' : '')}>
                스터디
              </NavLink>
            </li>
            <li>활동</li>
            <li>게시판</li>
            <li>Q&A</li>
          </ul>
          <div>
            <button className="md:hidden text-xl" onClick={barClick}>
              ☰
            </button>
          </div>
        </div>
        {barOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-20" onClick={barClick}></div>
        )}
        <div
          className={`fixed top-0 right-0 h-full w-3/5 bg-white z-30 transform ${
            barOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300 ease-in-out text-black`}
        >
          <button className="p-4 text-xl" onClick={barClick}>
            ✕
          </button>
          <ul className="flex flex-col space-y-4 p-4 ">
            <li>
              <NavLink
                to="/study"
                onClick={barClick}
                className={({ isActive }) => (isActive ? 'font-bold' : '')}
              >
                스터디
              </NavLink>
            </li>
            <li>활동</li>
            <li>게시판</li>
            <li>Q&A</li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
