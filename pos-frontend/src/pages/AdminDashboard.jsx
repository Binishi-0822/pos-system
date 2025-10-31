import React from 'react'
import {useAuth} from '../context/AuthContext'
import { Outlet, useNavigate } from 'react-router-dom'
import SideBar from '../components/SideBar'

const AdminDashboard = () => {
  const {user} = useAuth()
  const navigate = useNavigate()

  return (
    <div className='flex'>
      <SideBar/>
      <Outlet/>
    </div>
  )
}

export default AdminDashboard