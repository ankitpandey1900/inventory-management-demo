import React, { useState } from 'react';
import { Search, Save, ScanLine, Trash2 } from 'lucide-react';
import { products, suppliers } from '../data/mockData';

const NewPurchase = () => {
  const [selectedSupplier, setSelectedSupplier] = useState('s1');
  const [items, setItems] = useState([
    { id: '1', product: products[0], qty: 100, purchasePrice: 80, gstPercent: 18 },
    { id: '2', product: products[1], qty: 200, purchasePrice: 20, gstPercent: 18 },
    { id: '3', product: products[2], qty: 50, purchasePrice: 150, gstPercent: 18 },
    { id: '4', product: products[3], qty: 150, purchasePrice: 10, gstPercent: 18 },
    { id: '5', product: products[4], qty: 100, purchasePrice: 40, gstPercent: 18 },
  ]);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const totalAmount = items.reduce((acc, item) => acc + (item.qty * item.purchasePrice), 0);
  const totalGst = items.reduce((acc, item) => acc + ((item.qty * item.purchasePrice) * (item.gstPercent / 100)), 0);
  const grandTotal = totalAmount + totalGst;

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div>
      <div className="mb-6">
        <h1>New Purchase</h1>
        <p className="mb-0">Add items, select supplier and save the purchase</p>
      </div>

      {saveSuccess && (
        <div style={{ backgroundColor: 'var(--success-bg)', color: 'var(--success)', padding: '1rem', borderRadius: '6px', marginBottom: '1.5rem', border: '1px solid var(--success)', fontWeight: 500 }}>
          Purchase saved successfully. Stock updated.
        </div>
      )}

      <div className="grid" style={{ gridTemplateColumns: '3fr 1fr', gap: '1.5rem' }}>
        <div className="card">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Supplier</label>
              <select className="select" value={selectedSupplier} onChange={(e) => setSelectedSupplier(e.target.value)}>
                {suppliers.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Purchase Invoice No.</label>
              <input type="text" className="input" defaultValue="PUR-2026-000056" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Invoice Date</label>
              <input type="date" className="input" defaultValue="2026-09-21" />
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <div style={{ flex: 1, position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                className="input" 
                placeholder="Search product by name, SKU, or scan barcode..." 
                style={{ paddingLeft: '2.5rem' }}
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
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.product.name}</td>
                    <td>{item.product.sku}</td>
                    <td>
                      <input type="number" className="input" style={{ padding: '0.25rem 0.5rem' }} defaultValue={item.qty} />
                    </td>
                    <td>
                      <input type="number" className="input" style={{ padding: '0.25rem 0.5rem' }} defaultValue={item.purchasePrice} />
                    </td>
                    <td>
                      <select className="select" style={{ padding: '0.25rem 0.5rem' }} defaultValue={item.gstPercent}>
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
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--danger)' }}>
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
            <input type="text" className="input" defaultValue={`₹${grandTotal.toLocaleString()}`} />
          </div>
          
          <div className="mb-6">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Reference / UTR No.</label>
            <input type="text" className="input" placeholder="Enter reference no." />
          </div>

          <div className="flex flex-col gap-3">
            <button className="btn btn-primary w-full" onClick={handleSave} style={{ padding: '0.75rem', fontSize: '1rem' }}>
              <Save size={18} /> Save Purchase
            </button>
            <button className="btn btn-secondary w-full" style={{ padding: '0.75rem' }}>
              Save Draft
            </button>
          </div>
          
          <p style={{ fontSize: '0.75rem', textAlign: 'center', marginTop: '1rem', color: 'var(--text-muted)' }}>
            Stock will be updated automatically after saving the purchase.
          </p>

        </div>
      </div>
    </div>
  );
};

export default NewPurchase;
