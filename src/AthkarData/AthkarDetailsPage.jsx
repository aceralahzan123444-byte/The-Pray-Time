import { useParams } from "react-router-dom";
import { athkarCategories } from "./AthkarData";
import { useState } from "react";
import { useTheme } from "../Context/DarkmodContext.jsx";
import "../index.css";
export default function AthkarDetailsPage() {
  const { title } = useParams();
  const { Darkmod } = useTheme();
  const TheChosedThikr = athkarCategories.find((items) => items.id === title);
  const [thikrlist, setThikrlist] = useState(() => {
    return TheChosedThikr?.items || [];
  });
  const handleCounter = (id) => {
    setThikrlist((prevList) =>
      prevList.map((thikr) => {
        if (thikr.id === id) {
          return { ...thikr, target: thikr.target > 0 ? thikr.target - 1 : 0 };
        }
        return thikr;
      }),
    );
  };
  return (
    <>
    <div className={Darkmod ? "Dark-athkar-details-container" : "athkar-details-container"}>
      <h1>{TheChosedThikr?.title}</h1>
      {thikrlist &&
        thikrlist?.map((thikr) => (
          <div
            key={thikr.id}
            className={ Darkmod ? `Dark-thikr-card ${thikr.target === 0 ? "Dark-completed" : ""}` : `thikr-card ${thikr.target === 0 ? "completed" : ""}` }
          >
            <div className={Darkmod ? "Dark-thikr-text2" : "thikr-text2"}>{thikr.text}</div>
            <div
              onClick={() => handleCounter(thikr.id)}
              className={ Darkmod ? `Dark-counter-box ${thikr.target === 0 ? "Dark-done" : ""}` :`counter-box ${thikr.target === 0 ? "done" : ""}`}
            >
              {thikr.target}
            </div>
          </div>
        ))}
    </div>
    <footer className={Darkmod ? "Dark-footer" :"footer"}>صدقة جارية • تقبل الله منا ومنكم صالح الأعمال</footer>
    </>
  );
}
