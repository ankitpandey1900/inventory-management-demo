import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  FileText, 
  RotateCcw,
  Package, 
  List, 
  Truck,
  Box,
  AlertTriangle,
  Settings2,
  MapPin,
  Users,
  Briefcase,
  CreditCard,
  BarChart,
  Settings,
  ChevronDown,
  Bell,
  UserCircle,
  Menu,
  X
} from 'lucide-react';

const Layout = ({ children }) => {
  const [salesOpen, setSalesOpen] = useState(false);
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when navigating
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="app-container">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div className="sidebar-overlay" onClick={() => setMobileMenuOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ color: 'white', marginBottom: '0.25rem', fontSize: '1.125rem' }}>Mobile Accessories</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: 0 }}>Wholesale & Trading</p>
          </div>
          <button 
            className="mobile-close-btn" 
            onClick={() => setMobileMenuOpen(false)}
            style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', display: 'block' }}
          >
            <X size={24} />
          </button>
        </div>

        <nav style={{ padding: '1rem 0', overflowY: 'auto', flex: 1 }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            <NavItem to="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" onClick={closeMobileMenu} />
            
            {/* Sales Group */}
            <NavGroup 
              label="Sales" 
              icon={<ShoppingCart size={20} />} 
              isOpen={salesOpen} 
              onToggle={() => setSalesOpen(!salesOpen)}
            >
              <NavItem to="/sales/create" label="Create Sale" isSubItem onClick={closeMobileMenu} />
              <NavItem to="/sales/invoices" label="Sales Invoices" isSubItem onClick={closeMobileMenu} />
            </NavGroup>

            {/* Purchase Group */}
            <NavGroup 
              label="Purchase" 
              icon={<Package size={20} />} 
              isOpen={purchaseOpen} 
              onToggle={() => setPurchaseOpen(!purchaseOpen)}
            >
              <NavItem to="/purchase/new" label="New Purchase" isSubItem onClick={closeMobileMenu} />
            </NavGroup>

            {/* Inventory Group */}
            <NavGroup 
              label="Inventory" 
              icon={<Box size={20} />} 
              isOpen={inventoryOpen} 
              onToggle={() => setInventoryOpen(!inventoryOpen)}
            >
              <NavItem to="/inventory" label="Stock Overview" isSubItem onClick={closeMobileMenu} />
              <NavItem to="/import" label="Import Excel" isSubItem onClick={closeMobileMenu} />
            </NavGroup>

            <NavItem to="/customers" icon={<Users size={20} />} label="Customers" onClick={closeMobileMenu} />
            <NavItem to="/suppliers" icon={<Briefcase size={20} />} label="Suppliers" onClick={closeMobileMenu} />
            <NavItem to="/payments" icon={<CreditCard size={20} />} label="Payments" onClick={closeMobileMenu} />
            <NavItem to="/reports" icon={<BarChart size={20} />} label="Reports" onClick={closeMobileMenu} />
            <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" onClick={closeMobileMenu} />
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main-wrapper">
        <header className="header" style={{ gap: '1rem' }}>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1e293b', display: 'flex' }}
              className="mobile-menu-btn"
            >
              <Menu size={24} />
            </button>
            <div style={{ fontSize: '0.875rem', color: '#64748b', display: 'none' }} className="desktop-date">
              {`${String(new Date().getDate()).padStart(2, '0')}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${new Date().getFullYear()}`}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
              <Bell size={20} />
            </button>
            <div className="flex items-center gap-2" style={{ cursor: 'pointer' }}>
              <UserCircle size={24} color="#64748b" />
              <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Admin User</span>
            </div>
          </div>
        </header>

        <main className="content">
          {children}
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, label, isSubItem, onClick }) => (
  <li>
    <NavLink
      to={to}
      onClick={onClick}
      style={({ isActive }) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: isSubItem ? '0.5rem 1.5rem 0.5rem 3rem' : '0.75rem 1.5rem',
        color: isActive ? 'white' : '#cbd5e1',
        textDecoration: 'none',
        fontSize: '0.875rem',
        backgroundColor: isActive ? '#1e293b' : 'transparent',
        borderLeft: isActive && !isSubItem ? '3px solid #3b82f6' : '3px solid transparent',
      })}
      className="nav-item"
    >
      {icon && <span style={{ color: '#94a3b8' }}>{icon}</span>}
      {label}
    </NavLink>
  </li>
);

const NavGroup = ({ label, icon, isOpen, onToggle, children }) => (
  <li>
    <div 
      onClick={onToggle}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.75rem 1.5rem',
        color: '#cbd5e1',
        cursor: 'pointer',
        fontSize: '0.875rem',
      }}
    >
      <div className="flex items-center gap-2" style={{ gap: '0.75rem' }}>
        <span style={{ color: '#94a3b8' }}>{icon}</span>
        {label}
      </div>
      <ChevronDown size={16} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
    </div>
    {isOpen && (
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {children}
      </ul>
    )}
  </li>
);

export default Layout;
