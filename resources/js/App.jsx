import "./App.css";
import Footer from "./layouts/Footer";
import Navbar from "./layouts/Navbar";
import Sidebar from "./layouts/Sidebar";
import Home from "./website/Home";
import About from "./website/About";
import { useState } from "react";
// rfc for react functional component

function App() {
  const [currentTab, setCurrentTab] = useState("Home");

  const CurrentTab = () => {
    if (currentTab === "Home") {
      return <Home />;
    } else if (currentTab === "About") {
      return <About />;
    }
  };

  return (
    <>
      <div className="row max-view-height">
        <div className="sidebar col-2 max-view-height">
          <Sidebar setCurrentTab={setCurrentTab} />
        </div>
        <div className="col-10 max-view-height">
          <Navbar title="React App" tab1="Home" />
          <CurrentTab />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
