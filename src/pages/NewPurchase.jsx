import React, { useState, useRef, useEffect } from 'react';
import { Search, Save, ScanLine, Trash2, Plus } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import Modal from '../components/Modal';

const NewPurchase = () => {
  const { products, suppliers, addSupplier } = useAppData();
  
  const [selectedSupplier, setSelectedSupplier] = useState(suppliers[0]?.id || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  
  const [items, setItems] = useState([]);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const [isSupplierModalOpen, setSupplierModalOpen] = useState(false);
  const [newSupName, setNewSupName] = useState('');

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
  ).slice(0, 5);

  const handleProductSelect = (product) => {
    const existing = items.find(i => i.product.id === product.id);
    if (existing) {
      handleQtyChange(existing.id, existing.qty + 1);
    } else {
      setItems([...items, { id: Date.now().toString(), product, qty: 10, purchasePrice: product.purchasePrice, gstPercent: 18 }]);
    }
    setSearchTerm('');
    setShowDropdown(false);
  };

  const handleQtyChange = (id, newQty) => {
    setItems(items.map(i => i.id === id ? { ...i, qty: parseInt(newQty) || 0 } : i));
  };

  const handlePriceChange = (id, newPrice) => {
    setItems(items.map(i => i.id === id ? { ...i, purchasePrice: parseFloat(newPrice) || 0 } : i));
  };

  const handleGstChange = (id, newGst) => {
    setItems(items.map(i => i.id === id ? { ...i, gstPercent: parseInt(newGst) || 0 } : i));
  };

  const handleRemove = (id) => {
    setItems(items.filter(i => i.id !== id));
  };

  const totalAmount = items.reduce((acc, item) => acc + (item.qty * item.purchasePrice), 0);
  const totalGst = items.reduce((acc, item) => acc + ((item.qty * item.purchasePrice) * (item.gstPercent / 100)), 0);
  const grandTotal = totalAmount + totalGst;

  const handleSave = () => {
    if (items.length === 0) return;
    setSaveSuccess(true);
    setItems([]);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAddSupplier = (e) => {
    e.preventDefault();
    if (!newSupName) return;
    addSupplier({
      name: newSupName,
      phone: '-',
      gstin: '-',
      purchases: 0,
      outstanding: 0,
      lastPurchase: '-'
    });
    setSupplierModalOpen(false);
    setNewSupName('');
  };

  return (
    <div>
      <div className="mb-6">
        <h1>New Purchase</h1>
        <p className="mb-0">Add items, select supplier and save the purchase</p>
      </div>

      {saveSuccess && (
        <div style={{ backgroundColor: 'var(--success-bg)', color: 'var(--success)', padding: '1rem', borderRadius: '6px', marginBottom: '1.5rem', border: '1px solid var(--success)', fontWeight: 500 }}>
          Purchase saved successfully. Stock updated (simulated).
        </div>
      )}

      <div className="grid" style={{ gridTemplateColumns: '3fr 1fr', gap: '1.5rem' }}>
        <div className="card">
          <div className="flex gap-4 mb-6 flex-wrap">
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Supplier</label>
              <div className="flex gap-2">
                <select className="select" value={selectedSupplier} onChange={(e) => setSelectedSupplier(e.target.value)}>
                  {suppliers.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
                <button className="btn btn-secondary" onClick={() => setSupplierModalOpen(true)} style={{ padding: '0 0.5rem' }}>
                  <Plus size={18} />
                </button>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Purchase Invoice No.</label>
              <input type="text" className="input" defaultValue={`PUR-${Date.now().toString().slice(-6)}`} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Invoice Date</label>
              <input type="date" className="input" defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
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
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>SKU: {p.sku} | Cost: ₹{p.purchasePrice}</div>
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
                  <th>Product</th>
                  <th>SKU</th>
                  <th style={{ width: '100px' }}>Qty</th>
                  <th style={{ width: '120px' }}>Price (₹)</th>
                  <th style={{ width: '100px' }}>GST %</th>
                  <th style={{ width: '120px' }}>Amount (₹)</th>
                  <th style={{ width: '80px', textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 && (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                      Search and add products to the purchase order.
                    </td>
                  </tr>
                )}
                {items.map((item) => (
                  <tr key={item.id}>
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
                        value={item.purchasePrice}
                        onChange={(e) => handlePriceChange(item.id, e.target.value)}
                        min="0"
                      />
                    </td>
                    <td>
                      <select 
                        className="select" 
                        style={{ padding: '0.25rem 0.5rem' }} 
                        value={item.gstPercent}
                        onChange={(e) => handleGstChange(item.id, e.target.value)}
                      >
                        <option value="5">5%</option>
                        <option value="12">12%</option>
                        <option value="18">18%</option>
                        <option value="28">28%</option>
                      </select>
                    </td>
                    <td style={{ fontWeight: 500 }}>
                      ₹{(item.qty * item.purchasePrice).toLocaleString()}
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

        <div className="card">
          <h3 className="mb-4">Purchase Summary</h3>
          
          <div className="flex justify-between mb-2">
            <span className="text-muted">Total Items</span>
            <span style={{ fontWeight: 500 }}>{items.length}</span>
          </div>
          
          <div className="flex justify-between mb-2">
            <span className="text-muted">Total Amount</span>
            <span style={{ fontWeight: 500 }}>₹{totalAmount.toLocaleString()}</span>
          </div>

          <div className="flex justify-between mb-4 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
            <span className="text-muted">GST</span>
            <span style={{ fontWeight: 500 }}>₹{totalGst.toLocaleString()}</span>
          </div>

          <div className="flex justify-between mb-6">
            <span style={{ fontSize: '1.125rem', fontWeight: 600 }}>Grand Total</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)' }}>₹{grandTotal.toLocaleString()}</span>
          </div>

          <div className="mb-4">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Payment Method</label>
            <select className="select">
              <option>Bank Transfer</option>
              <option>Cash</option>
              <option>UPI</option>
              <option>Credit</option>
            </select>
          </div>

          <div className="mb-4">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Paid Amount</label>
            <input type="text" className="input" value={`₹${grandTotal.toLocaleString()}`} readOnly />
          </div>
          
          <div className="flex flex-col gap-3 mt-6">
            <button 
              className="btn btn-primary w-full" 
              onClick={handleSave} 
              style={{ padding: '0.75rem', fontSize: '1rem', opacity: items.length === 0 ? 0.5 : 1, cursor: items.length === 0 ? 'not-allowed' : 'pointer' }}
              disabled={items.length === 0}
            >
              <Save size={18} /> Save Purchase
            </button>
            <button className="btn btn-secondary w-full" style={{ padding: '0.75rem' }}>
              Save Draft
            </button>
          </div>
          
        </div>
      </div>

      <Modal isOpen={isSupplierModalOpen} onClose={() => setSupplierModalOpen(false)} title="Add New Supplier">
        <form onSubmit={handleAddSupplier}>
          <div className="mb-4">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Supplier Name *</label>
            <input type="text" className="input" required value={newSupName} onChange={e => setNewSupName(e.target.value)} />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" className="btn btn-secondary" onClick={() => setSupplierModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Supplier</button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

export default NewPurchase;
