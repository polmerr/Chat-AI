import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import Page from "./Components/Page/Page";
import { useState } from "react";

//note: to use fontawesome icons, import both fontawesome icon element and icon

function App() {
  const [displaySide, setDisplaySide] = useState(true);

  return (
    <>
      <Sidebar displaySide={displaySide} setDisplaySide={setDisplaySide} />
      <Page displaySide={displaySide} />
    </>
  );
}

export default App;
