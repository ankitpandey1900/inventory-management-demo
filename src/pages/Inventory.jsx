import React, { useState } from 'react';
import { Search, Plus, Filter, Download, ArrowUpRight } from 'lucide-react';
import { products } from '../data/mockData';
import { Link } from 'react-router-dom';

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const totalSKUs = products.length;
  const totalStockQty = products.reduce((acc, p) => acc + p.stock, 0);
  const lowStockCount = products.filter(p => p.stock <= p.reorderLevel).length;
  const inventoryValue = products.reduce((acc, p) => acc + (p.stock * p.purchasePrice), 0);

  return (
    <div>
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1>Inventory</h1>
          <p className="mb-0">View and manage your product stock</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-secondary">
            <Download size={18} /> Import Excel
          </button>
          <button className="btn btn-primary">
            <Plus size={18} /> Add Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-6">
        <StatCard title="Total SKUs" value={totalSKUs.toLocaleString()} />
        <StatCard title="Total Stock Quantity" value={totalStockQty.toLocaleString()} />
        <StatCard title="Low Stock Items" value={lowStockCount} alert={lowStockCount > 0} />
        <StatCard title="Inventory Value" value={`₹${inventoryValue.toLocaleString()}`} />
      </div>

      <div className="card">
        <div className="flex justify-between mb-4 gap-4">
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="input" 
              placeholder="Search by SKU, product name, brand, model..." 
              style={{ paddingLeft: '2.5rem' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="select" style={{ width: '150px' }}>
            <option value="">All Categories</option>
            <option value="Cases">Cases</option>
            <option value="Cables">Cables</option>
            <option value="Chargers">Chargers</option>
          </select>
          <select className="select" style={{ width: '150px' }}>
            <option value="">All Brands</option>
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="Generic">Generic</option>
          </select>
          <button className="btn btn-secondary">
            <Filter size={18} /> More Filters
          </button>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Product</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Current Stock</th>
                <th>Reorder Level</th>
                <th>Location</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 500 }}>{p.sku}</td>
                  <td>{p.name}</td>
                  <td>{p.brand}</td>
                  <td>{p.category}</td>
                  <td style={{ fontWeight: 600, color: p.stock <= p.reorderLevel ? 'var(--danger)' : 'inherit' }}>
                    {p.stock.toLocaleString()}
                  </td>
                  <td>{p.reorderLevel.toLocaleString()}</td>
                  <td>{p.location}</td>
                  <td>
                    <span className={`badge ${p.stock <= p.reorderLevel ? 'badge-warning' : 'badge-success'}`}>
                      {p.stock <= p.reorderLevel ? 'Low Stock' : 'In Stock'}
                    </span>
                  </td>
                  <td>
                    <Link to={`/inventory/product/${p.id}`} className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
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

export default Inventory;
