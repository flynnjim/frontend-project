import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Display from "./components/Display";
import SingleArticle from "./components/SingleArticle";
import NotFoundPage from "./components/NotFoundPage";
import { useEffect, useState } from "react";
import { getTopics } from "../api";

import { Route, Routes } from "react-router-dom";

// const colorPalette = ['#C9DABF', '#9CA986', '#808D7C', '#5F6F65']
// const colorPalette2 = ['#F5EEE6', '#FFF8E3', '#F3D7CA', '#E6A4B4']

function App() {
  const [topics, setTopics] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    getTopics().then((response) => {
      setTopics(response);
    });
  }, []);

  return (
    <>
      <div className="app-container w-full">
        <Header selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        <Nav topics={topics} />
        <Routes>
          <Route path="/" element={<Display />} />
          <Route path="*" element={<NotFoundPage />} />

          <Route
            path="articles/:article_id"
            element={
              <>
                <SingleArticle selectedUser={selectedUser} />
              </>
            }
          />
          <Route
            path="/categories/:category"
            element={
              <>
                <Display />
              </>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
