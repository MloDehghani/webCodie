import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import { Planing, Login, Chat, JustGoogleLogin } from './pages';
import './App.css';
import Register from "./pages/Register";
import { useEffect, useState } from "react";

import Welcome from "./pages/Welcome";


function App() {
  const [boxWidth,setBoxWidth] = useState(window.innerWidth);
  const [boxHeight,setBoxHeight] = useState(window.innerHeight);  
  const router = createHashRouter([
    {
      path: "/",
      element: <Welcome />,
    },
    {
      path: "/plan",
      element: <Planing/> ,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register/>
    },    
    {
      path: "/chat",
      element: <Chat />,
    },
    {
      path: "/googleLogin",
      element: <JustGoogleLogin />,
    },          
  ]);  
  const handleResize =() => {
    setBoxWidth(window.innerWidth)
    setBoxHeight(window.innerHeight)
  }
  useEffect(() => {
    setBoxWidth(window.innerWidth)
    setBoxHeight(window.innerHeight)
    window.addEventListener("resize", handleResize, false);
  }, []);     
  return (
    <div style={{backgroundColor:'#121212',marginTop:boxWidth < 600?'-95px':'0px',overflow:'hidden',width:boxWidth,height:boxHeight,display:'flex',justifyContent:'center',alignItems:'center'}}>
      <RouterProvider  router={router}/>
    </div>
  )
}

export default App
