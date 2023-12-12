import "./App.css";
import Footer from "./layouts/Footer";
import Navbar from "./layouts/Navbar";
import Sidebar from "./layouts/Sidebar";
import Home from "./website/Home";
import About from "./website/About";
import { useState } from "react";
import axios from "axios";
// rfc for react functional component

function App() {
    const [currentTab, setCurrentTab] = useState("Home");
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const handleSearch = (e) => {
        try {
            const response = axios
                .get("/api/search", {
                    params: {
                        search: search,
                    },
                })
                .then((response) => {
                    console.log(response.data); 
                    setSearchResults(response.data);
                });
        } catch (error) {
            console.log(error);
        }
    };

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
                    <Navbar
                        title="React App"
                        tab1="Home"
                        onSearch={handleSearch}
                        search={search}
                        setSearch={setSearch}
                    />
                    <CurrentTab />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default App;
