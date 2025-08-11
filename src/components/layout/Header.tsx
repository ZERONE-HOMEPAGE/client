import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="position-sticky z-50 bg-white p-4 flex flex-row justify-evenly">
      <h1 className="">
        <Link to="/">zerone</Link>
      </h1>

      <div>
        <ul className="list-none flex space-x-5 ">
          <li>
            <NavLink to="/study" className={({ isActive }) => (isActive ? 'font-bold' : '')}>
              스터디
            </NavLink>
          </li>
          <li>활동</li>
          <li>게시판</li>
          <li>Q&A</li>
        </ul>
      </div>
    </header>
  );
}
