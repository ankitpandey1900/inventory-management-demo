import React, { useState } from 'react';
import { Search, Plus, Trash2, Printer, Save, Maximize, ScanLine } from 'lucide-react';
import { products, customers } from '../data/mockData';

const CreateSale = () => {
  const [selectedCustomer, setSelectedCustomer] = useState('c1');
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([
    { id: '1', product: products[0], qty: 10, rate: 120 },
    { id: '2', product: products[1], qty: 20, rate: 45 },
    { id: '3', product: products[2], qty: 5, rate: 250 },
    { id: '4', product: products[3], qty: 30, rate: 25 },
  ]);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const calculateSubtotal = () => items.reduce((acc, item) => acc + (item.qty * item.rate), 0);
  const discount = 0;
  const subtotal = calculateSubtotal();
  const gst = subtotal * 0.18;
  const totalAmount = subtotal - discount + gst;

  const handleQtyChange = (id, newQty) => {
    setItems(items.map(i => i.id === id ? { ...i, qty: parseInt(newQty) || 0 } : i));
  };

  const handleRateChange = (id, newRate) => {
    setItems(items.map(i => i.id === id ? { ...i, rate: parseFloat(newRate) || 0 } : i));
  };

  const handleRemove = (id) => {
    setItems(items.filter(i => i.id !== id));
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1>Create Sale</h1>
          <p className="mb-0">Create new sales invoice</p>
        </div>
      </div>

      {saveSuccess && (
        <div style={{ backgroundColor: 'var(--success-bg)', color: 'var(--success)', padding: '1rem', borderRadius: '6px', marginBottom: '1.5rem', border: '1px solid var(--success)', fontWeight: 500 }}>
          Sale saved successfully.
        </div>
      )}

      <div className="grid" style={{ gridTemplateColumns: '3fr 1fr', gap: '1.5rem' }}>
        
        {/* Main Form */}
        <div className="card">
          
          <div className="flex gap-4 items-end mb-6">
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Customer</label>
              <select className="select" value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)}>
                {customers.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <button className="btn btn-secondary">
              <Plus size={16} /> Add New Customer
            </button>
          </div>

          <div className="flex gap-4 mb-6">
            <div style={{ flex: 1, position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                className="input" 
                placeholder="Search product by name, SKU, brand, or scan barcode..." 
                style={{ paddingLeft: '2.5rem' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="btn btn-secondary">
              <ScanLine size={18} /> Scan Barcode
            </button>
          </div>

          <div className="table-container mb-6">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}>#</th>
                  <th>Product</th>
                  <th>SKU</th>
                  <th style={{ width: '100px' }}>Qty</th>
                  <th style={{ width: '120px' }}>Rate (₹)</th>
                  <th style={{ width: '120px' }}>Amount (₹)</th>
                  <th style={{ width: '80px', textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={item.id}>
                    <td>{idx + 1}</td>
                    <td>{item.product.name}</td>
                    <td>{item.product.sku}</td>
                    <td>
                      <input 
                        type="number" 
                        className="input" 
                        style={{ padding: '0.25rem 0.5rem' }} 
                        value={item.qty}
                        onChange={(e) => handleQtyChange(item.id, e.target.value)}
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        className="input" 
                        style={{ padding: '0.25rem 0.5rem' }} 
                        value={item.rate}
                        onChange={(e) => handleRateChange(item.id, e.target.value)}
                      />
                    </td>
                    <td style={{ fontWeight: 500 }}>
                      ₹{(item.qty * item.rate).toLocaleString()}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button 
                        onClick={() => handleRemove(item.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--danger)' }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        {/* Sidebar Summary */}
        <div className="card">
          <h3 className="mb-4">Invoice Summary</h3>
          
          <div className="flex justify-between mb-2">
            <span className="text-muted">Total Items</span>
            <span style={{ fontWeight: 500 }}>{items.length}</span>
          </div>
          
          <div className="flex justify-between mb-2">
            <span className="text-muted">Subtotal</span>
            <span style={{ fontWeight: 500 }}>₹{subtotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="text-muted">Discount</span>
            <span style={{ fontWeight: 500 }}>₹{discount}</span>
          </div>

          <div className="flex justify-between mb-4 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
            <span className="text-muted">GST (18%)</span>
            <span style={{ fontWeight: 500 }}>₹{gst.toLocaleString()}</span>
          </div>

          <div className="flex justify-between mb-6">
            <span style={{ fontSize: '1.125rem', fontWeight: 600 }}>Total Amount</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)' }}>₹{totalAmount.toLocaleString()}</span>
          </div>

          <div className="mb-6">
            <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.875rem', fontWeight: 500 }}>Payment Method</label>
            <div className="flex flex-col gap-2">
              {['Cash', 'UPI', 'Bank Transfer', 'Credit (Customer Account)'].map(method => (
                <label key={method} className="flex items-center gap-2" style={{ fontSize: '0.875rem', cursor: 'pointer' }}>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value={method} 
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  {method}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Notes</label>
            <textarea className="input" rows="3" placeholder="Optional notes..."></textarea>
          </div>

          <div className="flex flex-col gap-3">
            <button className="btn btn-primary w-full" onClick={handleSave} style={{ padding: '0.75rem', fontSize: '1rem' }}>
              <Save size={18} /> Save Sale
            </button>
            <button className="btn btn-secondary w-full" style={{ padding: '0.75rem' }}>
              <Printer size={18} /> Print Invoice
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CreateSale;
