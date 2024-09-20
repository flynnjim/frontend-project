import './App.css'
import Header from './components/Header'
import Nav from './components/Nav'

import Articles from "./components/Articles";
import ArticleSingleCard from './components/ArticleSingleCard';
import Categories from './components/Categories'
import NotFoundPage from './components/NotFoundPage';

import { Route, Routes, Navigate } from "react-router-dom";

// const colorPalette = ['#C9DABF', '#9CA986', '#808D7C', '#5F6F65']
// const colorPalette2 = ['#F5EEE6', '#FFF8E3', '#F3D7CA', '#E6A4B4']

function App() {

  return (
    <>
      <Header/>
      <Nav/>
      <Routes>
      <Route path="*" element={<NotFoundPage/>} />
        <Route path='/articles' element ={<><Categories/><Articles/></>}/>
        <Route
          path='articles/:article_id'
          element={<><Categories/><ArticleSingleCard/></>}
        />
        <Route
          path="/categories/:category"
          element={
            <><Categories/><Articles/></>
          }
        />
      </Routes>
    </>
  )
}

export default App
