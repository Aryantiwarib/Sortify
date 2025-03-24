// import React from "react";
// import Header from "./components/Header/header";
// import { BrowserRouter as Router } from "react-router-dom";
// import Footer from "./components/Fotter/fotter";
// import Home from "./components/Home/home";


// function App() {
//   return (
//     <Router>
//       <Header />
//       <Home />
//       <Footer />
//     </Router>

//   );
// }

// export default App;





import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Fotter, Header } from './components/index'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Fotter />
      </div>
    </div>
  ) : null
}

export default App