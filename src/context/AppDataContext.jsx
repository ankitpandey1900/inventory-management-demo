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
    
    const newInvoice = {
      id: `INV-00${salesInvoices.length + 1}`,
      date: formattedDate,
      customer: customers.find(c => c.id === sale.customerId)?.name || 'Walk-in',
      items: sale.items.length,
      amount: sale.total,
      payment: sale.paymentMethod,
      status: 'Paid'
    };
    setSalesInvoices([newInvoice, ...salesInvoices]);
    setTransactions([{
      date: newInvoice.date,
      type: 'Sale',
      invoiceNo: newInvoice.id,
      entity: newInvoice.customer,
      amount: newInvoice.amount,
      status: 'Completed'
    }, ...transactions]);

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

  return (
    <AppDataContext.Provider value={{
      products, customers, suppliers, salesInvoices, transactions,
      addProduct, addCustomer, addSupplier, addSale
    }}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => useContext(AppDataContext);
