import React, { useState } from 'react';
import { UploadCloud, CheckCircle, AlertTriangle } from 'lucide-react';

const ExcelImport = () => {
  const [step, setStep] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    setStep(2);
  };

  return (
    <div>
      <div className="mb-6">
        <h1>Import Products via Excel</h1>
        <p className="mb-0">Bulk add or update products using an Excel file</p>
      </div>

      <div className="card">
        <div className="flex gap-4 mb-8" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
          <div className="flex items-center gap-2" style={{ color: step >= 1 ? 'var(--primary)' : 'var(--text-muted)' }}>
            <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: step >= 1 ? 'var(--primary)' : 'var(--border)', color: step >= 1 ? 'white' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem' }}>1</span>
            <span style={{ fontWeight: 500 }}>Upload File</span>
          </div>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)', marginTop: '12px' }}></div>
          <div className="flex items-center gap-2" style={{ color: step >= 2 ? 'var(--primary)' : 'var(--text-muted)' }}>
            <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: step >= 2 ? 'var(--primary)' : 'var(--border)', color: step >= 2 ? 'white' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem' }}>2</span>
            <span style={{ fontWeight: 500 }}>Preview & Validate</span>
          </div>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)', marginTop: '12px' }}></div>
          <div className="flex items-center gap-2" style={{ color: step >= 3 ? 'var(--primary)' : 'var(--text-muted)' }}>
            <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: step >= 3 ? 'var(--primary)' : 'var(--border)', color: step >= 3 ? 'white' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem' }}>3</span>
            <span style={{ fontWeight: 500 }}>Import Data</span>
          </div>
        </div>

        {step === 1 && (
          <div 
            style={{
              border: `2px dashed ${isDragging ? 'var(--primary)' : 'var(--border)'}`,
              borderRadius: '8px',
              padding: '4rem 2rem',
              textAlign: 'center',
              backgroundColor: isDragging ? 'rgba(37, 99, 235, 0.05)' : 'transparent',
              transition: 'all 0.2s ease'
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <UploadCloud size={48} color="var(--primary)" style={{ margin: '0 auto 1rem auto' }} />
            <h3 className="mb-2">Drag Excel file here</h3>
            <p className="mb-4">or click to browse your files (.xlsx, .xls, .csv)</p>
            <button className="btn btn-primary" onClick={() => setStep(2)}>
              Choose Excel File
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="flex gap-6 mb-6">
              <div className="flex items-center gap-2" style={{ padding: '1rem', backgroundColor: 'var(--success-bg)', borderRadius: '6px', flex: 1 }}>
                <CheckCircle size={24} color="var(--success)" />
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--success)' }}>1,240 rows ready</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--success)' }}>Ready to import</div>
                </div>
              </div>
              <div className="flex items-center gap-2" style={{ padding: '1rem', backgroundColor: 'var(--warning-bg)', borderRadius: '6px', flex: 1 }}>
                <AlertTriangle size={24} color="var(--warning)" />
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--warning)' }}>12 duplicate SKUs</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--warning)' }}>Will be skipped</div>
                </div>
              </div>
              <div className="flex items-center gap-2" style={{ padding: '1rem', backgroundColor: 'var(--danger-bg)', borderRadius: '6px', flex: 1 }}>
                <AlertTriangle size={24} color="var(--danger)" />
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--danger)' }}>5 missing prices</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--danger)' }}>Needs attention</div>
                </div>
              </div>
            </div>

            <div className="table-container mb-6">
              <table className="table">
                <thead>
                  <tr>
                    <th>SKU</th>
                    <th>Product Name</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Qty</th>
                    <th>Purchase Price</th>
                    <th>Selling Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>CASE15B</td>
                    <td>iPhone 15 Case (Silicone)</td>
                    <td>Apple</td>
                    <td>Cases</td>
                    <td>1250</td>
                    <td>₹80</td>
                    <td>₹120</td>
                  </tr>
                  <tr>
                    <td>CBL001</td>
                    <td>Type C Cable 1m</td>
                    <td>Portronics</td>
                    <td>Cables</td>
                    <td>980</td>
                    <td>₹20</td>
                    <td>₹45</td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--text-muted)' }}>...</td>
                    <td style={{ color: 'var(--text-muted)' }}>...</td>
                    <td style={{ color: 'var(--text-muted)' }}>...</td>
                    <td style={{ color: 'var(--text-muted)' }}>...</td>
                    <td style={{ color: 'var(--text-muted)' }}>...</td>
                    <td style={{ color: 'var(--text-muted)' }}>...</td>
                    <td style={{ color: 'var(--text-muted)' }}>...</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-3">
              <button className="btn btn-secondary" onClick={() => setStep(1)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => setStep(3)}>Import Valid Rows</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <CheckCircle size={64} color="var(--success)" style={{ margin: '0 auto 1.5rem auto' }} />
            <h2 className="mb-2">Import Successful!</h2>
            <p className="mb-6">1,240 products have been added or updated in your inventory.</p>
            <button className="btn btn-primary" onClick={() => setStep(1)}>Import Another File</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExcelImport;
