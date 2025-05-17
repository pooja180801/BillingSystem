import React from 'react'
import MenuBar from './components/menubar/MenuBar'
import { Routes, Route } from 'react-router-dom'
import Explore from './pages/Explore/Explore'
import ManageUsers from './pages/ManageUsers/ManageUsers'
import ManageItems from './pages/ManageItems/ManageItems'
import ManageCategories from './pages/ManageCategories/ManageCategories'
import Dashboard from './pages/Dashboard/Dashboard'
import { toast, ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div>
      <MenuBar/>
      <ToastContainer />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/users" element={<ManageUsers />} />
        <Route path="/items" element={<ManageItems />} />
        <Route path="/categories" element={<ManageCategories />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
