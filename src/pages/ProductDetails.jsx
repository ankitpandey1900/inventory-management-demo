import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Package, History } from 'lucide-react';
import { products } from '../data/mockData';

const ProductDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Find product or fallback to first product
  const product = products.find(p => p.id === id) || products[0];

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link to="/inventory" className="btn btn-secondary" style={{ padding: '0.5rem' }}>
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="mb-0">{product.name}</h1>
          <p className="mb-0" style={{ fontSize: '0.875rem' }}>SKU: {product.sku}</p>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <button className="btn btn-primary">
            <Edit size={18} /> Edit Product
          </button>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1fr 2fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        
        {/* Left Side: Key Info */}
        <div className="card" style={{ marginBottom: 0 }}>
          <div style={{ width: '100%', height: '200px', backgroundColor: 'var(--bg-main)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Package size={64} color="var(--text-muted)" />
          </div>
          
          <h3 className="mb-4">Product Details</h3>
          
          <div className="flex justify-between mb-3" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
            <span className="text-muted">Category</span>
            <span style={{ fontWeight: 500 }}>{product.category}</span>
          </div>
          <div className="flex justify-between mb-3" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
            <span className="text-muted">Brand</span>
            <span style={{ fontWeight: 500 }}>{product.brand}</span>
          </div>
          <div className="flex justify-between mb-3" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
            <span className="text-muted">Current Stock</span>
            <span style={{ fontWeight: 600, color: product.stock <= product.reorderLevel ? 'var(--danger)' : 'var(--success)' }}>
              {product.stock.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between mb-3" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
            <span className="text-muted">Reorder Level</span>
            <span style={{ fontWeight: 500 }}>{product.reorderLevel.toLocaleString()}</span>
          </div>
          <div className="flex justify-between mb-3" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
            <span className="text-muted">Purchase Price</span>
            <span style={{ fontWeight: 500 }}>₹{product.purchasePrice}</span>
          </div>
          <div className="flex justify-between mb-3" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
            <span className="text-muted">Selling Price</span>
            <span style={{ fontWeight: 500 }}>₹{product.sellingPrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Location</span>
            <span style={{ fontWeight: 500 }}>{product.location}</span>
          </div>
        </div>

        {/* Right Side: Tabs */}
        <div className="card" style={{ marginBottom: 0, display: 'flex', flexDirection: 'column' }}>
          
          <div className="flex gap-4 mb-6" style={{ borderBottom: '1px solid var(--border)' }}>
            <button 
              style={{ background: 'none', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 500, color: activeTab === 'overview' ? 'var(--primary)' : 'var(--text-muted)', borderBottom: activeTab === 'overview' ? '2px solid var(--primary)' : '2px solid transparent', marginBottom: '-1px' }}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              style={{ background: 'none', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 500, color: activeTab === 'stock' ? 'var(--primary)' : 'var(--text-muted)', borderBottom: activeTab === 'stock' ? '2px solid var(--primary)' : '2px solid transparent', marginBottom: '-1px' }}
              onClick={() => setActiveTab('stock')}
            >
              Stock History
            </button>
            <button 
              style={{ background: 'none', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 500, color: activeTab === 'sales' ? 'var(--primary)' : 'var(--text-muted)', borderBottom: activeTab === 'sales' ? '2px solid var(--primary)' : '2px solid transparent', marginBottom: '-1px' }}
              onClick={() => setActiveTab('sales')}
            >
              Sales History
            </button>
          </div>

          <div style={{ flex: 1 }}>
            {activeTab === 'overview' && (
              <div>
                <p>This product is active and available for sale. It is currently placed in <strong>{product.location}</strong>.</p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div style={{ padding: '1rem', backgroundColor: 'var(--bg-main)', borderRadius: '6px' }}>
                    <p className="mb-1 text-muted">Total Sales (YTD)</p>
                    <h3 style={{ margin: 0 }}>4,520 Units</h3>
                  </div>
                  <div style={{ padding: '1rem', backgroundColor: 'var(--bg-main)', borderRadius: '6px' }}>
                    <p className="mb-1 text-muted">Revenue Generated</p>
                    <h3 style={{ margin: 0 }}>₹{ (4520 * product.sellingPrice).toLocaleString() }</h3>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'stock' && (
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Reference</th>
                      <th>Qty Change</th>
                      <th>Closing Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2026-09-20</td>
                      <td><span className="badge badge-success">Purchase</span></td>
                      <td>PUR-056</td>
                      <td style={{ color: 'var(--success)', fontWeight: 600 }}>+500</td>
                      <td>{product.stock}</td>
                    </tr>
                    <tr>
                      <td>2026-09-19</td>
                      <td><span className="badge badge-warning">Sale</span></td>
                      <td>INV-045</td>
                      <td style={{ color: 'var(--danger)', fontWeight: 600 }}>-50</td>
                      <td>{product.stock - 500}</td>
                    </tr>
                    <tr>
                      <td>2026-09-15</td>
                      <td><span className="badge badge-warning">Sale</span></td>
                      <td>INV-012</td>
                      <td style={{ color: 'var(--danger)', fontWeight: 600 }}>-120</td>
                      <td>{product.stock - 450}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'sales' && (
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Invoice No.</th>
                      <th>Customer</th>
                      <th>Qty</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2026-09-19</td>
                      <td>INV-045</td>
                      <td>Tech World</td>
                      <td>50</td>
                      <td>₹{(50 * product.sellingPrice).toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td>2026-09-15</td>
                      <td>INV-012</td>
                      <td>Mobile Planet</td>
                      <td>120</td>
                      <td>₹{(120 * product.sellingPrice).toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
