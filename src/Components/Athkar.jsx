import { athkarCategories } from "../AthkarData/AthkarData.js";
import { BookOpen, Sparkles } from "lucide-react";
import { useTheme } from "../Context/DarkmodContext.jsx";
import { useNavigate } from "react-router-dom";
import "../index.css";
const Dashboard = () => {
  const navigate  = useNavigate();
  const getItemsCount = (category) => category.items?.length || 0;
  const { Darkmod } = useTheme();
  const onSelectCategory = (title) => {
    navigate(`/Athkar/${title}`);
  }
  return (
    <div
      className={Darkmod ? "darkmod-big-dashboard" : "BigDashboard"}
      dir="rtl"
    >
      <header>
        <div>
          <div>
            <div>
              <BookOpen />
            </div>
            <div className="header-titles" >
              <h1>حِصْنُ المُسْلِم</h1>
              <p>الأذكار والأدعية اليومية</p>
            </div>
          </div>
          <div className="status-badge">
            <Sparkles />
            <span>هدوء وطمأنينة</span>
          </div>
        </div>
      </header>
      <main>
        <div className="main-intro">
          <h2>أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ</h2>
          <p>اختر أحد الأقسام التالية لتبدأ وِردك اليومي:</p>
        </div>

        <div className="cards-grid">
          {athkarCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
            >
              <div>
                <div className="card-icon">{category.icon}</div>

                <div className="card-info">
                  <h3>{category.title}</h3>
                  <p>يحتوي على {getItemsCount(category)} ذِكر ومأثورة</p>
                </div>
              </div>
              <div>
                <span>←</span>
              </div>
            </button>
          ))}
        </div>
      </main>
      <footer className={Darkmod ? "Dark-footer" :"footer"}>صدقة جارية • تقبل الله منا ومنكم صالح الأعمال</footer>
    </div>
  );
};
export default Dashboard;
