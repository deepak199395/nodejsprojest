import React, { useEffect, useState } from 'react';
import DropIn from 'braintree-web-drop-in-react';
import axios from 'axios';

const Payment = () => {
  const [clientToken, setClientToken] = useState(null);
  const [instance, setInstance] = useState(null);
  const [amount] = useState('10.00'); 

  useEffect(() => {
    const fetchClientToken = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/user/get-client-token');
        setClientToken(response.data.clientToken);
      } catch (error) {
        console.error('Failed to fetch client token:', error);
      }
    };
    fetchClientToken();
  }, []);

  const handlePayment = async () => {
    try {
      if (!instance) {
        alert('Payment instance not initialized.');
        return;
      }
      const { nonce } = await instance.requestPaymentMethod();
      const response = await axios.post('http://localhost:8080/api/v1/user/process-payment', {
        paymentMethodNonce: nonce,
        amount
      });
   console.log(response);
      if (response.data.success) {
        alert('Payment successful!');
      } else {
        alert('Payment failed: ' + response.data.error);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment processing failed');
    }
  };

  return (
    <div>
      {clientToken ? (
        <div>
          <DropIn
            options={{ authorization: clientToken }}
            onInstance={instance => setInstance(instance)}
          />
          <button onClick={handlePayment}>Pay</button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Payment;
