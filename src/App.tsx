import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
// import { EmChat } from './pages';
import './App.css';
// import Register from "./pages/Register";
import { useEffect, useState } from "react";
import { ToastContainer} from 'react-toastify';
// import Welcome from "./pages/Welcome";
import 'react-toastify/dist/ReactToastify.css';
// import './DefaultTheme.scss';
import './Themes/index.scss';
import ResumeChat2 from "./pages/ResumeChat2";

function App() {
  const [boxWidth,setBoxWidth] = useState(window.innerWidth);
  const [boxHeight,setBoxHeight] = useState(window.innerHeight);  
  const router = createHashRouter([
    {
      path: "/",
      element: <ResumeChat2/>,
    },
    // {
    //   path: "/resume",
    //   element: <ResumeChat2/>,
    // },    
    // {
    //   path: "/hotel",
    //   element: <Starting />,
    // },    
    // {
    //   path: "/plan",
    //   element: <Planing/> ,
    // },
    // {
    //   path: "/login",
    //   element: <Login />,
    // },
    // {
    //   path: "/register",
    //   element: <Register/>
    // },    
    // {
    //   path: "/chat",
    //   element: <Chat />,
    // },
    // {
    //   path: "/googleLogin",
    //   element: <JustGoogleLogin />,
    // },          
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
    <div style={{backgroundColor:'#121212',marginTop:'0px',overflow:'hidden',width:boxWidth,height:boxHeight,display:'flex',justifyContent:'center',alignItems:'center'}}>
      <RouterProvider  router={router}/>
      <ToastContainer />
    </div>
  )
}

export default App
