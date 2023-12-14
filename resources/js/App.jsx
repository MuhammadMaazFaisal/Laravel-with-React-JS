import "./App.css";
import Footer from "./layouts/Footer";
import Navbar from "./layouts/Navbar";
import Sidebar from "./layouts/Sidebar";
import Home from "./website/Home";
import EditProduct from "./website/EditProduct";
import About from "./website/About";
import { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// rfc for react functional component

function App() {
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

    return (
        <>
            <div className="row mx-0 max-view-height">
                <div className="sidebar px-0 col-2 max-view-height">
                    <Sidebar />
                </div>
                <div className="col-10 max-view-height">
                    <Navbar
                        title="React App"
                        tab1="Home"
                        onSearch={handleSearch}
                        search={search}
                        setSearch={setSearch}
                    />
                    <Routes>
                        <Route
                            exact
                            path="/"
                            element={<Home searchResults={searchResults} />}
                        />
                        <Route exact path="/about" element={<About />} />
                        <Route
                            exact
                            path="/products/edit/:id"
                            element={<EditProduct />}
                        />
                    </Routes>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default App;
