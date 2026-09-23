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
  { id: 'p11', sku: 'APDPRO', name: 'AirPods Pro Case Cover', brand: 'Generic', category: 'Cases', stock: 350, reorderLevel: 50, purchasePrice: 40, sellingPrice: 90, location: 'Shop', status: 'In Stock' },
  { id: 'p12', sku: 'CHG65W', name: '65W Fast Charger', brand: 'OnePlus', category: 'Chargers', stock: 120, reorderLevel: 50, purchasePrice: 400, sellingPrice: 750, location: 'Main Warehouse', status: 'In Stock' },
  { id: 'p13', sku: 'CBL3IN1', name: '3-in-1 Charging Cable', brand: 'Boat', category: 'Cables', stock: 45, reorderLevel: 100, purchasePrice: 90, sellingPrice: 180, location: 'Shop', status: 'Low Stock' },
  { id: 'p14', sku: 'SG002', name: 'Privacy Screen Guard', brand: 'Generic', category: 'Screen Protectors', stock: 820, reorderLevel: 200, purchasePrice: 25, sellingPrice: 60, location: 'Main Warehouse', status: 'In Stock' },
  { id: 'p15', sku: 'RING01', name: 'Mobile Ring Stand', brand: 'Generic', category: 'Other Accessories', stock: 1500, reorderLevel: 500, purchasePrice: 8, sellingPrice: 30, location: 'Main Warehouse', status: 'In Stock' },
  { id: 'p16', sku: 'TRIPOD1', name: 'Mini Tripod Stand', brand: 'Digitek', category: 'Other Accessories', stock: 200, reorderLevel: 50, purchasePrice: 120, sellingPrice: 250, location: 'Shop', status: 'In Stock' },
  { id: 'p17', sku: 'ADPT01', name: 'OTG Adapter Type-C', brand: 'Portronics', category: 'Accessories', stock: 950, reorderLevel: 200, purchasePrice: 15, sellingPrice: 40, location: 'Main Warehouse', status: 'In Stock' },
  { id: 'p18', sku: 'TWS001', name: 'TWS Wireless Earbuds', brand: 'Boat', category: 'Audio', stock: 140, reorderLevel: 50, purchasePrice: 600, sellingPrice: 999, location: 'Main Warehouse', status: 'In Stock' },
  { id: 'p19', sku: 'CARCHG', name: 'Dual USB Car Charger', brand: 'Ambrane', category: 'Chargers', stock: 320, reorderLevel: 100, purchasePrice: 150, sellingPrice: 299, location: 'Shop', status: 'In Stock' },
  { id: 'p20', sku: 'PB002', name: 'Power Bank 20000mAh', brand: 'Mi', category: 'Power Banks', stock: 85, reorderLevel: 100, purchasePrice: 850, sellingPrice: 1299, location: 'Main Warehouse', status: 'Low Stock' },
];

export const customers = [
  { id: 'c1', name: 'Walk-in Customer', phone: '-', gstin: '-', purchases: 32, outstanding: 0, lastPurchase: '21-09-2026' },
  { id: 'c2', name: 'Tech World', phone: '9876543210', gstin: '27AADCB2230M1Z2', purchases: 45, outstanding: 12500, lastPurchase: '18-09-2026' },
  { id: 'c3', name: 'Mobile Planet', phone: '9876543211', gstin: '27AADCB2230M1Z3', purchases: 12, outstanding: 4200, lastPurchase: '19-09-2026' },
  { id: 'c4', name: 'Gadget Hub', phone: '9876543212', gstin: '27AADCB2230M1Z4', purchases: 8, outstanding: 0, lastPurchase: '10-09-2026' },
  { id: 'c5', name: 'Shiva Mobiles', phone: '9876543213', gstin: '27AADCB2230M1Z5', purchases: 24, outstanding: 28000, lastPurchase: '15-09-2026' },
  { id: 'c6', name: 'Raju Accessories', phone: '9876543214', gstin: '-', purchases: 6, outstanding: 1500, lastPurchase: '05-09-2026' },
  { id: 'c7', name: 'Global Tech Store', phone: '9876543215', gstin: '27AADCB2230M1Z7', purchases: 112, outstanding: 125000, lastPurchase: '20-09-2026' },
  { id: 'c8', name: 'Sagar Electronics', phone: '9876543216', gstin: '27AADCB2230M1Z8', purchases: 18, outstanding: 8600, lastPurchase: '14-09-2026' },
  { id: 'c9', name: 'City Center Hub', phone: '9876543217', gstin: '27AADCB2230M1Z9', purchases: 3, outstanding: 0, lastPurchase: '02-09-2026' },
  { id: 'c10', name: 'Alpha Communications', phone: '9876543218', gstin: '27AADCB2230M1Z0', purchases: 41, outstanding: 18400, lastPurchase: '17-09-2026' },
];

export const suppliers = [
  { id: 's1', name: 'Shree Telecom', phone: '8876543210', gstin: '07BBDCB2230M1Z2', purchases: 120, outstanding: 45000, lastPurchase: '15-09-2026' },
  { id: 's2', name: 'Mega Accessories', phone: '8876543211', gstin: '07BBDCB2230M1Z3', purchases: 65, outstanding: 12000, lastPurchase: '10-09-2026' },
  { id: 's3', name: 'China Imports Ltd', phone: '8876543212', gstin: '07BBDCB2230M1Z4', purchases: 230, outstanding: 0, lastPurchase: '01-09-2026' },
  { id: 's4', name: 'Mumbai Wholesale Dist', phone: '8876543213', gstin: '27BBDCB2230M1Z5', purchases: 45, outstanding: 28500, lastPurchase: '12-09-2026' },
  { id: 's5', name: 'Delhi Traders', phone: '8876543214', gstin: '07BBDCB2230M1Z6', purchases: 18, outstanding: 0, lastPurchase: '25-08-2026' },
];

export const salesInvoices = [
  { id: 'INV-001', date: '21-09-2026', customer: 'Walk-in Customer', items: 2, amount: 240, payment: 'Cash', status: 'Paid' },
  { id: 'INV-002', date: '21-09-2026', customer: 'Tech World', items: 15, amount: 4500, payment: 'Credit', status: 'Unpaid' },
  { id: 'INV-003', date: '20-09-2026', customer: 'Mobile Planet', items: 5, amount: 1200, payment: 'UPI', status: 'Paid' },
  { id: 'INV-004', date: '19-09-2026', customer: 'Gadget Hub', items: 8, amount: 3200, payment: 'Bank Transfer', status: 'Paid' },
  { id: 'INV-005', date: '18-09-2026', customer: 'Tech World', items: 12, amount: 8000, payment: 'Credit', status: 'Unpaid' },
  { id: 'INV-006', date: '17-09-2026', customer: 'Alpha Communications', items: 25, amount: 18400, payment: 'Credit', status: 'Unpaid' },
  { id: 'INV-007', date: '15-09-2026', customer: 'Shiva Mobiles', items: 40, amount: 28000, payment: 'Mixed', status: 'Partial' },
  { id: 'INV-008', date: '14-09-2026', customer: 'Sagar Electronics', items: 10, amount: 8600, payment: 'Credit', status: 'Unpaid' },
  { id: 'INV-009', date: '10-09-2026', customer: 'Gadget Hub', items: 20, amount: 5000, payment: 'UPI', status: 'Paid' },
  { id: 'INV-010', date: '05-09-2026', customer: 'Raju Accessories', items: 5, amount: 1500, payment: 'Credit', status: 'Unpaid' },
];

export const recentTransactions = [
  { date: '21-09-2026', type: 'Sale', invoiceNo: 'INV-001', entity: 'Walk-in Customer', amount: 240, status: 'Completed' },
  { date: '21-09-2026', type: 'Sale', invoiceNo: 'INV-002', entity: 'Tech World', amount: 4500, status: 'Pending' },
  { date: '20-09-2026', type: 'Purchase', invoiceNo: 'PUR-056', entity: 'Shree Telecom', amount: 15000, status: 'Completed' },
  { date: '20-09-2026', type: 'Sale', invoiceNo: 'INV-003', entity: 'Mobile Planet', amount: 1200, status: 'Completed' },
  { date: '19-09-2026', type: 'Sale', invoiceNo: 'INV-004', entity: 'Gadget Hub', amount: 3200, status: 'Completed' },
  { date: '18-09-2026', type: 'Sale', invoiceNo: 'INV-005', entity: 'Tech World', amount: 8000, status: 'Pending' },
  { date: '18-09-2026', type: 'Payment In', invoiceNo: 'REC-012', entity: 'Mobile Planet', amount: 3000, status: 'Completed' },
  { date: '17-09-2026', type: 'Sale', invoiceNo: 'INV-006', entity: 'Alpha Communications', amount: 18400, status: 'Pending' },
  { date: '15-09-2026', type: 'Sale', invoiceNo: 'INV-007', entity: 'Shiva Mobiles', amount: 28000, status: 'Pending' },
  { date: '14-09-2026', type: 'Sale', invoiceNo: 'INV-008', entity: 'Sagar Electronics', amount: 8600, status: 'Pending' },
  { date: '12-09-2026', type: 'Purchase', invoiceNo: 'PUR-055', entity: 'Mumbai Wholesale Dist', amount: 28500, status: 'Pending' },
  { date: '10-09-2026', type: 'Sale', invoiceNo: 'INV-009', entity: 'Gadget Hub', amount: 5000, status: 'Completed' },
];
