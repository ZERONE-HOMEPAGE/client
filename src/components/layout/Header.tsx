import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

export default function Header() {
  const [barOpen, setBarOpen] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  function barClick() {
    setBarOpen(!barOpen);
  }
  const menuItems = [
    { name: '스터디', path: '/study' },
    { name: '활동', path: null },
    { name: '게시판', path: null },
    { name: '컴파일러', path: null },
    { name: 'Q&A', path: null },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && barOpen) {
        setBarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [barOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '0px',
      },
    );
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={observerRef}
        className="absolute top-[100vh] h-px w-full pointer-events-none invisible"
      ></div>
      <header className="sticky top-0 z-50  bg-transparent">
        <div
          className={`absolute inset-0 bg-gradient-to-b from-black/95 via-black/50 to-transparent pointer-events-none transition-opacity duration-500 ease-out backdrop-blur ${
            isHeroVisible ? 'opacity-100' : 'opacity-0'
          }`}
        ></div>
        <div
          className={`absolute inset-0 bg-black pointer-events-none transition-opacity duration-500 ease-out ${
            location.pathname === '/' && isHeroVisible ? 'opacity-0' : 'opacity-100'
          }`}
        ></div>
        <nav className="flex flex-row md:justify-around justify-between relative text-white items-center px-4 h-16">
          <div className="font-semibold">
            <Link to="/">zerone</Link>
          </div>

          <div>
            <ul className="md:flex hidden flex-row space-x-5">
              {menuItems.map(({ name, path }) => (
                <li key={name}>
                  {path ? (
                    <NavLink to={path} className={({ isActive }) => (isActive ? 'font-bold' : '')}>
                      {name}
                    </NavLink>
                  ) : (
                    <span>{name}</span>
                  )}
                </li>
              ))}
            </ul>
            <div>
              <button className="md:hidden text-xl" onClick={barClick}>
                ☰
              </button>
            </div>
          </div>
          {barOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-40 z-20 " onClick={barClick}></div>
          )}
          <div
            className={`fixed top-0 right-0 h-full w-3/5 bg-white z-30 transform ${
              barOpen ? 'translate-x-0' : 'translate-x-full'
            } transition-transform duration-300 ease-in-out text-black `}
          >
            <button className="p-4 text-xl" onClick={barClick}>
              ✕
            </button>
            <ul className="flex flex-col space-y-4 p-4 ">
              {menuItems.map(({ name, path }) => (
                <li key={name} onClick={barClick}>
                  {path ? (
                    <NavLink to={path} className={({ isActive }) => (isActive ? 'font-bold' : '')}>
                      {name}
                    </NavLink>
                  ) : (
                    <div>{name}</div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}
