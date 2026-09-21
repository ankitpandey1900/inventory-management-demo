import React, { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import Modal from '../components/Modal';

const Customers = () => {
  const { customers, addCustomer } = useAppData();
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setModalOpen] = useState(false);
  const [newCustName, setNewCustName] = useState('');
  const [newCustPhone, setNewCustPhone] = useState('');
  const [newCustGstin, setNewCustGstin] = useState('');

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.phone.includes(searchTerm)
  );

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.purchases > 0).length;
  const outstandingAmount = customers.reduce((acc, c) => acc + c.outstanding, 0);
  const creditCustomers = customers.filter(c => c.outstanding > 0).length;

  const handleAddCustomer = (e) => {
    e.preventDefault();
    if (!newCustName) return;
    
    addCustomer({
      name: newCustName,
      phone: newCustPhone || '-',
      gstin: newCustGstin || '-',
      purchases: 0,
      outstanding: 0,
      lastPurchase: '-'
    });
    setModalOpen(false);
    setNewCustName('');
    setNewCustPhone('');
    setNewCustGstin('');
  };

  return (
    <div>
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1>Customers</h1>
          <p className="mb-0">Manage customer records and outstanding balances</p>
        </div>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          <Plus size={18} /> Add Customer
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-6">
        <StatCard title="Total Customers" value={totalCustomers} />
        <StatCard title="Active Customers" value={activeCustomers} />
        <StatCard title="Outstanding Amount" value={`₹${outstandingAmount.toLocaleString()}`} alert={outstandingAmount > 0} />
        <StatCard title="Credit Customers" value={creditCustomers} />
      </div>

      <div className="card">
        <div className="flex justify-between mb-4 gap-4 flex-wrap">
          <div style={{ flex: 1, position: 'relative', minWidth: '250px' }}>
            <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="input" 
              placeholder="Search customers by name, phone, or GSTIN..." 
              style={{ paddingLeft: '2.5rem' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-secondary">
            <Filter size={18} /> Filters
          </button>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>GSTIN</th>
                <th>Total Purchases</th>
                <th>Outstanding</th>
                <th>Last Purchase</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map(c => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 500, color: 'var(--primary)' }}>{c.name}</td>
                  <td>{c.phone}</td>
                  <td>{c.gstin}</td>
                  <td>{c.purchases}</td>
                  <td style={{ fontWeight: 600, color: c.outstanding > 0 ? 'var(--danger)' : 'var(--success)' }}>
                    ₹{c.outstanding.toLocaleString()}
                  </td>
                  <td>{c.lastPurchase}</td>
                  <td>
                    <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Add New Customer">
        <form onSubmit={handleAddCustomer}>
          <div className="mb-4">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Customer Name *</label>
            <input type="text" className="input" required value={newCustName} onChange={e => setNewCustName(e.target.value)} />
          </div>
          <div className="mb-4">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Phone Number</label>
            <input type="text" className="input" value={newCustPhone} onChange={e => setNewCustPhone(e.target.value)} />
          </div>
          <div className="mb-6">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>GSTIN</label>
            <input type="text" className="input" value={newCustGstin} onChange={e => setNewCustGstin(e.target.value)} />
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Customer</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

const StatCard = ({ title, value, alert }) => (
  <div className="card" style={{ marginBottom: 0 }}>
    <p className="mb-2">{title}</p>
    <h2 style={{ fontSize: '1.75rem', marginBottom: 0, color: alert ? 'var(--danger)' : 'inherit' }}>
      {value}
    </h2>
  </div>
);

export default Customers;
