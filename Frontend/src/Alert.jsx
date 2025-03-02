import { useEffect } from "react";
import "./css/Alert.css";

const Alert = ({ message, type, onClose }) => {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose(); // Ensure onClose is safely called
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null; // Prevent rendering when message is empty

  return (
    <div className={`custom-alert ${type === "error" ? "error" : "success"}`}>
      <span className="custom-alert-message">{message}</span>
      <button className="close-btn" onClick={onClose} aria-label="Close Alert">✖</button>
    </div>
  );
};

export default Alert;
