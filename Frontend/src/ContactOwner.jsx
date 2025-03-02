import { useState } from "react";
import "./css/ContactOwner.css"; 
import Alert from "./Alert";
import emailjs from "@emailjs/browser";

const ContactOwner = ({ ownerEmail }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [alert, setAlert] = useState({ message: "", type: "" });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to send email using EmailJS
  const sendEmail = async () => {
    const serviceId = "service_v0nkvd7"; // Your EmailJS Service ID
    const templateId = "template_5h6jfdv"; // Your EmailJS Template ID
    const userId = "41d6u_bh8AIt5_C_0"; // Your EmailJS Public Key

    const templateParams = {
      from_name: formData.name, // Buyer's Name
      from_email: formData.email, // Buyer's Email
      to_email: ownerEmail, // Owner's Email (passed as prop)
      message: formData.message, // Message Content
    };

    try {
      const response = await emailjs.send(serviceId, templateId, templateParams, userId);
      console.log("Email sent successfully!", response.status, response.text);
      setAlert({ message: "Message sent successfully to the owner!", type: "success" });
      setFormData({ name: "", email: "", message: "" }); // Reset form
    } catch (error) {
      console.error("Error sending email:", error);
      setAlert({ message: "Failed to send message. Please try again.", type: "error" });
    }
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setAlert({ message: "All fields are required!", type: "error" });
      return;
    }

    sendEmail(); // Send email when form is valid
  };

  return (
    <div className="contact-owner">
      <h3>Contact Owner</h3>
      <Alert message={alert.message} type={alert.type} onClose={() => setAlert({ message: "", type: "" })} />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Write your message here..."
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactOwner;
