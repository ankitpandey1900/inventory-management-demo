import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';

const Payments = () => {
  const [activeTab, setActiveTab] = useState('received');
  const { transactions } = useAppData();

  const receivedPayments = transactions.filter(t => t.type === 'Sale' || t.type === 'Payment In');
  const paidPayments = transactions.filter(t => t.type === 'Purchase' || t.type === 'Payment Out');

  return (
    <div>
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1>Payments</h1>
          <p className="mb-0">Manage money received and money paid</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} /> Record Payment
        </button>
      </div>

      <div className="card">
        <div className="flex gap-4 mb-6" style={{ borderBottom: '1px solid var(--border)' }}>
          <button 
            style={{ background: 'none', border: 'none', padding: '0.75rem 1.5rem', cursor: 'pointer', fontWeight: 500, color: activeTab === 'received' ? 'var(--primary)' : 'var(--text-muted)', borderBottom: activeTab === 'received' ? '2px solid var(--primary)' : '2px solid transparent', marginBottom: '-1px' }}
            onClick={() => setActiveTab('received')}
          >
            Money Received
          </button>
          <button 
            style={{ background: 'none', border: 'none', padding: '0.75rem 1.5rem', cursor: 'pointer', fontWeight: 500, color: activeTab === 'paid' ? 'var(--primary)' : 'var(--text-muted)', borderBottom: activeTab === 'paid' ? '2px solid var(--primary)' : '2px solid transparent', marginBottom: '-1px' }}
            onClick={() => setActiveTab('paid')}
          >
            Money Paid
          </button>
        </div>

        {activeTab === 'received' && (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Customer/Entity</th>
                  <th>Reference No.</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {receivedPayments.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No received payments recorded yet.</td>
                  </tr>
                ) : receivedPayments.map((p, i) => (
                  <tr key={i}>
                    <td>{p.date}</td>
                    <td style={{ color: 'var(--primary)' }}>{p.entity}</td>
                    <td>{p.invoiceNo}</td>
                    <td style={{ fontWeight: 600, color: 'var(--success)' }}>₹{p.amount.toLocaleString()}</td>
                    <td><span className={`badge ${p.status === 'Completed' ? 'badge-success' : 'badge-warning'}`}>{p.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'paid' && (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Supplier/Entity</th>
                  <th>Reference No.</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paidPayments.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No outgoing payments recorded yet.</td>
                  </tr>
                ) : paidPayments.map((p, i) => (
                  <tr key={i}>
                    <td>{p.date}</td>
                    <td style={{ color: 'var(--primary)' }}>{p.entity}</td>
                    <td>{p.invoiceNo}</td>
                    <td style={{ fontWeight: 600, color: 'var(--danger)' }}>₹{p.amount.toLocaleString()}</td>
                    <td><span className={`badge ${p.status === 'Completed' ? 'badge-success' : 'badge-warning'}`}>{p.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;
