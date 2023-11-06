import React, { useState, useEffect } from "react";
import Loading from "../../components/Loading/Loading";
import testingAPI from "../../api/testingAPI";
import "./ContactFormStyle.css"; 

function ContactForm({ mode, lang }) {
  const [Contact, setContact] = useState("Contact Us")
  const [Message, setMessage] = useState("Message")
  const [Send, setSend] = useState("Send")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const translate = async () => {

      // store the originals to send as the body of the request
      const translationDetails = {
        to: lang,
        contact: Contact,
        message: Message,
        send: Send
      }

      if (lang !== 'en') {
        try {
          const response = await testingAPI.post('/translate', translationDetails)
          if (response && response.data) {
            setContact(response.data.contact)
            setMessage(response.data.message)
            setSend(response.data.send)
          }
        } catch (err) {
          console.log(err)
        }
      }
      setIsLoading(false)
    }

    translate()
  }, [])

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
    <>
      {
        isLoading && <Loading />
      }
      {
        !isLoading &&
        <div className="containerForm">
          <div className={`contact-box-${mode}`}>
            <div className="left"></div>
            <div className="right">
              <h2 style={{ color: "black" }}>{Contact}</h2>
              <form onSubmit={handleSubmit}>
                <textarea
                  placeholder={`${Message}`}
                  className="field"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                <button type="submit" className={`btn-${mode}`}>
                  {Send}
                </button>
              </form>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default ContactForm;
