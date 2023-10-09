import React, { useState } from "react";
import "./ContactFormStyle.css"; 

function ContactForm({ mode }) {
  const [formData, setFormData] = useState({
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic TODO
    console.log(formData); 
    // Clear form fields after submission TODO
    setFormData({
      message: "",
    });
    alert(
      "Your message has been sent successfully! We will get back to you soon."
    );
  };

  return (
    <div className="containerForm">
      <div className={`contact-box-${mode}`}>
        <div className="left"></div>
        <div className="right">
          <h2 style={{ color: "black" }}>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="Message"
              className="field"
              name="message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <button type="submit" className={`btn-${mode}`}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
