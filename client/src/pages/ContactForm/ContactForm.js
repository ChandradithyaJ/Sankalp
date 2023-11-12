import React, { useState, useEffect } from "react";
import Loading from "../../components/Loading/Loading";
import serverAPI from "../../api/serverAPI";
import "./ContactFormStyle.css";

// Toast Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ContactForm({ mode, lang }) {
  const [Contact, setContact] = useState("Contact Us")
  const [Message, setMessage] = useState("Message")
  const [Send, setSend] = useState("Send")
  const [successText, setSuccessText] = useState("Your message has been sent successfully! Thank you for contacting us! We will get back to you soon!")
  const [warningText, setWarningText] = useState("Please write a message before clicking on send")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const translate = async () => {

      // store the originals to send as the body of the request
      const translationDetails = {
        to: lang,
        contact: Contact,
        message: Message,
        send: Send,
        successText: successText,
        warningText: warningText
      }

      if (lang !== 'en') {
        try {
          const response = await serverAPI.post('/translate', translationDetails)
          if (response && response.data) {
            setContact(response.data.contact)
            setMessage(response.data.message)
            setSend(response.data.send)
            setSuccessText(response.data.successText)
            setWarningText(response.data.warningText)
          }
        } catch (err) {
          setIsLoading(false)
          toast.error(`Unable to load the app. Please check your internet connection and try again.`, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
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

    if (formData.message == "") {
      toast.warn(`${warningText} 😊`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return
    }

    // clear form fields after submission
    setFormData({
      message: "",
    });

    toast.success(`${successText} 😊`, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <>
      {
        isLoading && <Loading />
      }
      {
        !isLoading &&
        <div className="containerForm">
          <div
            style={{
              marginBottom: "50vh"
            }}
          >
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
          </div>
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
