import { useState } from "react";
import { useTheme } from "../Context/DarkmodContext";
export default function Tasbeeh() {
  const athkarAlmouslim = [
    {
      id: self.crypto.randomUUID(),
      text: "لا إله إلا الله وحده لا شريك له ، له الملك وله الحمد وهو على كل شيء قدير",
      target: 100,
    },
    {
      id: self.crypto.randomUUID(),
      text: "اللهمَّ إنك عفوٌّ تُحبُّ العفوَ فاعفُ عنِّي",
      target: 100,
    },
    {
      id: self.crypto.randomUUID(),
      text: "سبحان الله وبحمده عدد خلقه ورضا نفسه وزنة عرشه ومداد كلماته",
      target: 100,
    },
    {
      id: self.crypto.randomUUID(),
      text: "اللهم صل وسلم على نبينا محمد",
      target: 100,
    },
    {
      id: self.crypto.randomUUID(),
      text: "أستغفر الله الذى لا إله إلا هو الحى القيوم وأتوب إليه",
      target: 100,
    },
    {
      id: self.crypto.randomUUID(),
      text: "اللَّهُمَّ إنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا، ولَا يَغْفِرُ الذُّنُوبَ إلَّا أنْتَ، فَاغْفِرْ لي مَغْفِرَةً مِن عِندِكَ، وارْحَمْنِي، إنَّكَ أنْتَ الغَفُورُ الرَّحِيمُ",
      target: 100,
    },
    { id: self.crypto.randomUUID(), text: "رب اغفر لي", target: 100 },
    {
      id: self.crypto.randomUUID(),
      text: "سبحان الله و الحمد الله و لا إله إلا الله و الله أكبر",
      target: 100,
    },
    {
      id: self.crypto.randomUUID(),
      text: "اللهم أنت ربي لا إله الا أنت، خلقتني وأنا عبدك وأنا على عهدك ووعدك ما استطعت، أعوذ بك من شر ما صنعت، أبوء لك بنعمتك عليّ وأبوء بذنبي، فاغفر لي، فإنه لا يغفر الذنوب إلا أنت",
      target: 100,
    },
    {
      id: self.crypto.randomUUID(),
      text: "لا إله إلا الله وحده لا شريك لهُ ، لهُ الملك ، ولهُ الحمدُ ، وهو على كل شيء قدير",
      target: 100,
    },
  ];
  const { Darkmod } = useTheme();
  const [savedCounts, setSavedCounts] = useState(() => {
    const newsavedcount =
      JSON.parse(localStorage.getItem("tasbeeh_counts")) || {};
    return newsavedcount;
  });
  const [currentIndex, setCurrentIndex] = useState(() => {
    const savedIndex = localStorage.getItem("tasbeeh_index");
    return savedIndex ? Number(savedIndex) : 0;
  });

  const currentThikr = athkarAlmouslim[currentIndex];
  const count = savedCounts[currentIndex] || 0;
  const handleIncrement = () => {
    const nextCount = count + 1;
    if (nextCount >= currentThikr.target) {
      const updatecountsforThikir = { ...savedCounts, [currentIndex]: 0 };
      setSavedCounts(updatecountsforThikir);
      localStorage.setItem(
        "tasbeeh_counts",
        JSON.stringify(updatecountsforThikir),
      );
      const updateCurrentIndexforThikr =
        currentIndex < athkarAlmouslim.length - 1 ? currentIndex + 1 : 0;
      setCurrentIndex(updateCurrentIndexforThikr);
      localStorage.setItem("tasbeeh_index", updateCurrentIndexforThikr);
    } else {
      const updateCountsforelseThikir = {
        ...savedCounts,
        [currentIndex]: nextCount,
      };
      setSavedCounts(updateCountsforelseThikir);
      localStorage.setItem(
        "tasbeeh_counts",
        JSON.stringify(updateCountsforelseThikir),
      );
    }
  };
  const handleReset = () => {
    const UpdateCountstoresetThikir = { ...savedCounts, [currentIndex]: 0 };
    setSavedCounts(UpdateCountstoresetThikir);
    localStorage.setItem(
      "tasbeeh_counts",
      JSON.stringify(UpdateCountstoresetThikir),
    );
  };
  return (
    <>
      <div className={Darkmod ? "Dark-tasbeeh-container" : "tasbeeh-container"}>
        <div className="tasbeeh-card">
          <div className={Darkmod ? "Dark-main-Text" : "main-Text"}>
            {" "}
            أذكار المسلم :{" "}
          </div>
          <p className={Darkmod ? "Dark-thikr-text" : "thikr-text"}>
            {currentThikr?.text}
          </p>
          <span className={Darkmod ? "Dark-target-badge" : "target-badge"}>
            الهدف: {currentThikr?.target}
          </span>
          <div
            className={Darkmod ? "Dark-counter-circle" : "counter-circle"}
            onClick={handleIncrement}
          >
            <span
              className={Darkmod ? "Dark-counter-number" : "counter-number"}
            >
              {count}
            </span>
            <span className={Darkmod ? "Dark-tap-hint" : "tap-hint"}>
              اضغط للتسبيح
            </span>
          </div>
          <div className="control-actions">
            <button
              className={Darkmod ? "Dark-nav-btn" : "nav-btn"}
              disabled={currentIndex === 0}
              onClick={() => {
                const prevIndex = currentIndex - 1;
                setCurrentIndex(prevIndex);
                localStorage.setItem("tasbeeh_index", prevIndex);
              }}
            >
              السابق
            </button>
            <button
              className={Darkmod ? "Dark-reset-btn" : "reset-btn"}
              onClick={handleReset}
            >
              تصفير
            </button>
            <button
              className={Darkmod ? "Dark-nav-btn" : "nav-btn"}
              disabled={currentIndex === athkarAlmouslim.length - 1}
              onClick={() => {
                const nextIndex = currentIndex + 1;
                setCurrentIndex(nextIndex);
                localStorage.setItem("tasbeeh_index", nextIndex);
              }}
            >
              التالي
            </button>
          </div>
        </div>
      </div>
      <footer className={Darkmod ? "Dark-footer" : "footer"}>
        صدقة جارية • تقبل الله منا ومنكم صالح الأعمال
      </footer>
    </>
  );
}
