import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import VideoCam from './components/VideoCam';
import Registration from "./Bages/Registration";
import Login from "./Bages/Login";
import User_guide from "./Bages/User_guide";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={< Registration />} />
        <Route path="/Login" element={< Login />} />
        <Route path="/User_guide" element={< User_guide />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App