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
  const [userSentiment, setUserSentiment] = useState(0);


  const [eDisplay, setEDisplay] = useState('');
  const [eInput, setEInput] = useState('');
  const [elizaLines, setElizaLines] = useState([]);
  let savedMessages;
  let savedMessagesArray = [];

  useEffect(() => {
    savedMessages = localStorage.getItem(savedMessagesArray);
    console.log("ffff  ", savedMessages);
    if (savedMessages != null || savedMessages != undefined) {
      setElizaLines(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    if (elizaLines.length > 0) {
      savedMessagesArray.concat(JSON.stringify(elizaLines));
      localStorage.setItem('elizaChatMessages', JSON.stringify(elizaLines));
    }
  }, [elizaLines]);

  const imgs = {
     "0" : "./MiaImages/default-01.png",
     "1": "./MiaImages/happy1-01.png",
     "2": "./MiaImages/happy2-01.png",
     "3": "./MiaImages/happy3-01.png",
    "-1" : "./MiaImages/sad1-01.png",
    "-2": "./MiaImages/sad2-01.png",
    "-3": "./MiaImages/sad3-01.png",
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
    // console.log(val);
    document.getElementById("main-image").src = imgs[userSentiment];
    console.log(userSentiment);
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
    let f = document.forms.e_form;
    let userinput = f.e_input.value;

    let usr;
    let rpl;
    let updatedElizaLines;
    setElizaLines(updatedElizaLines);
    console.log (sentiment.analyze(userinput)["score"]);
    updateImage(sentiment.analyze(userinput)["score"]);

    if (eliza.quit) {
      f.e_input.value = "";
      if (window.confirm("This session is over.\nStart over?")) elizaReset(e);
      f.e_input.focus();
      return;
    }
    else if (userinput !== "") {
      console.log(userinput);
      usr = "YOU: " + userinput;
      // console.log(eliza.getFinal("sad"));
      rpl = "ELIZA: " + eliza.transform(userinput);
      // console.log (eliza.transform("no"));
      // eliza.random-choice-disable;
      var originalEliza = new ElizaBot(true);
      updatedElizaLines = [...elizaLines, usr, rpl];

      elizaLines.push(usr);
      elizaLines.push(rpl);
      // Display nicely
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
      {/* <button onClick={elizaReset}>Reset</button> */}
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
                onChange={(e) => setEInput(e.target.value)
                }


              />
              <AiOutlineSend type="submit" onClick={elizaStep} style={{ color: 'lightblue', fontSize: '4vh', justifyContent: "normal", margin: "7px" }}></AiOutlineSend>

            </div>
          </form>
        </div>
      </div>
    </div >
  );
}
export default Chatbot;