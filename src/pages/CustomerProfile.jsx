import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Phone, FileText, IndianRupee, MapPin } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';

const CustomerProfile = () => {
  const { id } = useParams();
  const { customers, salesInvoices, transactions } = useAppData();
  const [activeTab, setActiveTab] = useState('invoices');

  const customer = customers.find(c => c.id === id) || customers[0];

  const customerInvoices = salesInvoices.filter(inv => inv.customer === customer.name);
  const customerTransactions = transactions.filter(t => t.entity === customer.name);

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link to="/customers" className="btn btn-secondary" style={{ padding: '0.5rem' }}>
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="mb-0">{customer.name}</h1>
          <p className="mb-0 text-muted">Customer ID: {customer.id} | GSTIN: {customer.gstin}</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <Phone size={18} color="var(--text-muted)" />
            <span style={{ fontWeight: 500 }}>Contact Number</span>
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: 0 }}>{customer.phone}</h3>
        </div>
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <MapPin size={18} color="var(--text-muted)" />
            <span style={{ fontWeight: 500 }}>Location</span>
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: 0 }}>Local</h3>
        </div>
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <FileText size={18} color="var(--text-muted)" />
            <span style={{ fontWeight: 500 }}>Total Purchases</span>
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: 0 }}>{customer.purchases} Invoices</h3>
        </div>
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <IndianRupee size={18} color="var(--text-muted)" />
            <span style={{ fontWeight: 500 }}>Outstanding Balance</span>
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: 0, color: customer.outstanding > 0 ? 'var(--danger)' : 'var(--success)' }}>
            ₹{customer.outstanding.toLocaleString()}
          </h3>
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div className="flex gap-4" style={{ borderBottom: '1px solid var(--border)', padding: '0 1.5rem', paddingTop: '1rem' }}>
          <button 
            style={{ 
              background: 'none', border: 'none', padding: '0.75rem 1rem', cursor: 'pointer', fontWeight: 500, 
              color: activeTab === 'invoices' ? 'var(--primary)' : 'var(--text-muted)', 
              borderBottom: activeTab === 'invoices' ? '2px solid var(--primary)' : '2px solid transparent', 
              marginBottom: '-1px' 
            }}
            onClick={() => setActiveTab('invoices')}
          >
            Sales Invoices
          </button>
          <button 
            style={{ 
              background: 'none', border: 'none', padding: '0.75rem 1rem', cursor: 'pointer', fontWeight: 500, 
              color: activeTab === 'payments' ? 'var(--primary)' : 'var(--text-muted)', 
              borderBottom: activeTab === 'payments' ? '2px solid var(--primary)' : '2px solid transparent', 
              marginBottom: '-1px' 
            }}
            onClick={() => setActiveTab('payments')}
          >
            Payment History
          </button>
        </div>

        <div style={{ padding: '1.5rem' }}>
          {activeTab === 'invoices' && (
            <div className="table-container" style={{ marginBottom: 0 }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Invoice No.</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Payment Method</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {customerInvoices.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No invoices found.</td>
                    </tr>
                  ) : customerInvoices.map((inv) => (
                    <tr key={inv.id}>
                      <td style={{ fontWeight: 500 }}>{inv.id}</td>
                      <td>{inv.date}</td>
                      <td>{inv.items}</td>
                      <td style={{ fontWeight: 600 }}>₹{inv.amount.toLocaleString()}</td>
                      <td>{inv.payment}</td>
                      <td>
                        <span className={`badge ${inv.status === 'Paid' ? 'badge-success' : (inv.status === 'Partial' ? 'badge-warning' : 'badge-danger')}`}>
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="table-container" style={{ marginBottom: 0 }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Reference No.</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {customerTransactions.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No transactions found.</td>
                    </tr>
                  ) : customerTransactions.map((t, idx) => (
                    <tr key={idx}>
                      <td>{t.date}</td>
                      <td style={{ fontWeight: 500 }}>{t.invoiceNo}</td>
                      <td>
                        <span className={`badge ${t.type.includes('Payment') ? 'badge-success' : 'badge-warning'}`}>
                          {t.type}
                        </span>
                      </td>
                      <td style={{ fontWeight: 600 }}>₹{t.amount.toLocaleString()}</td>
                      <td>{t.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
