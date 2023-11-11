import React, { useState, useEffect } from "react";
import { ElizaBot } from "./Mia/Elizabot.js";
import { Sentimood } from "./Mia/Sentimood.js";
import { AiOutlineSend } from "react-icons/ai";
import "./Chatbot.css";

const Chatbot = ({ mode }) => {
  let eliza = new ElizaBot();
  let sentiment = new Sentimood();

  const displayCols = 60;
  const displayRows = 20;
  const [userSentiment, setUserSentiment] = useState(0);

  const [eDisplay, setEDisplay] = useState("ELIZA: Hey!");
  const [eInput, setEInput] = useState("");
  const [elizaLines, setElizaLines] = useState([]);
  let savedMessages;
  let savedMessagesArray = [];

  useEffect(() => {
    savedMessages = localStorage.getItem(savedMessagesArray);
    if (savedMessages != null || savedMessages != undefined) {
      // dont add one more equal to sign before undefined
      //it will give some length error
      setElizaLines(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    if (elizaLines.length > 0) {
      savedMessagesArray.concat(JSON.stringify(elizaLines));
      localStorage.setItem("elizaChatMessages", JSON.stringify(elizaLines));
    }
  }, [elizaLines]);

  const imgs = {
    0: "./MiaImages/MiaDefault.png",
    1: "./MiaImages/MiaHappy1.png",
    2: "./MiaImages/MiaHappy2.png",
    3: "./MiaImages/MiaHappy3.png",
    "-1": "./MiaImages/MiaSad1.png",
    "-2": "./MiaImages/MiaSad2.png",
    "-3": "./MiaImages/MiaSad3.png",
  };
  const updateImage = (val) => {
    if (val * userSentiment >= 0) {
      setUserSentiment((prevSentiment) => prevSentiment + val);
    } else {
      setUserSentiment(val);
    }

    // Ensure userSentiment is within the range -3 to 3
    setUserSentiment((prevSentiment) =>
      Math.min(3, Math.max(-3, prevSentiment))
    );

    // Update image
    document.getElementById("main-image").src = imgs[userSentiment];
  };

  const elizaReset = (e) => {
    // userSentiment = 0;
    eliza.reset();
    const elizaLinesCopy = [...elizaLines];
    elizaLinesCopy.length = 0;
    setElizaLines(elizaLinesCopy);
    elizaStep(e); // Pass the event object
  };

  const elizaStep = (e) => {
    e.preventDefault();

    if (eInput.length === 0) return;

    let f = document.forms.e_form;
    let userinput = f.e_input.value;

    let usr;
    let rpl;
    let updatedElizaLines;
    setElizaLines(updatedElizaLines);
    updateImage(sentiment.analyze(userinput)["score"]);

    if (eliza.quit) {
      f.e_input.value = "";
      if (window.confirm("This session is over.\nStart over?")) elizaReset(e);
      f.e_input.focus();
      return;
    } else if (userinput !== "") {
      usr = "YOU: " + userinput;
      rpl = "ELIZA: " + eliza.transform(userinput);
      var originalEliza = new ElizaBot(true);
      updatedElizaLines = [...elizaLines, usr, rpl];

      elizaLines.push(usr);
      elizaLines.push(rpl);

      let temp = [];
      let l = 0;
      for (let i = updatedElizaLines.length - 1; i >= 0; i--) {
        l += 1 + Math.floor(updatedElizaLines[i].length / displayCols);
        if (l >= displayRows) break;
        else temp.push(updatedElizaLines[i]);
      }

      setElizaLines(temp.reverse());
      f.e_display.value = temp.join("\n");
    } else if (elizaLines.length == 0) {
      let initial = "ELIZA: " + eliza.getInitial();
      setElizaLines([initial]);
      f.e_display.value = initial + "\n";
    }
    f.e_input.value = "";
    f.e_input.focus();
    setEInput("");
  };

  return (
    <div className={`chatbot-container-${mode}`}>
      <div className={`chatbot-left-${mode}`}>
        <div className={`chatbot-image-${mode}`}>
          <img id="main-image" src={"./MiaImages/MiaDefault.png"} alt="Mia" />
          <h3>Mia</h3>
        </div>
      </div>
      <div className={`chatbot-body-${mode}`}>
        <div className={`chatbot-chat-${mode}`}>
          <form name="e_form" onSubmit={elizaStep}>
            <textarea
              name="e_display"
              id="e_display"
              value={elizaLines?.join("\n")}
              onChange={(e) => setEDisplay(e.target.value)}
              readOnly
            ></textarea>
            <br />
            <div className="input-container">
              <input
                type="text"
                name="e_input"
                id="e_input"
                value={eInput}
                placeholder="Enter your message here"
                onChange={(e) => setEInput(e.target.value)}
              />
              <AiOutlineSend
                type="submit"
                onClick={elizaStep}
                className={`input-container-svg-${mode}`}
              ></AiOutlineSend>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Chatbot;
