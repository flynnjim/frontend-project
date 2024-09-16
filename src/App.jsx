import './App.css'
import Header from './components/Header'
import Nav from './components/Nav'
import Homepage from "./components/Homepage";
import Articles from "./components/Articles";

import { Route, Routes } from "react-router-dom";

// const colorPalette = ['#C9DABF', '#9CA986', '#808D7C', '#5F6F65']
// const colorPalette2 = ['#F5EEE6', '#FFF8E3', '#F3D7CA', '#E6A4B4']

function App() {

  return (
    <>
      <Header/>
      <Nav/>
      <Routes>
        <Route path='/homepage' element ={<Homepage/>}/>
        <Route path='/articles' element ={<Articles/>}/>
      </Routes>
    </>
  )
}

export default App
