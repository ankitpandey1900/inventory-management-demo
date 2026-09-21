export const products = [
  { id: 'p1', sku: 'CASE15B', name: 'iPhone 15 Case (Silicone)', brand: 'Apple', category: 'Cases', stock: 1250, reorderLevel: 200, purchasePrice: 80, sellingPrice: 120, location: 'Main Warehouse', status: 'In Stock' },
  { id: 'p2', sku: 'CBL001', name: 'Type C Cable 1m', brand: 'Portronics', category: 'Cables', stock: 980, reorderLevel: 150, purchasePrice: 20, sellingPrice: 45, location: 'Main Warehouse', status: 'In Stock' },
  { id: 'p3', sku: 'CHG20W', name: '20W Charger', brand: 'Samsung', category: 'Chargers', stock: 450, reorderLevel: 100, purchasePrice: 150, sellingPrice: 250, location: 'Shop', status: 'In Stock' },
  { id: 'p4', sku: 'SG001', name: 'Tempered Glass', brand: 'Generic', category: 'Screen Protectors', stock: 75, reorderLevel: 100, purchasePrice: 10, sellingPrice: 25, location: 'Main Warehouse', status: 'Low Stock' },
  { id: 'p5', sku: 'EP001', name: 'Earphones', brand: 'Realme', category: 'Audio', stock: 620, reorderLevel: 100, purchasePrice: 40, sellingPrice: 60, location: 'Shop', status: 'In Stock' },
  { id: 'p6', sku: 'PB001', name: 'Power Bank 10000mAh', brand: 'Mi', category: 'Power Banks', stock: 320, reorderLevel: 50, purchasePrice: 450, sellingPrice: 700, location: 'Main Warehouse', status: 'In Stock' },
  { id: 'p7', sku: 'PH001', name: 'Mobile Holder', brand: 'Portronics', category: 'Other Accessories', stock: 45, reorderLevel: 50, purchasePrice: 80, sellingPrice: 150, location: 'Shop', status: 'Low Stock' },
  { id: 'p8', sku: 'WS001', name: 'Watch Strap', brand: 'Generic', category: 'Accessories', stock: 1800, reorderLevel: 300, purchasePrice: 20, sellingPrice: 50, location: 'Main Warehouse', status: 'In Stock' },
  { id: 'p9', sku: 'CASE14T', name: 'iPhone 14 Transparent Case', brand: 'Generic', category: 'Cases', stock: 430, reorderLevel: 100, purchasePrice: 30, sellingPrice: 70, location: 'Shop', status: 'In Stock' },
  { id: 'p10', sku: 'CBLLGT', name: 'Lightning Cable 2m', brand: 'Apple', category: 'Cables', stock: 150, reorderLevel: 100, purchasePrice: 150, sellingPrice: 250, location: 'Main Warehouse', status: 'In Stock' },
];

export const customers = [
  { id: 'c1', name: 'Walk-in Customer', phone: '-', gstin: '-', purchases: 15, outstanding: 0, lastPurchase: '2026-09-20' },
  { id: 'c2', name: 'Tech World', phone: '9876543210', gstin: '27AADCB2230M1Z2', purchases: 45, outstanding: 12500, lastPurchase: '2026-09-18' },
  { id: 'c3', name: 'Mobile Planet', phone: '9876543211', gstin: '27AADCB2230M1Z3', purchases: 12, outstanding: 4200, lastPurchase: '2026-09-19' },
  { id: 'c4', name: 'Gadget Hub', phone: '9876543212', gstin: '27AADCB2230M1Z4', purchases: 8, outstanding: 0, lastPurchase: '2026-09-10' },
];

export const suppliers = [
  { id: 's1', name: 'Shree Telecom', phone: '8876543210', gstin: '07BBDCB2230M1Z2', purchases: 120, outstanding: 45000, lastPurchase: '2026-09-15' },
  { id: 's2', name: 'Mega Accessories', phone: '8876543211', gstin: '07BBDCB2230M1Z3', purchases: 65, outstanding: 12000, lastPurchase: '2026-09-10' },
  { id: 's3', name: 'China Imports Ltd', phone: '8876543212', gstin: '07BBDCB2230M1Z4', purchases: 230, outstanding: 0, lastPurchase: '2026-09-01' },
];

export const salesInvoices = [
  { id: 'INV-001', date: '2026-09-21', customer: 'Walk-in Customer', items: 2, amount: 240, payment: 'Cash', status: 'Paid' },
  { id: 'INV-002', date: '2026-09-21', customer: 'Tech World', items: 15, amount: 4500, payment: 'Credit', status: 'Unpaid' },
  { id: 'INV-003', date: '2026-09-20', customer: 'Mobile Planet', items: 5, amount: 1200, payment: 'UPI', status: 'Paid' },
  { id: 'INV-004', date: '2026-09-19', customer: 'Gadget Hub', items: 8, amount: 3200, payment: 'Bank Transfer', status: 'Paid' },
];

export const recentTransactions = [
  { date: '2026-09-21', type: 'Sale', invoiceNo: 'INV-001', entity: 'Walk-in Customer', amount: 240, status: 'Completed' },
  { date: '2026-09-21', type: 'Sale', invoiceNo: 'INV-002', entity: 'Tech World', amount: 4500, status: 'Pending' },
  { date: '2026-09-20', type: 'Purchase', invoiceNo: 'PUR-056', entity: 'Shree Telecom', amount: 15000, status: 'Completed' },
  { date: '2026-09-20', type: 'Sale', invoiceNo: 'INV-003', entity: 'Mobile Planet', amount: 1200, status: 'Completed' },
];
