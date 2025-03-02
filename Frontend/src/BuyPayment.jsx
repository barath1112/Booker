import  { useState } from "react";
import "./css/Buynow.css"; // Updated CSS file name
import Navbar from "./Navbar";

function BuyPayment() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        property: "",
        amount: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
    });

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePayment = (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        // Basic Validation
        if (!formData.name || !formData.email || !formData.cardNumber || !formData.amount) {
            setError("All fields are required!");
            return;
        }

        if (!/^\d{16}$/.test(formData.cardNumber)) {
            setError("Invalid card number. Must be 16 digits.");
            return;
        }

        setSuccessMessage("Payment Successful! Thank you for your purchase.");
    };

    return (
        <><Navbar/>
        <div className="buy-container">
            <div className="buy-payment-box">
                <h2>🏡 Booker Estate Payment</h2>
                {error && <p className="buy-error">{error}</p>}
                {successMessage && <p className="buy-success">{successMessage}</p>}

                <form onSubmit={handlePayment}>
                    <input type="text" name="name" className="buy-input" placeholder="Full Name" onChange={handleChange} required />
                    <input type="email" name="email" className="buy-input" placeholder="Email Address" onChange={handleChange} required />
                    <input type="tel" name="phone" className="buy-input" placeholder="Phone Number" onChange={handleChange} required />

                    <input type="text" name="property" className="buy-input" placeholder="Property Name / ID" onChange={handleChange} required />
                    <input type="number" name="amount" className="buy-input" placeholder="Amount (₹)" onChange={handleChange} required />

                    <input type="text" name="cardNumber" className="buy-input" placeholder="Card Number" onChange={handleChange} required />
                    <div className="buy-card-details">
                        <input type="text" name="expiry" className="buy-input-small" placeholder="MM/YY" onChange={handleChange} required />
                        <input type="password" name="cvv" className="buy-input-small" placeholder="CVV" onChange={handleChange} required />
                    </div>

                    <button type="submit" className="buy-btn">Pay Now</button>
                </form>
            </div>
        </div></>
    );
}

export default BuyPayment;
