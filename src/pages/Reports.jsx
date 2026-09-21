import React from 'react';
import { Download, FileText, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const salesData = [
  { name: 'Week 1', sales: 40000 },
  { name: 'Week 2', sales: 30000 },
  { name: 'Week 3', sales: 45000 },
  { name: 'Week 4', sales: 60000 },
];

const Reports = () => {
  return (
    <div>
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1>Reports</h1>
          <p className="mb-0">Business intelligence and data exports</p>
        </div>
        <div className="flex gap-3">
          <select className="select" style={{ width: '150px' }}>
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Year</option>
            <option>Custom Date</option>
          </select>
          <button className="btn btn-secondary">
            <Download size={18} /> Export Excel
          </button>
          <button className="btn btn-secondary">
            <FileText size={18} /> Download PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="card">
          <h3 className="mb-4">Monthly Sales Overview</h3>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="sales" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="mb-4">Quick Reports</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="mb-2" style={{ color: 'var(--text-muted)' }}>Sales Reports</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><a href="#" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Daily Sales</a></li>
                <li><a href="#" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Monthly Sales</a></li>
                <li><a href="#" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Sales by Product</a></li>
                <li><a href="#" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Sales by Customer</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-2" style={{ color: 'var(--text-muted)' }}>Inventory Reports</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><a href="#" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Current Stock</a></li>
                <li><a href="#" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Low Stock</a></li>
                <li><a href="#" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Stock Valuation</a></li>
                <li><a href="#" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Fast Moving Products</a></li>
              </ul>
            </div>

            <div className="mt-4">
              <h4 className="mb-2" style={{ color: 'var(--text-muted)' }}>Purchase Reports</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><a href="#" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Purchase Summary</a></li>
                <li><a href="#" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Supplier-wise Purchase</a></li>
              </ul>
            </div>

            <div className="mt-4">
              <h4 className="mb-2" style={{ color: 'var(--text-muted)' }}>Outstanding</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><a href="#" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Customer Outstanding</a></li>
                <li><a href="#" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Supplier Outstanding</a></li>
                <li><a href="#" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Payment History</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Reports;
