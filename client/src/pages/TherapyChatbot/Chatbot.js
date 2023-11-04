import React, { useState } from "react";
import { ElizaBot } from "./Mia/Elizabot.js";
import { Sentimood } from "./Mia/Sentimood.js";
import { VscDebugRestart } from "react-icons/vsc";
import { AiFillCaretRight } from "react-icons/ai";
import "./Chatbot.css";

const Chatbot = ({ mode }) => {
  let eliza = new ElizaBot();
  let elizaLines = [];
  let sentiment = new Sentimood();

  let displayCols = 60;
  let displayRows = 20;

  let userSentiment = 0;

  //try


  <img
    className={`sankalp-logo`}
    src={"./images/sankalpLogo.png"}
    alt="Sankalp Logo"
  />;
  let imgs = {};
  imgs[0] = "./MiaImages/default-01.png";
  imgs[1] = "./MiaImages/happy1-01.png";
  imgs[2] = "./MiaImages/happy2-01.png";
  imgs[3] = "./MiaImages/happy3-01.png";
  imgs[-1] = "./MiaImages/sad1-01.png";
  imgs[-2] = "./MiaImages/sad2-01.png";
  imgs[-3] = "./MiaImages/sad3-01.png";

  function updateImage(val) {
    // If continuing on same sentiment
    if (val * userSentiment >= 0) {
      if (val < 0) {
        userSentiment -= 1;
      }
      if (val > 0) {
        userSentiment += 1;
      }
    } else {
      // switch moods
      userSentiment = val;
    }

    if (userSentiment < -3) {
      userSentiment = -3;
    }
    if (userSentiment > 3) {
      userSentiment = 3;
    }

    // Update image
    document.getElementById("main-image").src = imgs[userSentiment];
  }

  const elizaReset = (e) => {
    userSentiment = 0;
    eliza.reset();
    elizaLines.length = 0;
    elizaStep(e); // Pass the event object
  };

  const elizaStep = (e) => {
    e.preventDefault();
    let f = document.forms.e_form;
    let userinput = f.e_input.value;

    //console.log(sentiment.analyze(userinput));
    updateImage(sentiment.analyze(userinput)["score"]);

    if (eliza.quit) {
      f.e_input.value = "";
      if (window.confirm("This session is over.\nStart over?")) elizaReset();
      f.e_input.focus();
      return;
    } else if (userinput !== "") {
      let usr = "YOU:   " + userinput;
      let rpl = "ELIZA: " + eliza.transform(userinput);
      elizaLines.push(usr);
      elizaLines.push(rpl);
      // display nicely
      // (fit to textarea with last line free - reserved for extra line caused by word wrap)
      let temp = [];
      let l = 0;
      for (let i = elizaLines.length - 1; i >= 0; i--) {
        l += 1 + Math.floor(elizaLines[i].length / displayCols);
        if (l >= displayRows) break;
        else temp.push(elizaLines[i]);
      }
      elizaLines = temp.reverse();
      f.e_display.value = elizaLines.join("\n");
    } else if (elizaLines.length === 0) {
      // no input and no saved lines -> output initial
      let initial = "ELIZA: " + eliza.getInitial();
      elizaLines.push(initial);
      f.e_display.value = initial + "\n";
    }
    f.e_input.value = "";
    f.e_input.focus();
  };
  const [eDisplay, setEDisplay] = useState("");
  const [eInput, setEInput] = useState("");


  return (
    <div className={`chatbot-container-${mode}`}>

      <div className={`chatbot-left-${mode}`}>

        <div className="chatbot-header">
          A better approach is to place a regular submit button outside the input, then style things to make it look like the button is inside. That will also preserve accessibility (e.g. blind users will be able to use your website), and pressing Enter will submit your form automatically across all browsers. See the below code, or check out this jsFiddle for a working proof-of-concept.
        </div>
        <div className={`chatbot-image-${mode}`}>
          <img
            id="main-image"
            src={"./MiaImages/default-01.png"}
            alt="Mia"
          />
        </div>
      </div>
      <div className={`chatbot-body-${mode}`}>
        <div className={`chatbot-chat-${mode}`}>
          <form name="e_form" onSubmit={elizaStep}>
            <textarea
              name="e_display"
              id="e_display"
              value={eDisplay}
              onChange={(e) => setEDisplay(e.target.value)}
              readOnly
            ></textarea>
            <div className="input-container">
              <input
                type="text"
                name="e_input"
                id="e_input"
                value={eInput}
                onChange={(e) => setEInput(e.target.value)}
              />
              <button type="submit">Send</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Chatbot;
