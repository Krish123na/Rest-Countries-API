import { useState } from "react"
import Header from "./components/Header"
import './App.css'
import { Outlet } from "react-router"
import { ThemeContext } from "./contexts/ThemeContext"

 const App = () => {
   const [isDark, setisDark]= useState(JSON.parse(localStorage.getItem('isDarkMode')))
    
   return (
     <ThemeContext.Provider value={[isDark, setisDark]}>
     <Header  />
     <Outlet />
     </ThemeContext.Provider>
   )
}

export default App