import ItemListContainer from "../components/ItemListContainer/ItemListContainer";
import "../App.scss";
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from "react-router-dom";
import classnames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import PaymentForm from './Stripe/Components/PaymentForm';
import Wrapper from '../components/Wrapper'
import CartContext from '../context/CartContext'
import styles from './Stripe/Stripe.module.scss'
import PaymentService from '../services/paymentService';
import { Elements } from '@stripe/react-stripe-js';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);


const Payment = (order) => {

    console.log("apenas llega", order.orderTotal)
 

  const [clientSecret,setClientSecret] = useState(null);
  
  


  useEffect(() => {
    const getClientSecret = async () => {
        //const {totalPrice} = orderDetails
        //const totalPrice = order.orderTotal.totalPrice
        //console.log("totalPrice en useEfect", totalPrice);
        const service = new PaymentService();
        service.createPaymentIntent({total:order.orderTotal,callbackSuccess:callbackSuccessPaymentIntent,callbackError:callbackErrorPaymentIntent})
    }
    getClientSecret();
}, [order])
const callbackSuccessPaymentIntent = (res) =>{
    setClientSecret(res.data.payload.client_secret)
}

const callbackErrorPaymentIntent = err => {
    console.log(err);
}
  return (
    <section className="main-container">
        <>
        <div className={styles.container}>
            {console.log("OrderID ", order)}
            <h1 className={styles.title}>Stripe, about to pay {order.orderTotal} USD</h1>
            <h1></h1>
        </div>
        <div className={classnames([styles.container, styles.highlighted])}>
            <Wrapper hidden={!clientSecret||!stripePromise}>
                <Elements stripe={stripePromise} options={{clientSecret:clientSecret}}>
                    <PaymentForm/>
                </Elements>
            </Wrapper>
        </div>
    </>
      
    </section>
  );
};

export default Payment;
