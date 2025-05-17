import { useState,useEffect,createContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home';
import AboutUs from './components/Aboutus';
import SignIn from './components/Signin';
import Resultsbuy from './components/Resultsbuy'

import Resultsrent from './components/Resultsrent'
import InputPage from './components/InputPage';
import InputBuyPage from './components/InputBuyPage'



export const AuthContext = createContext();

function App() {
  const [count, setCount] = useState(0)

  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  return (
    <>
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
    <Router>
      <Navbar />
      
       
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/resultsbuy" element={<Resultsbuy/>} />
        <Route path="/resultsrent" element={<Resultsrent/>} />
        <Route path="/input" element={<InputPage/>} />
        <Route path="/input2" element={<InputBuyPage/>}/>
        
      </Routes>
    </Router>
    </AuthContext.Provider>

    
    </>
  )
}

export default App
