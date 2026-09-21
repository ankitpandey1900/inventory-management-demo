import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const Payments = () => {
  const [activeTab, setActiveTab] = useState('received');

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
                  <th>Customer</th>
                  <th>Invoice</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Reference</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2026-09-21</td>
                  <td style={{ color: 'var(--primary)' }}>Walk-in Customer</td>
                  <td>INV-001</td>
                  <td style={{ fontWeight: 600, color: 'var(--success)' }}>₹240</td>
                  <td>Cash</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>2026-09-20</td>
                  <td style={{ color: 'var(--primary)' }}>Mobile Planet</td>
                  <td>INV-003</td>
                  <td style={{ fontWeight: 600, color: 'var(--success)' }}>₹1,200</td>
                  <td>UPI</td>
                  <td>UPI/987654321</td>
                </tr>
                <tr>
                  <td>2026-09-19</td>
                  <td style={{ color: 'var(--primary)' }}>Gadget Hub</td>
                  <td>INV-004</td>
                  <td style={{ fontWeight: 600, color: 'var(--success)' }}>₹3,200</td>
                  <td>Bank Transfer</td>
                  <td>NEFT/SBIN000123</td>
                </tr>
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
                  <th>Supplier</th>
                  <th>Purchase</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Reference</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2026-09-20</td>
                  <td style={{ color: 'var(--primary)' }}>Shree Telecom</td>
                  <td>PUR-056</td>
                  <td style={{ fontWeight: 600, color: 'var(--danger)' }}>₹15,000</td>
                  <td>Bank Transfer</td>
                  <td>RTGS/HDFC000123</td>
                </tr>
                <tr>
                  <td>2026-09-15</td>
                  <td style={{ color: 'var(--primary)' }}>Mega Accessories</td>
                  <td>PUR-050</td>
                  <td style={{ fontWeight: 600, color: 'var(--danger)' }}>₹8,500</td>
                  <td>Bank Transfer</td>
                  <td>IMPS/ICIC000123</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;
