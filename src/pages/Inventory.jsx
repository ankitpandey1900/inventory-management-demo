import React, { useState } from 'react';
import { Search, Plus, Filter, Download } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { Link } from 'react-router-dom';
import Modal from '../components/Modal';

const Inventory = () => {
  const { products, addProduct } = useAppData();
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdSku, setNewProdSku] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSKUs = products.length;
  const totalStockQty = products.reduce((acc, p) => acc + p.stock, 0);
  const lowStockCount = products.filter(p => p.stock <= p.reorderLevel).length;
  const inventoryValue = products.reduce((acc, p) => acc + (p.stock * p.purchasePrice), 0);

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProdName || !newProdSku) return;
    
    addProduct({
      name: newProdName,
      sku: newProdSku.toUpperCase(),
      brand: 'Generic',
      category: 'Accessories',
      stock: 0,
      reorderLevel: 10,
      purchasePrice: parseFloat(newProdPrice) || 0,
      sellingPrice: parseFloat(newProdPrice) * 1.5 || 0,
      location: 'Main Warehouse',
      status: 'Low Stock'
    });
    setProductModalOpen(false);
    setNewProdName('');
    setNewProdSku('');
    setNewProdPrice('');
  };

  return (
    <div>
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1>Inventory</h1>
          <p className="mb-0">View and manage your product stock</p>
        </div>
        <div className="flex gap-3">
          <Link to="/import" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
            <Download size={18} /> Import Excel
          </Link>
          <button className="btn btn-primary" onClick={() => setProductModalOpen(true)}>
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
        <div className="flex justify-between mb-4 gap-4 flex-wrap">
          <div style={{ flex: 1, position: 'relative', minWidth: '250px' }}>
            <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="input" 
              placeholder="Search by SKU, product name..." 
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
              {filteredProducts.map(p => (
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
                    <Link to={`/inventory/product/${p.id}`} className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', textDecoration: 'none' }}>
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isProductModalOpen} onClose={() => setProductModalOpen(false)} title="Add New Product">
        <form onSubmit={handleAddProduct}>
          <div className="mb-4">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Product Name *</label>
            <input type="text" className="input" required value={newProdName} onChange={e => setNewProdName(e.target.value)} />
          </div>
          <div className="mb-4">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>SKU *</label>
            <input type="text" className="input" required value={newProdSku} onChange={e => setNewProdSku(e.target.value)} />
          </div>
          <div className="mb-6">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Purchase Price (₹)</label>
            <input type="number" className="input" value={newProdPrice} onChange={e => setNewProdPrice(e.target.value)} />
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" className="btn btn-secondary" onClick={() => setProductModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Product</button>
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

export default Inventory;
