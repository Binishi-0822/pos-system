import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard'
import CashierDashboard from './pages/CashierDashboard'
import Login from './pages/Login'
import PrivateRoutes from './utils/PrivateRoutes'
import RoleBaseRoutes from './utils/RoleBaseRoutes'
import CashierManagement from './pages/cashierManagement/CashierManagement'
import DashboardOverview from './pages/DashboardOverview/DashboardOverview'
import InventoryManagement from './pages/InventoryManagement'
import ManageSupplierInvoices from './pages/ManageSupplierInvoices'
import CreateNewInvoice from './pages/CreateNewInvoice'
import ViewInvoice from './pages/ViewInvoice'
import CustomerManagement from './pages/CustomerManagement'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard"/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/admin-dashboard" element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={["owner"]}>
              <AdminDashboard/>
            </RoleBaseRoutes>
          </PrivateRoutes>
        }>
          <Route index element={<DashboardOverview/>}></Route>
          <Route path="/admin-dashboard/cashier-management" element={<CashierManagement/>}></Route>
          <Route path="/admin-dashboard/inventory-management" element={<InventoryManagement/>}></Route>
          <Route path="/admin-dashboard/manage-supplier-invoices" element={<ManageSupplierInvoices/>}></Route>
          <Route path="/admin-dashboard/create-new-invoice" element={<CreateNewInvoice/>}></Route>
          <Route path="/admin-dashboard/view-invoice" element={<ViewInvoice/>}></Route>
          <Route path="/admin-dashboard/customer-management" element={<CustomerManagement/>}></Route>

        </Route>
        <Route path="/cashier-dashboard" element={<CashierDashboard/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
