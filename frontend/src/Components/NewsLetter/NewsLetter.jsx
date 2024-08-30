import React, { useState } from "react";
import "./NewsLetter.css";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
    } else {
      // Call API or perform submission logic here
      setSuccess(true);
    }
  };

  return (
    <div className="newsletter">
      <h1>Get Exclusive Offers In Your Email</h1>
      <p>Subscribe and stay updated</p>
      <form className="newsletter-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Your Email ID"
          aria-label="Email Address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button type="submit">Subscribe</button>
        {success && <div style={{ color: "green" }}>Thank you for subscribing!</div>}
      </form>
    </div>
  );
};

export default NewsLetter;