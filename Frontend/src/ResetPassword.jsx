import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "./Alert"; // ✅ Import Alert component
import "./css/ResetPassword.css";

const ResetPasswordPage = ({ email }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setAlert({ message: "Passwords do not match!", type: "error" });
      return;
    }

    try {
      await axios.put("http://localhost:9093/api/users/reset-password", null, {
        params: { email, newPassword: password },
      });

      setAlert({ message: "Password reset successfully!", type: "success" });

      // ✅ Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Error resetting password:", error);
      setAlert({ message: "Error resetting password!", type: "error" });
    }
  };

  return (
    <div className="reset-password-container">
      <h3>Reset Password</h3>

      <Alert message={alert.message} type={alert.type} onClose={() => setAlert({ message: "", type: "" })} />

      <input
        className="reset-password-input"
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        className="reset-password-input"
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button className="reset-password-btn" onClick={handleResetPassword}>
        Reset Password
      </button>
    </div>
  );
};

export default ResetPasswordPage;
