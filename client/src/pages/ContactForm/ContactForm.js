import React, { useState } from 'react';
import './ContactFormStyle.css'; // Import your CSS file for styling

function ContactForm({ mode }) {
  const [formData, setFormData] = useState({
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
      message: '',
    });
    alert('Your message has been sent successfully! We will get back to you soon.')
  };

  return (
    <div className="containerForm">
      <div className={`contact-box-${mode}`}>
        <div className="left"></div>
        <div className="right">
          <h2>Contact Us</h2>
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
