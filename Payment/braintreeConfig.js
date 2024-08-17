import braintree from 'braintree';

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId:'zfnjkh8389yq4tsc',
  publicKey:'kzzx5r6kvjxy6hn2',
  privateKey:'963400322f7f531eae210cde28775574'
});

export default gateway;
