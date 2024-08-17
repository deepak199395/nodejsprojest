import React, { useState } from 'react';
import axios from 'axios';
import '../../src/Components/PaymentForm.css'; // Import CSS file for styling
import googlePayLogo from '../../src/assets/google-pay.png'; // Replace with the actual path to the Google Pay logo
import phonePayLogo from '../../src/assets/phone-pay.png'; // Replace with the actual path to the Phone Pay logo
import netBankingLogo from '../../src/assets/net-banking.png'; // Replace with the actual path to the Net Banking logo
import qrCodeImage from '../../src/assets/fake-qr-code.png'; // Replace with the actual path to the fake QR code image

const PaymentForm = ({ clientToken, onNewTransaction }) => {
  const [paymentMethodNonce, setPaymentMethodNonce] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [upiId, setUpiId] = useState('');
  const [bankDetails, setBankDetails] = useState({
    bankName: '',
    ifscCode: '',
    branchName: '',
  });
  const [transactions, setTransactions] = useState([]); // Define transactions state

  const handleSubmit = async (e) => {
    e.preventDefault();
    const paymentData = {
      paymentMethodNonce,
      amount,
      paymentMethod: selectedMethod,
    };

    if (selectedMethod === 'net-banking') {
      paymentData.bankDetails = bankDetails;
    } else if (selectedMethod === 'phone-pay') {
      paymentData.upiId = upiId;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/v1/user/process-payment', paymentData);
      const newTransaction = { id: Date.now(), amount, status: response.data.success ? 'Success' : 'Failed' };
      setTransactions([...transactions, newTransaction]);
      onNewTransaction(newTransaction);
    } catch (error) {
      console.error('Error processing payment', error);
      const newTransaction = { id: Date.now(), amount, status: 'Failed' };
      setTransactions([...transactions, newTransaction]);
      onNewTransaction(newTransaction);
    }
  };

  const handleBankDetailsChange = (e) => {
    const { name, value } = e.target;
    setBankDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  return (
    <div className="payment-form-container">
      <h2 className="form-title">Process Payment</h2>
      <div className="payment-methods">
        <div className="payment-method" onClick={() => setSelectedMethod('google-pay')}>
          <img src={googlePayLogo} alt="Google Pay" />
          <span>Google Pay</span>
        </div>
        <div className="payment-method" onClick={() => setSelectedMethod('phone-pay')}>
          <img src={phonePayLogo} alt="Phone Pay" />
          <span>Phone Pay</span>
        </div>
        <div className="payment-method" onClick={() => setSelectedMethod('net-banking')}>
          <img src={netBankingLogo} alt="Net Banking" />
          <span>Net Banking</span>
        </div>
      </div>
      {selectedMethod === 'net-banking' && (
        <div className="net-banking-form">
          <div className="form-group">
            <label htmlFor="bankName">Bank Name:</label>
            <input
              id="bankName"
              name="bankName"
              type="text"
              value={bankDetails.bankName}
              onChange={handleBankDetailsChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="ifscCode">IFSC Code:</label>
            <input
              id="ifscCode"
              name="ifscCode"
              type="text"
              value={bankDetails.ifscCode}
              onChange={handleBankDetailsChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="branchName">Branch Name:</label>
            <input
              id="branchName"
              name="branchName"
              type="text"
              value={bankDetails.branchName}
              onChange={handleBankDetailsChange}
              className="form-control"
              required
            />
          </div>
        </div>
      )}
      {selectedMethod === 'phone-pay' && (
        <div className="phone-pay-form">
          <div className="form-group">
            <label htmlFor="upiId">UPI ID:</label>
            <input
              id="upiId"
              name="upiId"
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="qr-code-container">
            <img src={qrCodeImage} alt="QR Code" className="qr-code" />
          </div>
        </div>
      )}
      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="payment-method-nonce">Payment Method Nonce:</label>
          <input
            id="payment-method-nonce"
            type="text"
            value={paymentMethodNonce}
            onChange={(e) => setPaymentMethodNonce(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="submit-button">Pay</button>
      </form>
      <div className="transactions-table">
        <h3 className="form-title">Transactions</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.amount}</td>
                <td className={`status-${transaction.status.toLowerCase()}`}>{transaction.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentForm;
