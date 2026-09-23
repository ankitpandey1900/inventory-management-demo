import React, { useState, useRef, useEffect } from 'react';
import { Search, Plus, Trash2, Printer, Save, ScanLine } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import Modal from '../components/Modal';

const CreateSale = () => {
  const { products, customers, addCustomer, addSale } = useAppData();
  
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]?.id || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  
  const [items, setItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isCustomerModalOpen, setCustomerModalOpen] = useState(false);

  // New Customer Form State
  const [newCustName, setNewCustName] = useState('');
  const [newCustPhone, setNewCustPhone] = useState('');

  // Payment Tracking
  const [amountPaidInput, setAmountPaidInput] = useState('');

  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 5); // show max 5

  const handleProductSelect = (product) => {
    // Check if already in cart
    const existing = items.find(i => i.product.id === product.id);
    if (existing) {
      handleQtyChange(existing.id, existing.qty + 1);
    } else {
      setItems([...items, { id: Date.now().toString(), product, qty: 1, rate: product.sellingPrice }]);
    }
    setSearchTerm('');
    setShowDropdown(false);
  };

  const calculateSubtotal = () => items.reduce((acc, item) => acc + (item.qty * item.rate), 0);
  const subtotal = calculateSubtotal();
  const gst = subtotal * 0.18;
  const totalAmount = subtotal + gst;

  const selectedCustObj = customers.find(c => c.id === selectedCustomer);
  const previousOutstanding = selectedCustObj && selectedCustObj.id !== 'c1' ? selectedCustObj.outstanding : 0;
  const amountPaid = amountPaidInput === '' ? totalAmount : (parseFloat(amountPaidInput) || 0);
  const newOutstanding = previousOutstanding + totalAmount - amountPaid;

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
    if (items.length === 0) return;
    
    addSale({
      customerId: selectedCustomer,
      items,
      total: totalAmount,
      amountPaid,
      paymentMethod
    });

    setSaveSuccess(true);
    setItems([]);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
    if (!newCustName) return;
    addCustomer({
      name: newCustName,
      phone: newCustPhone || '-',
      gstin: '-',
      purchases: 0,
      outstanding: 0,
      lastPurchase: '-'
    });
    setCustomerModalOpen(false);
    setNewCustName('');
    setNewCustPhone('');
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
          
          <div className="flex gap-4 items-end mb-6 flex-wrap">
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Customer</label>
              <select className="select" value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)}>
                {customers.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <button className="btn btn-secondary" onClick={() => setCustomerModalOpen(true)}>
              <Plus size={16} /> Add New Customer
            </button>
          </div>

          <div className="flex gap-4 mb-6 flex-wrap">
            <div style={{ flex: 1, position: 'relative', minWidth: '250px' }} ref={searchRef}>
              <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                className="input" 
                placeholder="Search product by name, SKU..." 
                style={{ paddingLeft: '2.5rem' }}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
              />
              {showDropdown && searchTerm && (
                <div className="search-dropdown">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map(p => (
                      <div key={p.id} className="search-item" onClick={() => handleProductSelect(p)}>
                        <div style={{ fontWeight: 500 }}>{p.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>SKU: {p.sku} | ₹{p.sellingPrice} | Stock: {p.stock}</div>
                      </div>
                    ))
                  ) : (
                    <div style={{ padding: '1rem', color: 'var(--text-muted)' }}>No products found.</div>
                  )}
                </div>
              )}
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
                {items.length === 0 && (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                      Search and add products to the invoice.
                    </td>
                  </tr>
                )}
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
                        min="1"
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        className="input" 
                        style={{ padding: '0.25rem 0.5rem' }} 
                        value={item.rate}
                        onChange={(e) => handleRateChange(item.id, e.target.value)}
                        min="0"
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

          <div className="flex justify-between mb-4 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
            <span className="text-muted">GST (18%)</span>
            <span style={{ fontWeight: 500 }}>₹{gst.toLocaleString()}</span>
          </div>

          <div className="flex justify-between mb-4">
            <span style={{ fontSize: '1rem', fontWeight: 600 }}>Invoice Total</span>
            <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)' }}>₹{totalAmount.toLocaleString()}</span>
          </div>

          {selectedCustObj && selectedCustObj.id !== 'c1' && (
            <div className="flex justify-between mb-4 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
              <span className="text-muted">Previous Outstanding</span>
              <span style={{ fontWeight: 600, color: 'var(--danger)' }}>₹{previousOutstanding.toLocaleString()}</span>
            </div>
          )}

          {selectedCustObj && selectedCustObj.id !== 'c1' && (
             <div className="flex justify-between mb-4 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
               <span style={{ fontSize: '1rem', fontWeight: 600 }}>Total Due</span>
               <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--danger)' }}>₹{(totalAmount + previousOutstanding).toLocaleString()}</span>
             </div>
          )}

          <div className="mb-4">
            <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.875rem', fontWeight: 500 }}>Payment Method</label>
            <div className="flex flex-wrap gap-2">
              {['Cash', 'UPI', 'Bank Transfer', 'Credit'].map(method => (
                <label key={method} className="flex items-center gap-1" style={{ fontSize: '0.875rem', cursor: 'pointer', marginRight: '1rem' }}>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value={method} 
                    checked={paymentMethod === method}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      if (e.target.value === 'Credit') {
                        setAmountPaidInput('0');
                      } else {
                        setAmountPaidInput(totalAmount.toString());
                      }
                    }}
                  />
                  {method}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
              <span>Amount Paid Now (₹)</span>
              <button 
                type="button" 
                onClick={() => setAmountPaidInput(totalAmount.toString())}
                style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}
              >
                Pay Full Invoice
              </button>
            </label>
            <input 
              type="number" 
              className="input w-full" 
              placeholder={totalAmount.toString()} 
              value={amountPaidInput}
              onChange={(e) => setAmountPaidInput(e.target.value)}
              min="0"
            />
          </div>

          {selectedCustObj && selectedCustObj.id !== 'c1' && (
            <div className="flex justify-between mb-6 p-3" style={{ backgroundColor: 'var(--bg-color)', borderRadius: '6px' }}>
              <span style={{ fontWeight: 600 }}>New Balance</span>
              <span style={{ fontWeight: 700, color: newOutstanding > 0 ? 'var(--danger)' : 'var(--success)' }}>
                ₹{newOutstanding.toLocaleString()}
              </span>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <button 
              className="btn btn-primary w-full" 
              onClick={handleSave} 
              style={{ padding: '0.75rem', fontSize: '1rem', opacity: items.length === 0 ? 0.5 : 1, cursor: items.length === 0 ? 'not-allowed' : 'pointer' }}
              disabled={items.length === 0}
            >
              <Save size={18} /> Save Sale
            </button>
            <button className="btn btn-secondary w-full" style={{ padding: '0.75rem' }}>
              <Printer size={18} /> Print Invoice
            </button>
          </div>

        </div>

      </div>

      <Modal isOpen={isCustomerModalOpen} onClose={() => setCustomerModalOpen(false)} title="Add New Customer">
        <form onSubmit={handleAddCustomer}>
          <div className="mb-4">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Customer Name *</label>
            <input type="text" className="input" required value={newCustName} onChange={e => setNewCustName(e.target.value)} />
          </div>
          <div className="mb-6">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Phone Number</label>
            <input type="text" className="input" value={newCustPhone} onChange={e => setNewCustPhone(e.target.value)} />
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" className="btn btn-secondary" onClick={() => setCustomerModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Customer</button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

export default CreateSale;
