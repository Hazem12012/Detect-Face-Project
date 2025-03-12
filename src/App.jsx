import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import Login from "./Bages/Login";
import Registration from "./Bages/Registration";
import User_guide from "./Bages/User_guide";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SplashScreen from "./Bages/SplashScreen";


function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    showSplash ? (<SplashScreen onFinish={() => { setShowSplash(false) }} />) :
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={< Registration />} />
          <Route path="/login" element={< Login />} />
          <Route path="/User_guide" element={< User_guide />} />
        </Routes>
        <Footer />
      </BrowserRouter>
  )
}

export default App