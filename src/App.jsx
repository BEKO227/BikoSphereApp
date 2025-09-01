import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import Layout from './Components/Layout/Layout.jsx'
import Login from './Pages/Login/Login.jsx'
import Register from './Pages/Register/Register.jsx'
import Notfound from './Components/Notfound/Notfound';
import Home from './Pages/Home/Home';
import PostDetails from './Pages/PostDetials/PostDetails.jsx';
import { UserContextProvider } from './Context/UserContext';
import EditProfile from './Pages/EditProfile/EditProfile.jsx';
import Profile from './Pages/Profile/Profile.jsx';
import { ProtectedRouting } from './ProtectedRouting/ProtectedRouting.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'flowbite';
import 'flowbite-react';
import'react-icons';



export default function App() {

  let Routes = createBrowserRouter([
    {path: '/', element: <Layout />, children:[
      {index: true, element: <ProtectedRouting><Home/></ProtectedRouting>},
      {path:'/Login', element: <Login/>},
      {path:'/EditProfile', element: <ProtectedRouting><EditProfile/></ProtectedRouting>},
      {path:'/Profile', element: <ProtectedRouting><Profile/></ProtectedRouting>},
      {path:'/PostDetails/:id', element: <ProtectedRouting><PostDetails/></ProtectedRouting>},
      {path: '/Register', element: <Register/>},
      {path:'*', element: <Notfound/>},

    ]},
  ])
  return (
    <div>
      <UserContextProvider>
      <RouterProvider router={Routes} />  
      <Toaster/>
      </UserContextProvider>
    </div>
  )
  
}
