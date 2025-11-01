import React from 'react'
import SectionTitle from '../components/SectionTitle'
import CustomerManagementOverview from '../components/customer/CustomerManagementOverview'

const CustomerManagement = () => {
  return (
    <div className="flex-1 w-full px-6 py-4 bg-gray-50 min-h-screen">
      <SectionTitle title="Customer Management" icon="👥" />
      <CustomerManagementOverview/>
    </div>
  )
}

export default CustomerManagement