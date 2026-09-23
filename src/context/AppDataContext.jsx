import React, { createContext, useState, useContext } from 'react';
import { 
  products as initialProducts, 
  customers as initialCustomers, 
  suppliers as initialSuppliers, 
  salesInvoices as initialSalesInvoices,
  recentTransactions as initialTransactions
} from '../data/mockData';

const AppDataContext = createContext();

export const AppDataProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);
  const [customers, setCustomers] = useState(initialCustomers);
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [salesInvoices, setSalesInvoices] = useState(initialSalesInvoices);
  const [transactions, setTransactions] = useState(initialTransactions);

  const addProduct = (product) => {
    setProducts([{ ...product, id: `p${products.length + 1}` }, ...products]);
  };

  const addCustomer = (customer) => {
    setCustomers([{ ...customer, id: `c${customers.length + 1}` }, ...customers]);
  };

  const addSupplier = (supplier) => {
    setSuppliers([{ ...supplier, id: `s${suppliers.length + 1}` }, ...suppliers]);
  };

  const addSale = (sale) => {
    const d = new Date();
    const formattedDate = `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
    
    const amountPaid = sale.amountPaid !== undefined ? sale.amountPaid : sale.total;
    const unpaidFromThisSale = sale.total - amountPaid;

    let invoiceStatus = 'Paid';
    if (amountPaid === 0) invoiceStatus = 'Unpaid';
    else if (unpaidFromThisSale > 0) invoiceStatus = 'Partial';

    const customerObj = customers.find(c => c.id === sale.customerId);
    const customerName = customerObj?.name || 'Walk-in';

    const newInvoice = {
      id: `INV-00${salesInvoices.length + 1}`,
      date: formattedDate,
      customer: customerName,
      items: sale.items.length,
      amount: sale.total,
      payment: sale.paymentMethod || (amountPaid > 0 ? 'Mixed' : 'Pay Later'),
      status: invoiceStatus
    };
    
    setSalesInvoices([newInvoice, ...salesInvoices]);
    setTransactions([{
      date: newInvoice.date,
      type: 'Sale',
      invoiceNo: newInvoice.id,
      entity: newInvoice.customer,
      amount: newInvoice.amount,
      status: invoiceStatus === 'Unpaid' ? 'Pending' : 'Completed'
    }, ...transactions]);

    // Update Customer Outstanding Balance & Purchases
    if (customerObj && customerObj.id !== 'c1') {
      const updatedCustomers = customers.map(c => {
        if (c.id === sale.customerId) {
          return {
            ...c,
            purchases: c.purchases + 1,
            outstanding: c.outstanding + unpaidFromThisSale,
            lastPurchase: formattedDate
          };
        }
        return c;
      });
      setCustomers(updatedCustomers);
    }

    // Deduct stock
    const updatedProducts = [...products];
    sale.items.forEach(item => {
      const prodIndex = updatedProducts.findIndex(p => p.id === item.product.id);
      if (prodIndex !== -1) {
        updatedProducts[prodIndex].stock -= item.qty;
      }
    });
    setProducts(updatedProducts);
  };

  const addPurchase = (purchase) => {
    const d = new Date();
    const formattedDate = `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
    
    const supplierObj = suppliers.find(s => s.id === purchase.supplierId);
    const supplierName = supplierObj?.name || 'Walk-in Supplier';

    setTransactions([{
      date: formattedDate,
      type: 'Purchase',
      invoiceNo: purchase.invoiceNo || `PUR-${Date.now().toString().slice(-6)}`,
      entity: supplierName,
      amount: purchase.grandTotal,
      status: 'Completed'
    }, ...transactions]);

    if (supplierObj) {
      const updatedSuppliers = suppliers.map(s => {
        if (s.id === purchase.supplierId) {
          return {
            ...s,
            purchases: s.purchases + 1,
            lastPurchase: formattedDate
          };
        }
        return s;
      });
      setSuppliers(updatedSuppliers);
    }

    const updatedProducts = [...products];
    purchase.items.forEach(item => {
      const prodIndex = updatedProducts.findIndex(p => p.id === item.product.id);
      if (prodIndex !== -1) {
        updatedProducts[prodIndex].stock += item.qty;
      }
    });
    setProducts(updatedProducts);
  };

  return (
    <AppDataContext.Provider value={{
      products, customers, suppliers, salesInvoices, transactions,
      addProduct, addCustomer, addSupplier, addSale, addPurchase
    }}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => useContext(AppDataContext);
