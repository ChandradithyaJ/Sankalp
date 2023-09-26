import React, { useState, useEffect } from 'react';
import './ContactForm.css'; // Import CSS for styling

function ContactForm() {
  const [envelopeClicked, setEnvelopeClicked] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const handleEnvelopeClick = () => {
    if (!envelopeClicked && !messageSent) {
      // Animate the envelope when it's clicked
      const topWrap = document.querySelector('.top-wrap');
      topWrap.style.transition = 'transform 0.5s';
      topWrap.style.transform = 'rotateX(180deg)';

      const letterWrap = document.querySelector('.letter-wrap');
      setTimeout(() => {
        letterWrap.style.transition = 'height 0.5s, top 0.5s';
        letterWrap.style.height = '520px';
        letterWrap.style.top = '-500px';
      }, 500);

      setTimeout(() => {
        letterWrap.style.zIndex = '999';
      }, 1500);

      const envelope = document.querySelector('.envelope');
      setTimeout(() => {
        envelope.style.transition = 'top 0.5s';
        envelope.style.top = '50px';
      }, 500);

      setEnvelopeClicked(true);
    }
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    setMessageSent(true);
  
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  useEffect(() => {
    if (messageSent) {
      // Handle animations or other effects after message is sent
      const letterWrap = document.querySelector('.letter-wrap');
      letterWrap.style.transition = 'none'; // Disable transition temporarily
      letterWrap.style.height = '0px';
      letterWrap.style.top = '0px';
      setTimeout(() => {
        letterWrap.style.transition = ''; // Re-enable transition
      }, 100); // Add a small delay before re-enabling the transition
    }
  }, [messageSent]);

  useEffect(() => {
    // Attach event listener
    const envelopeElement = document.querySelector('.envelope');
    envelopeElement.addEventListener('click', handleEnvelopeClick);

    // Remove event listener on unmount
    return () => {
      envelopeElement.removeEventListener('click', handleEnvelopeClick);
    };
  }, []);

  return (
    <div className={`container ${messageSent ? 'sent' : ''}`}>
      <div className={`envelope ${envelopeClicked ? 'open' : ''}`} onClick={handleEnvelopeClick}>
        <div className="back"></div>
        <div className="letter-wrap">
          {messageSent ? (
           <div className={`notification ${messageSent ? 'show' : ''}`}>
           Your Message Was Sent Successfully Thanks!
       
         </div>
         
         
          )  : (
            <form className="letter" onSubmit={handleMessageSubmit}>
              <p>
                <label>Name:</label>
                <input type="text" name="name" />
              </p>
              <p>
                <label>Email:</label>
                <input type="email" name="email" />
              </p>
              <p>
                <label>Message:</label>
                <textarea></textarea>
              </p>
              <input className="send" type="submit" value="Send" />
            </form>
          )}
        </div>
        <div className="front">
          <div className="inner">
            <div className="triangle left"></div>
            <div className="triangle right"></div>
            <div className="rounded"></div>
            <div className="bottom"></div>
          </div>
        </div>
        <div className="cover">
          <div className="top-wrap backface">
            <div className="inner">
              <div className="top-center"></div>
              <div className="top"></div>
            </div>
          </div>
          <div className="top-wrap frontface">
            <div className="inner">
              <div className="top-center"></div>
              <div className="top"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
