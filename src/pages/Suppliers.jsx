import React, { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import Modal from '../components/Modal';

const Suppliers = () => {
  const { suppliers, addSupplier } = useAppData();
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setModalOpen] = useState(false);
  const [newSupName, setNewSupName] = useState('');
  const [newSupPhone, setNewSupPhone] = useState('');

  const filteredSuppliers = suppliers.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.phone.includes(searchTerm)
  );

  const totalSuppliers = suppliers.length;
  const outstandingAmount = suppliers.reduce((acc, s) => acc + s.outstanding, 0);

  const handleAddSupplier = (e) => {
    e.preventDefault();
    if (!newSupName) return;
    addSupplier({
      name: newSupName,
      phone: newSupPhone || '-',
      gstin: '-',
      purchases: 0,
      outstanding: 0,
      lastPurchase: '-'
    });
    setModalOpen(false);
    setNewSupName('');
    setNewSupPhone('');
  };

  return (
    <div>
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1>Suppliers</h1>
          <p className="mb-0">Manage suppliers and payables</p>
        </div>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          <Plus size={18} /> Add Supplier
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-6">
        <StatCard title="Total Suppliers" value={totalSuppliers} />
        <StatCard title="Active Suppliers" value={totalSuppliers} />
        <StatCard title="Total Purchases" value="12,450" />
        <StatCard title="Outstanding Amount" value={`₹${outstandingAmount.toLocaleString()}`} alert={outstandingAmount > 0} />
      </div>

      <div className="card">
        <div className="flex justify-between mb-4 gap-4 flex-wrap">
          <div style={{ flex: 1, position: 'relative', minWidth: '250px' }}>
            <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="input" 
              placeholder="Search suppliers by name, phone, or GSTIN..." 
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
                <th>Supplier</th>
                <th>Phone</th>
                <th>GSTIN</th>
                <th>Total Purchases</th>
                <th>Outstanding</th>
                <th>Last Purchase</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map(s => (
                <tr key={s.id}>
                  <td style={{ fontWeight: 500, color: 'var(--primary)' }}>{s.name}</td>
                  <td>{s.phone}</td>
                  <td>{s.gstin}</td>
                  <td>{s.purchases}</td>
                  <td style={{ fontWeight: 600, color: s.outstanding > 0 ? 'var(--danger)' : 'var(--success)' }}>
                    ₹{s.outstanding.toLocaleString()}
                  </td>
                  <td>{s.lastPurchase}</td>
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

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Add New Supplier">
        <form onSubmit={handleAddSupplier}>
          <div className="mb-4">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Supplier Name *</label>
            <input type="text" className="input" required value={newSupName} onChange={e => setNewSupName(e.target.value)} />
          </div>
          <div className="mb-6">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Phone Number</label>
            <input type="text" className="input" value={newSupPhone} onChange={e => setNewSupPhone(e.target.value)} />
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Supplier</button>
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

export default Suppliers;
