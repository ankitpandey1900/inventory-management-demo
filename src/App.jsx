import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppDataProvider } from './context/AppDataContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CreateSale from './pages/CreateSale';
import Inventory from './pages/Inventory';
import NewPurchase from './pages/NewPurchase';
import Customers from './pages/Customers';
import CustomerProfile from './pages/CustomerProfile';
import Suppliers from './pages/Suppliers';
import SalesInvoices from './pages/SalesInvoices';
import Reports from './pages/Reports';
import ExcelImport from './pages/ExcelImport';
import ProductDetails from './pages/ProductDetails';
import Payments from './pages/Payments';
import Settings from './pages/Settings';

function App() {
  return (
    <AppDataProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sales/create" element={<CreateSale />} />
            <Route path="/sales/invoices" element={<SalesInvoices />} />
            <Route path="/purchase/new" element={<NewPurchase />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/inventory/product/:id" element={<ProductDetails />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/:id" element={<CustomerProfile />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/import" element={<ExcelImport />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </Router>
    </AppDataProvider>
  );
}

export default App;
