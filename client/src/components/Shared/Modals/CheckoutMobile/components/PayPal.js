import React from 'react'
import { useHistory } from 'react-router-dom';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

function PayPal({ totalPrice, imagecount }) {
  const history = useHistory()
  // const PayPalScriptOptions = {
  //   "client-id": "AXRDxDcjIt3kHbhppoqJTU3KkDDknlBAif8LTLhepCqRutQcoGNL7YQVMApf7AZwF-wuq13iMxW3DhmL",
  //   currency: "ILS"
  // };
  const initialOptions = {
    "client-id": "test",
    currency: "ILS",
    intent: "capture"
  };
  // console.log(totalPrice)
  const totalAmount = parseInt(localStorage.getItem('totalamount'))
  // console.log(typeof totalAmount)
  // console.log(typeof totalPrice)
  // console.log(totalAmount & totalPrice)
  // const amount = {
  //   value: totalAmount,
  // }



  const createOrderHandler = (data, actions) => {
    // Set up the transaction
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalPrice
          }
        }
      ]
    });
  };


  const onApproveHandler = (data, actions) => {
    // This function captures the funds from the transaction.
    return actions.order.capture().then(function (details) {
      // This function shows a transaction success message to your buyer.
      alert("Transaction completed by " + details.payer.name.given_name);
      history.push(`/payment-success?price=${totalPrice}&orderid=${data.orderID}&email=max@gmail.com&imagescount=${imagecount}`)
    });
  };



  return (
  <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          createOrder={createOrderHandler}
          onApprove={onApproveHandler}
          onError={(err) => {
            alert(`Transaction Failed`);
          }}
        onCancel={() => {
          alert(`Transaction Failed`);
        }}
        />
      </PayPalScriptProvider>
  )
}

export default PayPal