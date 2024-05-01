import React, { useContext, useState } from "react";
import Indari from "../../assets/indari.png";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import "./Page.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCat,
  faFish,
  faGamepad,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { Context } from "../../context/Context";

const Page = ({ displaySide }) => {
  const {
    input,
    setInput,
    showResult,
    onSent,
    resultAnswer,
    loading,
    setShowResult,
    setLoading,
  } = useContext(Context);

  const [validInput, setValidInput] = useState(true);
  return (
    <>
      <div className={displaySide ? "page display" : "page no-display"}>
        <p
          className="home"
          onClick={() => {
            setShowResult(false);
            setLoading(false);
          }}
        >
          j
        </p>
        {!showResult ? (
          <>
            <div className="title">
              <FontAwesomeIcon className="cat" icon={faCat} />
              <h1>
                {!showResult ? "Hello there, how can I help today?" : null}
              </h1>
            </div>
            <div className="bottom">
              <div className="suggestionsCard">
                <div className="suggestion">
                  <h1>What kinds of fish do cats love?</h1>
                  <FontAwesomeIcon className="suggest-icon" icon={faFish} />
                </div>
                <div className="suggestion">
                  <h1>What time do cats like to sleep?</h1>
                  <FontAwesomeIcon className="suggest-icon" icon={faMoon} />
                </div>
                <div className="suggestion">
                  <h1>How do you tame a cat in minecraft?</h1>
                  <FontAwesomeIcon className="suggest-icon" icon={faGamepad} />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {loading ? (
              <>
                <div className="title">
                  <FontAwesomeIcon className="cat" icon={faCat} />
                  <h1>
                    {!showResult ? "Hello there, how can I help today?" : null}
                  </h1>
                </div>
                <div className="loader">
                  <p className="loadChar a1">d</p>
                  <p className="loadChar a2">e</p>
                  <p className="loadChar a3">f</p>
                  <p className="loadText">Loading</p>
                </div>
              </>
            ) : (
              <div className="result-box">
                <p dangerouslySetInnerHTML={{ __html: resultAnswer }}></p>
              </div>
            )}
          </>
        )}
        <div className={validInput ? "input-card" : "input-card invalid"}>
          <div className="input-box">
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setValidInput(true);
              }}
              placeholder={
                validInput
                  ? "Ask me something..."
                  : "You need to ask a question..."
              }
            />
            <div
              onClick={() => {
                input ? onSent(input) : setValidInput(false);
              }}
            >
              <FontAwesomeIcon className="submit" icon={faMessage} />
              <p>Ask me</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
