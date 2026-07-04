import { useState, useEffect } from "react";
import "../index.css";
export default function OfflineDetector() {
  const [isOnline, setIsOnline] = useState(false);
  const [isOffline, setIsOffline] = useState(navigator.onLine === false);
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setIsOffline(false);
      setTimeout(() => {
        setIsOnline(false);
      }, 3000);
    };
    const handleOffline = () => {
      setIsOnline(false);
      setIsOffline(true);
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  return (
    <>
      {isOnline && (
        <div className="online-success">
          <span style={{ marginRight: "10px" }}>✅</span>
          يبدو أنك متصل بالإنترنت حالياً.
        </div>
      )}
      {isOffline && (
        <div className="offline-banner">
          <span style={{ marginRight: "10px" }}>⚠️</span>
          يبدو أنك غير متصل بالإنترنت حالياً، يرجى التحقق من الشبكة.
        </div>
      )}
    </>
  );
}
