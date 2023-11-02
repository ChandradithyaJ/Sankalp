import React, { useState } from "react";
import { ElizaBot } from "./Mia/Elizabot.js";
import { Sentimood } from "./Mia/Sentimood.js";
import "./Chatbot.css";
const Chatbot = ({ mode }) => {
  let eliza = new ElizaBot();
  let elizaLines = [];
  let sentiment = new Sentimood();

  let displayCols = 60;
  let displayRows = 20;

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
    <div className={`chatbotcontainer-${mode}`}>
      {/* <p>COMING SOON!!</p> */}

      <center>
        <h3 className="MiaHeading">Eliza+</h3>
        <img
          id="main-image"
          src="./MiaImages/default-01.png"
          width="300px"
          height="300px"
          alt=""
        />
        <form
          name="e_form"
          onSubmit={(e) => {
            e.preventDefault(); // Prevent the default form submission behavior
            elizaStep(e);
          }}
        >
          <div>
            <textarea
              className="form-control"
              name="e_display"
              cols="60"
              rows="20"
              value={eDisplay}
              readOnly
            ></textarea>
          </div>
          <div style={{ textAlign: "center" }}>
            <input
              className="form-control"
              type="text"
              name="e_input"
              size="43"
              value={eInput}
              onChange={(e) => setEInput(e.target.value)}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <input className="btn btn-default" type="submit" value="Talk" />
            <input
              className="btn btn-default"
              type="reset"
              value="Reset"
              onClick={(e) => {
                e.preventDefault(); // Prevent the default behavior of the reset button
                window.setTimeout(() => elizaReset(e), 100);
              }}
            />
          </div>
        </form>
      </center>
    </div>
  );
};

export default Chatbot;
