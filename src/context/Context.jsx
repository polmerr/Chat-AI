import { createContext, useEffect, useState } from "react";
import run from "../config/gemini";
import data from "../Data/data";

const initialArchive = ["What is google?"];

const getInitialState = () => {
  const arch = localStorage.getItem("archiveData");
  return arch ? JSON.parse(arch) : initialArchive;
};

export const Context = createContext();

const ContextProvider = (props) => {
  const [showResult, setShowResult] = useState(false);
  const [input, setInput] = useState("");
  const [recentPrompts, setRecentPrompts] = useState([]);
  const [resultAnswer, setResultAnswer] = useState("Use gemini response here");
  const [loading, setLoading] = useState(false);

  const [archiveData, setArchiveData] = useState(getInitialState());

  useEffect(() => {
    localStorage.setItem("archiveData", JSON.stringify(archiveData));
  }, [archiveData]);

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultAnswer((prev) => prev + nextWord);
    }, 75 * index);
  };

  const onSent = async (prompt) => {
    setInput("");
    setShowResult(true);
    setLoading(true);
    setResultAnswer("");
    if (!recentPrompts.includes(prompt)) {
      setRecentPrompts((prev) => [...prev, prompt]);
    }
    if (!archiveData.includes(prompt)) {
      setArchiveData((prev) => [...prev, prompt]);
    }

    let response;
    let responseArr = [];
    let result = "";
    response = await run(prompt);
    responseArr = response.split("**");

    for (let i = 0; i < responseArr.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        result += responseArr[i];
      } else {
        result +=
          "<br/>" +
          "<br/>" +
          "<strong style='font-size:22px'>" +
          responseArr[i] +
          "</strong>";
      }
    }
    let result2 = result.split("*").join("<br/>");
    let arr2 = result2.split(" ");
    for (let i = 0; i < arr2.length; i++) {
      delayPara(i, arr2[i] + " ");
    }

    setLoading(false);
  };

  const contextValue = {
    input,
    setInput,
    recentPrompts,
    setRecentPrompts,
    showResult,
    setShowResult,
    onSent,
    resultAnswer,
    loading,
    archiveData,
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
