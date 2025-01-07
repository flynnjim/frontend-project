import './App.css'
import Header from './components/Header'
import Nav from './components/Nav'

import Articles from "./components/Articles";
import ArticleSingleCard from './components/ArticleSingleCard';
import Categories from './components/Categories'
import NotFoundPage from './components/NotFoundPage';
import Trending from './components/Trending';
import { useEffect, useState } from 'react';
import { getTopics } from '../api';

import { Route, Routes, Navigate } from "react-router-dom";

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
      <Header selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
      <Nav topics={topics} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
      <Routes>
        <Route path="/" element={<Trending />} />
        <Route path="*" element={<NotFoundPage/>} />
        <Route path='/articles' element ={<><Articles/></>}/>
        <Route
          path='articles/:article_id'
          element={<><ArticleSingleCard selectedUser={selectedUser}/></>}
        />
        <Route
          path="/categories/:category"
          element={
            <><Articles/></>
          }
        />
      </Routes> 
    </>
  )
}

export default App
