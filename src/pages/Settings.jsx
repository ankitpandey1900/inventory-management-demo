import React from 'react';
import { Save } from 'lucide-react';

const Settings = () => {
  return (
    <div>
      <div className="mb-6">
        <h1>Settings</h1>
        <p className="mb-0">Configure your business application</p>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1fr 3fr', gap: '2rem' }}>
        
        {/* Settings Navigation */}
        <div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>
              <button style={{ width: '100%', textAlign: 'left', padding: '0.75rem 1rem', border: 'none', backgroundColor: 'var(--primary)', color: 'white', borderRadius: '6px', fontWeight: 500, cursor: 'pointer' }}>
                Business Details
              </button>
            </li>
            <li>
              <button style={{ width: '100%', textAlign: 'left', padding: '0.75rem 1rem', border: 'none', backgroundColor: 'transparent', color: 'var(--text-main)', borderRadius: '6px', fontWeight: 500, cursor: 'pointer' }}>
                Invoice Settings
              </button>
            </li>
            <li>
              <button style={{ width: '100%', textAlign: 'left', padding: '0.75rem 1rem', border: 'none', backgroundColor: 'transparent', color: 'var(--text-main)', borderRadius: '6px', fontWeight: 500, cursor: 'pointer' }}>
                GST Settings
              </button>
            </li>
            <li>
              <button style={{ width: '100%', textAlign: 'left', padding: '0.75rem 1rem', border: 'none', backgroundColor: 'transparent', color: 'var(--text-main)', borderRadius: '6px', fontWeight: 500, cursor: 'pointer' }}>
                Users & Permissions
              </button>
            </li>
            <li>
              <button style={{ width: '100%', textAlign: 'left', padding: '0.75rem 1rem', border: 'none', backgroundColor: 'transparent', color: 'var(--text-main)', borderRadius: '6px', fontWeight: 500, cursor: 'pointer' }}>
                Locations
              </button>
            </li>
            <li>
              <button style={{ width: '100%', textAlign: 'left', padding: '0.75rem 1rem', border: 'none', backgroundColor: 'transparent', color: 'var(--text-main)', borderRadius: '6px', fontWeight: 500, cursor: 'pointer' }}>
                Backup
              </button>
            </li>
          </ul>
        </div>

        {/* Settings Content */}
        <div className="card" style={{ marginBottom: 0 }}>
          <h2 className="mb-6">Business Details</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Business Name</label>
              <input type="text" className="input" defaultValue="Mobile Accessories Wholesale & Trading" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>GSTIN</label>
              <input type="text" className="input" defaultValue="27AADCB2230M1Z5" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Phone Number</label>
              <input type="text" className="input" defaultValue="+91 9876543210" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Email Address</label>
              <input type="email" className="input" defaultValue="contact@mobileaccessories.com" />
            </div>
          </div>

          <div className="mb-6">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Business Address</label>
            <textarea className="input" rows="3" defaultValue="123, Wholesale Market, Mumbai, Maharashtra 400001"></textarea>
          </div>

          <div className="flex justify-end pt-4" style={{ borderTop: '1px solid var(--border)' }}>
            <button className="btn btn-primary">
              <Save size={18} /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
