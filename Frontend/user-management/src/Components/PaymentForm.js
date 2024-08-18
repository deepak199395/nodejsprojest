import React, { useState } from 'react';
import axios from 'axios';
import '../../src/Components/PaymentForm.css'; 
import googlePayLogo from '../../src/assets/google-pay.png'; 
import phonePayLogo from '../../src/assets/phone-pay.png'; 
import netBankingLogo from '../../src/assets/net-banking.png'; 
import qrCodeImage from '../../src/assets/fake-qr-code.png'; 
import cardPaymentLogo from '../../src/assets/card-payment.png'; 
import visaLogo from '../../src/assets/visa.png'; 
import masterCardLogo from '../../src/assets/mastercard.png';
import ruPayLogo from '../../src/assets/rupay.png'; 
import bhimLogo from '../../src/assets/bhim.png'; 

const PaymentForm = ({ clientToken, onNewTransaction }) => {
  const [paymentMethodNonce, setPaymentMethodNonce] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [upiId, setUpiId] = useState('');
  const [selectedCard, setSelectedCard] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
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
    } else if (selectedMethod === 'card-payment') {
      paymentData.cardDetails = { ...cardDetails, selectedCard };
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
    const regex = /^[A-Za-z\s]+$/;
    if (name === 'bankName' || name === 'branchName') {
      if (regex.test(value) || value === '') {
        setBankDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
      }
    } else {
      setBankDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    }
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
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
        <div className="payment-method" onClick={() => setSelectedMethod('card-payment')}>
          <img src={cardPaymentLogo} alt="Card Payment" />
          <span>Card Payment</span>
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
              placeholder="Enter your bank name"
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
              placeholder="Enter your bank's IFSC code"
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
              placeholder="Enter your bank's branch name"
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
              placeholder="Enter your UPI ID"
              required
            />
          </div>
          <div className="qr-code-container">
            <img src={qrCodeImage} alt="QR Code" className="qr-code" />
          </div>
        </div>
      )}
      {selectedMethod === 'card-payment' && (
        <div className="card-payment-form">
          <div className="card-selection">
            <label>
              <input
                type="radio"
                name="card"
                value="visa"
                checked={selectedCard === 'visa'}
                onChange={() => setSelectedCard('visa')}
              />
              <img src={visaLogo} alt="Visa" className="card-logo" />
            </label>
            <label>
              <input
                type="radio"
                name="card"
                value="mastercard"
                checked={selectedCard === 'mastercard'}
                onChange={() => setSelectedCard('mastercard')}
              />
              <img src={masterCardLogo} alt="MasterCard" className="card-logo" />
            </label>
            <label>
              <input
                type="radio"
                name="card"
                value="rupay"
                checked={selectedCard === 'rupay'}
                onChange={() => setSelectedCard('rupay')}
              />
              <img src={ruPayLogo} alt="RuPay" className="card-logo" />
            </label>
            <label>
              <input
                type="radio"
                name="card"
                value="bhim"
                checked={selectedCard === 'bhim'}
                onChange={() => setSelectedCard('bhim')}
              />
              <img src={bhimLogo} alt="BHIM" className="card-logo" />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number:</label>
            <input
              id="cardNumber"
              name="cardNumber"
              type="text"
              value={cardDetails.cardNumber}
              onChange={handleCardDetailsChange}
              className="form-control"
              placeholder="0000 0000 0000 0000"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date:</label>
            <input
              id="expiryDate"
              name="expiryDate"
              type="text"
              value={cardDetails.expiryDate}
              onChange={handleCardDetailsChange}
              className="form-control"
              placeholder="MM/YY"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV:</label>
            <input
              id="cvv"
              name="cvv"
              type="text"
              value={cardDetails.cvv}
              onChange={handleCardDetailsChange}
              className="form-control"
              placeholder="Enter your card's CVV"
              required
            />
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
            placeholder="Enter the amount"
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
            placeholder="Enter the payment method nonce"
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
