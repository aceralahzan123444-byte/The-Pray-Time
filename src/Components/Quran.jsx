import { surahDetailsList } from "../QuranData/QuranAyatCount";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTheme } from "../Context/DarkmodContext";
import { CircularProgress } from "@mui/material";
import "../index.css";
export default function Quran() {
  const [Surahs, setSurahs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSurahId, setselectedSurahId] = useState(1);
  const [isLoading, setisLoading] = useState(true);
  const [verses, setVerses] = useState([]);
  const { Darkmod } = useTheme();
  useEffect(() => {
    let cancelAxios = new AbortController();
    axios
      .get("https://mp3quran.net/api/v3/suwar?language=ar", {
        signal: cancelAxios.signal,
      })
      .then(function (response) {
        const suwar = response.data.suwar.map((res, index) => {
          const localData = surahDetailsList[index];
          return {
            id: res.id,
            name: res.name,
            type: localData?.type,
            verses: localData?.verses,
          };
        });
        setSurahs(suwar);
        setisLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
    return () => {
      console.log("cancelling axios");
      cancelAxios.abort();
    };
  }, []);

  useEffect(() => {
    let cancelAxios = new AbortController();
    axios
      .get(`https://api.alquran.cloud/v1/surah/${selectedSurahId}`, {
        signal: cancelAxios.signal,
      })
      .then(function (response) {
        console.log(response);
        setVerses(response.data.data.ayahs);
      })
      .catch(function (error) {
        console.log(error);
      });
    return () => {
      console.log("cancelling axios");
      cancelAxios.abort();
    };
  }, [selectedSurahId]);
  function SurahId(id) {
    setselectedSurahId(id);
  }
  // function handleSearchChange(event) {
  //   if (event.key === "Enter" && filteredSurahs.length > 0) {
  //     setselectedSurahId(filteredSurahs[0].id);
  //     setSearchTerm("");
  //   }
  // }
  if (isLoading) {
    return (
      <div
        className={Darkmod ? "dark-loader-container" : "main-loader-container"}
      >
        <CircularProgress
          size={50}
          thickness={4}
          sx={{ color: Darkmod ? "#d2ebf3" : "#214969" }}
        />
        <p
          style={{
            marginTop: "15px",
            fontFamily: "Cairo",
            fontWeight: "bold",
            border: Darkmod ? "2px solid #d2ebf3" : "2px solid #214969",
            color: Darkmod ? "#d2ebf3" : "#214969",
            backgroundColor: Darkmod ? "#214969" : "#d2ebf3",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        >
          جاري تحميل سور القرآن الكريم...
        </p>
      </div>
    );
  }
  const filteredSurahs = Surahs.filter((surah) =>
    surah.name.includes(searchTerm),
  );
  const selectedSurahDetails = Surahs.find(
    (surah) => surah.id === selectedSurahId,
  );
  const handleSubmit = (event) => {
    event.preventDefault();
    if (filteredSurahs.length > 0) {
      setselectedSurahId(filteredSurahs[0].id);
      setSearchTerm("");
      console.log("تم الانتقال بنجاح عبر الجوال!");
    }
  };
  return (
    <div className="quran-container">
      <form onSubmit={handleSubmit}>
        <div className="search-container">
          <input
            type="search"
            enterKeyHint="search"
            placeholder=" ابحث عن اسم السورة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={Darkmod ? "dark-mod-inputSearch" : "inputSearch"}
          />

          <select
            onChange={(e) => SurahId(Number(e.target.value))}
            value={selectedSurahId}
            className={
              Darkmod ? "dark-mod-select Dark-scroll-bar" : "select scroll-bar"
            }
          >
            {filteredSurahs.map((surahDone) => (
              <option
                className={Darkmod ? "dark-mod-option" : "option"}
                key={surahDone.id}
                value={surahDone.id}
              >
                {surahDone.name}
              </option>
            ))}
          </select>
        </div>
      </form>

      {selectedSurahDetails && (
        <div className={Darkmod ? "Dark-surah-details" : "surah-details"}>
          <h2 className={Darkmod ? "dark-mod-surah-name" : "surah-name"}>
            سورة {selectedSurahDetails.name} :
          </h2>

          <div className={Darkmod ? "Dark-surah-info" : "surah-info"}>
            <span className={Darkmod ? "Dark-surah-type" : "surah-type"}>
              🕋 النوع: <strong>{selectedSurahDetails.type}</strong>
            </span>
            <span className={Darkmod ? "Dark-surah-verses" : "surah-verses"}>
              📖 عدد الآيات: <strong>{selectedSurahDetails.verses}</strong> آية
            </span>
          </div>
        </div>
      )}
      <div
        className={
          Darkmod
            ? "Dark-ayahs-container Dark-scroll-bar"
            : "ayahs-container scroll-bar"
        }
      >
        {verses.map((ayah) => {
          if (ayah.numberInSurah === 1 && selectedSurahId === 1) {
            return (
              <h1
                key={ayah.number}
                style={{ paddingBottom: "15px", fontSize: "29px" }}
                className={
                  Darkmod ? "Dark-amiri-quran-regular" : "amiri-quran-regular"
                }
              >
                بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیم
              </h1>
            );
          }
          return (
            <React.Fragment key={ayah.number}>
              {ayah.numberInSurah === 1 && selectedSurahId !== 9 && (
                <h1
                  style={{ paddingBottom: "15px", fontSize: "29px" }}
                  className={
                    Darkmod ? "Dark-amiri-quran-regular" : "amiri-quran-regular"
                  }
                >
                  بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیم
                </h1>
              )}
              <span
                className={
                  Darkmod ? "Dark-amiri-quran-regular" : "amiri-quran-regular"
                }
                key={ayah.number}
              >
                {ayah.text.replace(
                  "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ",
                  "",
                )}
                <span className="ayah-number">
                  {selectedSurahId === 1
                    ? ` (${ayah.numberInSurah - 1})`
                    : ` (${ayah.numberInSurah})`}
                </span>
              </span>
            </React.Fragment>
          );
        })}
      </div>
      <footer className={Darkmod ? "Dark-footer" : "footer"}>
        صدقة جارية • تقبل الله منا ومنكم صالح الأعمال
      </footer>
    </div>
  );
}
