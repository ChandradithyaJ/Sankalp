import React, { useState } from 'react';
import './ContactFormStyle.css'; // Import your CSS file for styling

function ContactForm({ mode }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
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
    // Handle form submission logic here (e.g., sending the data to a server)
    console.log(formData); // Replace with your actual submission code

    // Clear form fields after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  return (
    <div className="containerForm">
      <div className={`contact-box-${mode}`}>
        <div className="left"></div>
        <div className="right">
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="field"
              placeholder="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="text"
              className="field"
              placeholder="Your Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              className="field"
              placeholder="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
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
