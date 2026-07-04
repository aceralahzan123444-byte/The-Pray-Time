import "../index.css";
import SideMenu from "./Navbar";
import { Link } from "react-router-dom";
import { useTheme } from "../Context/DarkmodContext";
export default function Header() {
  const navItems = [
    { text: "القرآن الكريم", path: "/Quran" },
    { text: "الأذكار", path: "/Athkar" },
    { text: "المسبحة الإلكترونية", path: "/Tasbeeh" },
    { text: "الصفحة الرئيسية ", path: "/" },
  ];
  const { Darkmod , toggleTheme } = useTheme();

  return (
    <div className={Darkmod ? "dark-Big-header" : "Big-Header"} >
      <header className={Darkmod ? "dark-header" : "main-header"}>
        <nav className={Darkmod ? "dark-nav" : "desktop-nav"}>
          <ul>
            {navItems.map((item, index) => (
              <li
                key={index}>
                <Link style={{textDecoration:"none" , color:"inherit"}} to={item.path}>
                {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <div className={Darkmod ? "dark-header-actions" : "header-actions"}>
        <button
          className={Darkmod ? "dark-mod-Button" : ""}
          onClick={toggleTheme}
        >
          {Darkmod ? "☀️" : "🌙"}
        </button>
        <SideMenu 
          className={
            Darkmod
              ? "dark-mod-sideMenu sideMenu-toggle"
              : "sideMenu sideMenu-toggle"
          }
        />
      </div>
    </div>
  );
}
