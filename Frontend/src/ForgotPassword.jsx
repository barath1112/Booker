import { useState } from "react";
import emailjs from "@emailjs/browser";
import "./css/ForgotPassword.css";
import ResetPassword from "./ResetPassword";
import Alert from "./Alert"; // ✅ Importing Alert component

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [step, setStep] = useState(1);
  const [alert, setAlert] = useState({ message: "", type: "" });

  // Generate Random 4-digit OTP
  const generateOtp = () => Math.floor(1000 + Math.random() * 9000);

  // Send OTP via EmailJS
  const sendOtpEmail = async () => {
    if (!email) {
      setAlert({ message: "Email is required!", type: "error" });
      return;
    }

    const otpCode = generateOtp();
    setGeneratedOtp(otpCode); // Store OTP for validation
    console.log("Generated OTP:", otpCode);

    const serviceId = "service_v0nkvd7"; 
    const templateId = "template_kp1ldf6"; 
    const userId = "41d6u_bh8AIt5_C_0"; 

    const templateParams = {
      to_email: email,
      otp_code: otpCode,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, userId);
      setAlert({ message: "OTP sent to your email!", type: "success" });
      setStep(2);
    } catch (error) {
      console.error("Error sending OTP:", error);
      setAlert({ message: "Failed to send OTP!", type: "error" });
    }
  };

  // Verify OTP
  const verifyOtp = () => {
    if (parseInt(otp) === generatedOtp) {
      setStep(3);
      setAlert({ message: "OTP verified! You can reset your password.", type: "success" });
    } else {
      setAlert({ message: "Invalid OTP. Try again!", type: "error" });
    }
  };

  return (
    <div className="forgot-password-container">
      <h3 className="forgot-password-title">Forgot Password</h3>

      {/* Alert Component */}
      {alert.message && <Alert message={alert.message} type={alert.type} onClose={() => setAlert({ message: "", type: "" })} />}

      {step === 1 && (
        <>
          <input
            type="email"
            className="forgot-password-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="forgot-password-btn" onClick={sendOtpEmail}>
            Send OTP
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="text"
            className="forgot-password-input"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button className="forgot-password-btn" onClick={verifyOtp}>
            Verify OTP
          </button>
        </>
      )}

      {step === 3 && <ResetPassword email={email} />}
    </div>
  );
};

export default ForgotPasswordPage;
