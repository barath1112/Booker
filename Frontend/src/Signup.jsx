import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/Signup.css";
import Alert from "./Alert";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    location: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const checkEmailAvailability = async (email) => {
    if (!email) return;

    try {
      await axios.get("http://localhost:9093/api/users/check-email", { params: { email } });
      setAlert({ message: "", type: "" });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setAlert({ message: "Email already registered. Try a new email or log in.", type: "error" });
      } else {
        setAlert({ message: "Error checking email availability.", type: "error" });
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "email") {
      checkEmailAvailability(e.target.value);
    }
  };

  const handleRoleChange = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setAlert({ message: "Passwords do not match", type: "error" });
      return;
    }

    try {
      await axios.post("http://localhost:9093/api/users/signup", formData);
      setFormData({ name: "", mobile: "", email: "", location: "", password: "", confirmPassword: "", role: "" });
      setSubmitted(true);
      setAlert({ message: "Signup successful! Redirecting to login...", type: "success" });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Error saving data:", error);
      setAlert({ message: "Signup failed. Please try again.", type: "error" });
    }
  };

  return (
    
    <div className="signup-wrapper">
       <h2> Booker Sign Up</h2>
      {alert.message && <Alert message={alert.message} type={alert.type} onClose={() => setAlert({ message: "", type: "" })} />}
      <div className="signup-container">
       
       
        
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="signup-input" required />
            <input type="text" name="mobile" placeholder="Mobile No" value={formData.mobile} onChange={handleChange} className="signup-input" required />
            <input type="email" name="email" placeholder="Email ID" value={formData.email} onChange={handleChange} className="signup-input" required />
            <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="signup-input" required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="signup-input" required />
            <input type="password" name="confirmPassword" placeholder="Re-type Password" value={formData.confirmPassword} onChange={handleChange} className="signup-input" required />
            <div className="signup-role-buttons">
              {["Buyer", "Seller", "Admin"].map((role) => (
                <button key={role} type="button" className={`signup-role-button ${formData.role === role ? "selected" : ""}`} onClick={() => handleRoleChange(role)}>
                  {role}
                </button>
              ))}
            </div>
            <button type="submit" className={`signup-submit-button ${submitted ? "submitted" : ""}`}>Submit</button>
          </form>
        </div>
      </div>

  );
};

export default Signup;
