import React from 'react'
import {useAuth} from '../context/AuthContext'


const CashierDashboard = () => {
  const {user} = useAuth()
    
  return (
    <div>CashierDashboard {user.name}</div>
  )
}

export default CashierDashboard