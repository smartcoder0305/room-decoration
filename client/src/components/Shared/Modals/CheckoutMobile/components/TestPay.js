import React from 'react'
import ReactDOM from "react-dom";
import { useHistory } from 'react-router-dom';
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
function TestPay({totalPrice, frames}) {
    const history = useHistory()
    function _createOrder(data, actions) {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: totalPrice.toString(),
              },
            },
          ],
        });
      }
      async function _onApprove(data, actions) {
        let order = await actions.order.capture();

        alert("Transaction completed by " + order.payer.name.given_name +" "+ order.payer.name.surname);
        history.push(`/payment-success?price=${totalPrice}&orderid=${order.id}&email=${order.purchase_units[0].payee.email_address}&imagescount=${frames}`)
        console.log(order);
        return order;
      }
      function _onError(err) {
        alert(`Transaction Failed`);
      }
  return (
    <div className="App">
    <PayPalButton
      createOrder={(data, actions) => _createOrder(data, actions)}
      onApprove={(data, actions) => _onApprove(data, actions)}
      onCancel={() => _onError("Canceled")}
      onError={(err) => _onError(err)}
    />
  </div>
  )
}

export default TestPay