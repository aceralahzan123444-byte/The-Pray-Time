import { useEffect, useState } from "react";
import Prayer from "./Prayer";
import { Countries } from "../Countries";
import { useTheme } from "../Context/DarkmodContext";
import moment from "moment";
function Home() {
  const [PrayTime, setPrayTime] = useState({});
  const [TodayDate, setTodayDate] = useState("");
  const [City, setCity] = useState("Cairo");
  const [Country, setCountry] = useState("EG");
  const [LiveTime, setLiveTime] = useState(moment().format("LTS"));
  const { Darkmod } = useTheme();

  const getNextPrayer = () => {
    if (!PrayTime || Object.keys(PrayTime).length === 0) return null;

    const PrayerTimes = {
      Fajr: "الفجر",
      Dhuhr: "الظهر",
      Asr: "العصر",
      Maghrib: "المغرب",
      Isha: "العشاء",
    };
    const now = moment();
    for (let Key in PrayerTimes) {
      const cleanTimerStr = String(PrayTime[Key]).trim().slice(0, 5);
      const [hours, minutes] = cleanTimerStr.split(":");
      const PrayerTime = moment().set({
        hour: parseInt(hours),
        minute: parseInt(minutes),
        second: 0,
        millisecond: 0,
      });
      if (PrayerTime.isAfter(now)) {
        const newClac = moment.duration(PrayerTime.diff(now));
        return {
          name: PrayerTimes[Key],
          countdown: newClac,
        };
      }
    }
    const firstPrayerStr = String(PrayTime["Fajr"]).trim().slice(0, 5);
    const [fajrHours, fajrMinutes] = firstPrayerStr.split(":");
    const nextDayFajr = moment()
      .add(1, "days")
      .set({
        hour: parseInt(fajrHours),
        minute: parseInt(fajrMinutes),
        second: 0,
        millisecond: 0,
      });

    return {
      name: "الفجر",
      countdown: moment.duration(nextDayFajr.diff(now)),
    };
  };
  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${City}&country=${Country}&method=4`,
        );
        const data_prayer = await response.json();
        console.log(City);

        console.log(data_prayer);
        setPrayTime(data_prayer.data.timings);
        setTodayDate(data_prayer.data.date);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPrayerTimes();
  }, [City, Country]);

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveTime(moment().format("LTS"));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      if (!Country) return;
      try {
        const response = await fetch(
          `https://countriesnow.space/api/v0.1/countries/cities`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ iso2: Country }),
          },
        );
        const data = await response.json();

        if (!data.error) {
          setCities(data.data);

          const currentcountry = Countries.find((c) => c.value === Country);
          if (currentcountry && data.data.includes(currentcountry.capital)) {
            setCity(currentcountry.capital);
          } else {
            setCity(data.data[0]);
          }
        }
      } catch (error) {
        console.error("خطأ في جلب المدن:", error);
      }
    };

    fetchCities();
  }, [Country]);

  const formatTimes = (time) => {
    if (!time) {
      return "00:00";
    }
    let [hours, minutes] = time.split(":").map(Number);
    const perd = hours >= 12 ? "PM" : "AM";
    const newminutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    hours = hours % 12 || 12;
    return `${hours}:${newminutes} ${perd}`;
  };

  const nextPrayer = getNextPrayer();
  return (
    <>
    <div className={Darkmod ? "dark-mod-Big" : "Big"}>
      
      {nextPrayer && (
        <div className={Darkmod ? "dark-mod-next-prayer" : "next-prayer"}>
          <h2>الصلاة القادمة: {nextPrayer.name}</h2>
          <h3 className={Darkmod ? "dark-mod-next-prayer-h3" : ""}>
            المتبقي: {nextPrayer.countdown?.hours()} ساعة و{" "}
            {nextPrayer.countdown?.minutes()} دقيقة و{" "}
            {nextPrayer.countdown?.seconds()} ثانية
          </h3>
        </div>
      )}

      <section>
        <div className={Darkmod ? "dark-mod-section-container" : "container"}>
          <div className="country">
            <h1 style={{fontSize:"26px" , color:"#214969"}} className={Darkmod ? "dark-mod-setction-counrty-h1" : ""}>
              الدولة :
            </h1>
            <select
              className={Darkmod ? "dark-mod-setction-counrty-select" : ""}
              value={Country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {Countries.map((country) => (
                <option key={country.id} value={country.value}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div className={Darkmod ? "dark-mod-setction-top_sec" : "top_sec"}>
            <div className="city">
              <h3 className={Darkmod ? "dark-mod-setction-top_sec-h3" : ""}>
                المدينة :
              </h3>
              <select
                className={Darkmod ? "dark-mod-setction-top_sec-select" : ""}
                value={City}
                onChange={(e) => setCity(e.target.value)}
              >
                {cities.map((cityName, index) => (
                  <option key={index} value={cityName}>
                    {cityName}
                  </option>
                ))}
              </select>
            </div>
            <div className="Date">
              <h3 className={Darkmod ? "dark-mod-setction-top_sec-h3" : ""}>
                التاريخ :
              </h3>
              <h4
                className={Darkmod ? "dark-mod-setction-top_sec-Date-h4" : ""}
              >
                {TodayDate?.gregorian?.date}
              </h4>
            </div>
            <div className="Time">
              <h3 className={Darkmod ? "dark-mod-setction-top_sec-h3" : ""}>
                الوقت :
              </h3>
              <h4
                className={Darkmod ? "dark-mod-setction-top_sec-Time-h4" : ""}
              >
                {LiveTime}
              </h4>
            </div>
          </div>

          <Prayer
            className={Darkmod ? "dark-mod-setction-prayer" : ""}
            name=" الفجر :"
            time={formatTimes(PrayTime.Fajr)}
          />
          <Prayer
            className={Darkmod ? "dark-mod-setction-prayer" : ""}
            name="الظهر  :"
            time={formatTimes(PrayTime.Dhuhr)}
          />
          <Prayer
            className={Darkmod ? "dark-mod-setction-prayer" : ""}
            name="العصر  :"
            time={formatTimes(PrayTime.Asr)}
          />
          <Prayer
            className={Darkmod ? "dark-mod-setction-prayer" : ""}
            name="المغرب  :"
            time={formatTimes(PrayTime.Maghrib)}
          />
          <Prayer
            className={Darkmod ? "dark-mod-setction-prayer" : ""}
            name="العشاء  :"
            time={formatTimes(PrayTime.Isha)}
          />
        </div>
      </section>
      <footer className={Darkmod ? "Dark-footer" :"footer"}>صدقة جارية • تقبل الله منا ومنكم صالح الأعمال</footer>
    </div>
    </>
  );
}
export default Home;
