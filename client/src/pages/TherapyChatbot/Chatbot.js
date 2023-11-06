import React, { useState, useEffect } from "react";
import { ElizaBot } from "./Mia/Elizabot.js";
import { Sentimood } from "./Mia/Sentimood.js";
import { VscDebugRestart } from "react-icons/vsc";
import { AiOutlineFontSize, AiOutlineSend } from "react-icons/ai";
import "./Chatbot.css";

const Chatbot = ({ mode }) => {

  let eliza = new ElizaBot();
  let sentiment = new Sentimood();

  const displayCols = 60;
  const displayRows = 20;
  let userSentiment = 0;

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

  const updateImage = (val) => {
    // If continuing on the same sentiment
    if (val * userSentiment >= 0) {
      if (val < 0) {
        userSentiment -= 1;
      }
      if (val > 0) {
        userSentiment += 1;
      }
    } else {
      // Switch moods
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
  };

  const elizaReset = (e) => {
    userSentiment = 0;
    eliza.reset();
    const elizaLinesCopy = [...elizaLines];
    elizaLinesCopy.length = 0;
    setElizaLines(elizaLinesCopy);
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
      if (window.confirm("This session is over.\nStart over?")) elizaReset(e);
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
      for (let i = updatedElizaLines.length - 1; i >= 0; i--) {
        l += 1 + Math.floor(updatedElizaLines[i].length / displayCols);
        if (l >= displayRows) break;
        else temp.push(updatedElizaLines[i]);
      }

      setElizaLines(temp.reverse());
      f.e_display.value = temp.join("\n");
    } else if (elizaLines.length === 0) {
      let initial = "ELIZA: " + eliza.getInitial();
      setElizaLines([initial]);
      f.e_display.value = initial + "\n";
    }
    f.e_input.value = "";
    f.e_input.focus();
  };
  const [eDisplay, setEDisplay] = useState("");
  const [eInput, setEInput] = useState("");

  return (
    <div className={`chatbotcontainer-${mode}`}>
      <p>COMING SOON!!</p>
    </div>
  );
}
export default Chatbot;
