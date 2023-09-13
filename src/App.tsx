import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Planing, Login, Chat } from './pages';
import './App.css';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Planing />,
    },
    {
      path: "/login",
      element: <Login />,
    },    
    {
      path: "/chat",
      element: <Chat />,
    },     
  ]);  
  return (
    <div style={{backgroundColor:'#121212',width:'100%',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
