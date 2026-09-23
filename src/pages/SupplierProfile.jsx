import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, FileText, IndianRupee, MapPin } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';

const SupplierProfile = () => {
  const { id } = useParams();
  const { suppliers, transactions } = useAppData();
  const [activeTab, setActiveTab] = useState('purchases');

  const supplier = suppliers.find(s => s.id === id) || suppliers[0];

  const supplierPurchases = transactions.filter(t => t.entity === supplier.name && t.type === 'Purchase');
  const supplierPayments = transactions.filter(t => t.entity === supplier.name && t.type.includes('Payment Out'));

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link to="/suppliers" className="btn btn-secondary" style={{ padding: '0.5rem' }}>
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="mb-0">{supplier.name}</h1>
          <p className="mb-0 text-muted">Supplier ID: {supplier.id} | GSTIN: {supplier.gstin}</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <Phone size={18} color="var(--text-muted)" />
            <span style={{ fontWeight: 500 }}>Contact Number</span>
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: 0 }}>{supplier.phone}</h3>
        </div>
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <MapPin size={18} color="var(--text-muted)" />
            <span style={{ fontWeight: 500 }}>Location</span>
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: 0 }}>Domestic</h3>
        </div>
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <FileText size={18} color="var(--text-muted)" />
            <span style={{ fontWeight: 500 }}>Total Purchase Orders</span>
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: 0 }}>{supplier.purchases} Orders</h3>
        </div>
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <IndianRupee size={18} color="var(--text-muted)" />
            <span style={{ fontWeight: 500 }}>Outstanding Balance</span>
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: 0, color: supplier.outstanding > 0 ? 'var(--danger)' : 'var(--success)' }}>
            ₹{supplier.outstanding.toLocaleString()}
          </h3>
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div className="flex gap-4" style={{ borderBottom: '1px solid var(--border)', padding: '0 1.5rem', paddingTop: '1rem' }}>
          <button 
            style={{ 
              background: 'none', border: 'none', padding: '0.75rem 1rem', cursor: 'pointer', fontWeight: 500, 
              color: activeTab === 'purchases' ? 'var(--primary)' : 'var(--text-muted)', 
              borderBottom: activeTab === 'purchases' ? '2px solid var(--primary)' : '2px solid transparent', 
              marginBottom: '-1px' 
            }}
            onClick={() => setActiveTab('purchases')}
          >
            Purchase Orders
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
          {activeTab === 'purchases' && (
            <div className="table-container" style={{ marginBottom: 0 }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Invoice No.</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {supplierPurchases.length === 0 ? (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No purchase orders found.</td>
                    </tr>
                  ) : supplierPurchases.map((inv, idx) => (
                    <tr key={idx}>
                      <td>{inv.date}</td>
                      <td style={{ fontWeight: 500 }}>{inv.invoiceNo}</td>
                      <td style={{ fontWeight: 600 }}>₹{inv.amount.toLocaleString()}</td>
                      <td>
                        <span className={`badge ${inv.status === 'Completed' || inv.status === 'Paid' ? 'badge-success' : (inv.status === 'Partial' ? 'badge-warning' : 'badge-danger')}`}>
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
                  {supplierPayments.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No payment transactions found.</td>
                    </tr>
                  ) : supplierPayments.map((t, idx) => (
                    <tr key={idx}>
                      <td>{t.date}</td>
                      <td style={{ fontWeight: 500 }}>{t.invoiceNo}</td>
                      <td>
                        <span className={`badge ${t.type.includes('Payment Out') ? 'badge-success' : 'badge-warning'}`}>
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

export default SupplierProfile;
