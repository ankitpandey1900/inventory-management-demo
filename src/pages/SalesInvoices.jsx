import React, { useState } from 'react';
import { Search, Filter, Printer, Download, Eye, RotateCcw } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';

const SalesInvoices = () => {
  const { salesInvoices } = useAppData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInvoices = salesInvoices.filter(inv => 
    inv.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    inv.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1>Sales Invoices</h1>
          <p className="mb-0">View and manage sales invoices</p>
        </div>
      </div>

      <div className="card">
        <div className="flex justify-between mb-4 gap-4 flex-wrap">
          <div style={{ flex: 1, position: 'relative', minWidth: '250px' }}>
            <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="input" 
              placeholder="Search by invoice number or customer..." 
              style={{ paddingLeft: '2.5rem' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="select" style={{ width: '150px' }}>
            <option value="">All Dates</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="this_week">This Week</option>
            <option value="this_month">This Month</option>
          </select>
          <select className="select" style={{ width: '150px' }}>
            <option value="">Payment Status</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
            <option value="Partial">Partial</option>
          </select>
          <button className="btn btn-secondary">
            <Filter size={18} /> More Filters
          </button>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Invoice No.</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Status</th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map(inv => (
                <tr key={inv.id}>
                  <td style={{ fontWeight: 500 }}>{inv.id}</td>
                  <td>{inv.date}</td>
                  <td style={{ color: 'var(--primary)' }}>{inv.customer}</td>
                  <td>{inv.items}</td>
                  <td style={{ fontWeight: 600 }}>₹{inv.amount.toLocaleString()}</td>
                  <td>{inv.payment}</td>
                  <td>
                    <span className={`badge ${inv.status === 'Paid' ? 'badge-success' : 'badge-danger'}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2 justify-center">
                      <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem' }} title="View">
                        <Eye size={16} />
                      </button>
                      <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem' }} title="Print">
                        <Printer size={16} />
                      </button>
                      <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem' }} title="Download PDF">
                        <Download size={16} />
                      </button>
                      <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem' }} title="Sales Return">
                        <RotateCcw size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesInvoices;
