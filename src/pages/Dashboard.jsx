import React from 'react';
import { 
  TrendingUp, 
  Package, 
  Users, 
  Briefcase,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useAppData } from '../context/AppDataContext';
import { Link, useNavigate } from 'react-router-dom';

const data = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

const Dashboard = () => {
  const { products, transactions, salesInvoices } = useAppData();
  const navigate = useNavigate();
  
  const lowStockProducts = products.filter(p => p.stock <= p.reorderLevel).slice(0, 5);

  const todaySales = salesInvoices.reduce((acc, inv) => acc + inv.amount, 0); // Simplified for demo
  const stockValue = products.reduce((acc, p) => acc + (p.stock * p.purchasePrice), 0);
  
  const totalOutstanding = customers.reduce((acc, c) => acc + c.outstanding, 0);
  const customersWithDues = customers.filter(c => c.outstanding > 0).length;

  const totalSupplierOutstanding = suppliers.reduce((acc, s) => acc + s.outstanding, 0);
  const suppliersWithDues = suppliers.filter(s => s.outstanding > 0).length;

  return (
    <div>
      <h1 className="mb-6">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <SummaryCard 
          title="Total Sales (Demo)" 
          value={`₹${todaySales.toLocaleString()}`} 
          subtitle={`${salesInvoices.length} invoices`} 
          icon={<TrendingUp size={24} color="#16a34a" />}
          trend="+15%"
          trendUp={true}
        />
        <SummaryCard 
          title="Total Stock Value" 
          value={`₹${stockValue.toLocaleString()}`} 
          subtitle={`${products.length} items`} 
          icon={<Package size={24} color="#2563eb" />}
        />
        <SummaryCard 
          title="Customer Outstanding" 
          value={`₹${totalOutstanding.toLocaleString()}`} 
          subtitle={`${customersWithDues} customers`} 
          icon={<Users size={24} color="#f59e0b" />}
          trend="-2%"
          trendUp={false}
        />
        <SummaryCard 
          title="Supplier Outstanding" 
          value={`₹${totalSupplierOutstanding.toLocaleString()}`} 
          subtitle={`${suppliersWithDues} suppliers`} 
          icon={<Briefcase size={24} color="#dc2626" />}
        />
      </div>

      <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Sales Chart */}
        <div className="card">
          <h2 className="mb-4">Sales Overview (Last 7 Days)</h2>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value}`} />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="sales" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card flex-col gap-4">
          <h2 className="mb-2">Quick Actions</h2>
          <Link to="/sales/create" className="btn btn-primary w-full" style={{ justifyContent: 'center', padding: '0.75rem', textDecoration: 'none' }}>
            New Sale
          </Link>
          <Link to="/purchase/new" className="btn btn-secondary w-full" style={{ justifyContent: 'center', padding: '0.75rem', textDecoration: 'none' }}>
            Add Purchase
          </Link>
          <button onClick={() => navigate('/inventory')} className="btn btn-secondary w-full" style={{ justifyContent: 'center', padding: '0.75rem' }}>
            Add Product (Go to Inventory)
          </button>
          <Link to="/import" className="btn btn-secondary w-full" style={{ justifyContent: 'center', padding: '0.75rem', textDecoration: 'none' }}>
            Import Excel
          </Link>
          <Link to="/reports" className="btn btn-secondary w-full" style={{ justifyContent: 'center', padding: '0.75rem', textDecoration: 'none' }}>
            View Reports
          </Link>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Low Stock Alert */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 style={{ color: 'var(--danger)' }}>Low Stock Alert</h2>
            <Link to="/inventory" style={{ fontSize: '0.875rem', color: 'var(--primary)', textDecoration: 'none' }}>View All</Link>
          </div>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Current Stock</th>
                  <th>Min. Stock</th>
                </tr>
              </thead>
              <tbody>
                {lowStockProducts.map(p => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td style={{ color: 'var(--danger)', fontWeight: 600 }}>{p.stock}</td>
                    <td>{p.reorderLevel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2>Recent Transactions</h2>
            <Link to="/sales/invoices" style={{ fontSize: '0.875rem', color: 'var(--primary)', textDecoration: 'none' }}>View All</Link>
          </div>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Entity</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(0, 5).map((t, idx) => (
                  <tr key={idx}>
                    <td>{t.date}</td>
                    <td>
                      <span className={`badge ${t.type === 'Sale' ? 'badge-success' : 'badge-warning'}`}>
                        {t.type}
                      </span>
                    </td>
                    <td>{t.entity}</td>
                    <td>₹{t.amount.toLocaleString()}</td>
                    <td>{t.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
};

const SummaryCard = ({ title, value, subtitle, icon, trend, trendUp }) => (
  <div className="card" style={{ marginBottom: 0 }}>
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="mb-2">{title}</p>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>{value}</h2>
      </div>
      <div style={{ padding: '0.5rem', backgroundColor: 'var(--bg-main)', borderRadius: '8px' }}>
        {icon}
      </div>
    </div>
    <div className="flex items-center gap-2" style={{ fontSize: '0.875rem' }}>
      {trend && (
        <span style={{ display: 'flex', alignItems: 'center', color: trendUp ? 'var(--success)' : 'var(--danger)', fontWeight: 500 }}>
          {trendUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          {trend}
        </span>
      )}
      <span className="text-muted">{subtitle}</span>
    </div>
  </div>
);

export default Dashboard;
