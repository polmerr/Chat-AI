import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faBook,
  faEraser,
  faTrashCan,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";
import { Context } from "../../context/Context";

const Sidebar = ({ displaySide, setDisplaySide }) => {
  const { recentPrompts, setRecentPrompts, setInput, archiveData } =
    useContext(Context);
  let recentPromptsCopy = [];

  const handleErase = (eraseItem) => {
    recentPromptsCopy = recentPrompts.filter((item) => item !== eraseItem);
    setRecentPrompts(recentPromptsCopy);
  };
  const handleTrash = () => {
    setRecentPrompts([]);
  };

  const handleLoadPrompt = (prompt) => {
    setInput(prompt);
  };

  const [archive, setArchive] = useState(false);

  return (
    <div className={`sidebar + ${displaySide ? "display" : "no-display"}`}>
      <div className="top">
        <FontAwesomeIcon
          onClick={() => setDisplaySide(!displaySide)}
          icon={displaySide ? faMinus : faBars}
          className="menu icon"
        />
      </div>
      <div className={`middle + ${displaySide ? "display" : "no-display"}`}>
        <div className="recents-title">
          <FontAwesomeIcon icon={faClock} className="icon" />
          <p>Recently Asked</p>
        </div>
        <hr />
        <div className="recents">
          {recentPrompts.length > 0 ? (
            <div className="trash">
              <FontAwesomeIcon
                icon={faTrashCan}
                className="icon"
                onClick={() => handleTrash()}
              />
              <p>Trash</p>
            </div>
          ) : null}
          {recentPrompts.map((item, i) => {
            return (
              <div key={i} className="recent-item">
                <p onClick={() => handleLoadPrompt(item)}>
                  {item.slice(0, 22) + " . . ."}
                </p>
                <FontAwesomeIcon
                  icon={faEraser}
                  className="erase icon"
                  onClick={() => {
                    handleErase(item);
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="archive-title">
          <FontAwesomeIcon
            icon={faBook}
            onClick={() => setArchive((prev) => !prev)}
            className="icon book"
          />
          <p>Question Archive</p>
        </div>
        <hr />
        <div className={archive ? "archive" : "archive none"}>
          {archiveData.map((item, index) => {
            return (
              <div key={index} className="archive-item">
                <p onClick={() => handleLoadPrompt(item)}>{item}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
