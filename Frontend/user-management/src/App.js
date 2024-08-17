import React, { useState, useEffect } from 'react';
import PaymentForm from './Components/PaymentForm';
import Transactions from './Components/Transactions';
import axios from 'axios';

const App = () => {
  const [clientToken, setClientToken] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch client token
    axios.get('http://localhost:8000/api/v1/user/get-client-token')
      .then(response => {
        setClientToken(response.data);
      })
      .catch(error => {
        console.error('Error fetching client token', error);
      });

    // Dummy transactions
    setTransactions([
      { id: 1, amount: '100.00', status: 'Success' },
      { id: 2, amount: '50.00', status: 'Failed' }
    ]);
  }, []);

  const handleNewTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  return (
    <div>
      <h1>Payment Gateway</h1>
      <PaymentForm clientToken={clientToken} onNewTransaction={handleNewTransaction} />
      <Transactions transactions={transactions} />
    </div>
  );
};

export default App;
