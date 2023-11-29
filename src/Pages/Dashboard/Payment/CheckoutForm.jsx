import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseCart from "../../../Hooks/UseCart";
import { AuthContext } from "../../../Providers/AuthProviders";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const { user } = useContext(AuthContext);
  const stripe = useStripe(import.meta.env.VITE_Payment_Gateway_PK);
  const elements = useElements();
  const axiosSecure = UseAxiosSecure();
  const [cart, refetch] = UseCart();
  const navigate = useNavigate();
  const price = cart.reduce((total, item) => total + item.price, 0)

  useEffect(() => {
    if (price > 0) {
      const res = axiosSecure.post('/create-payment-intent', { price }).then(res => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      })
    }
  }, [axiosSecure, price])


  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    })

    if (error) {
      console.log('Payment error', error);
      setError(error.message);
    } else {
      console.log('Payment method', paymentMethod);
      setError('');
    }


    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user.email || 'anonymous',
          name: user.displayName || 'anonymous'
        }
      }
    })

    if (confirmError) {
      console.log('confirm error')
    } else {
      console.log('payment intent', paymentIntent);
      if (paymentIntent.status === 'succeeded') {
        console.log('Transaction id', paymentIntent.id);
        setTransactionId(paymentIntent.id);


        const payment = {
          email: user.email,
          price,
          date: new Date(),
          transactionId: paymentIntent.id,
          cartIds: cart.map(item => item._id),
          menuItemIds: cart.map(item => item.menuId),
          status: 'pending'

        }


        const res = await axiosSecure.post('/payments', payment);
        console.log('Payment Saved', res);
        refetch();
        if (res.data.paymentResult.insertedId) {
          Swal.fire({
            title: "Thanks for your payment!",
            text: "Payment Successful!",
            icon: "success"
          });

          navigate('/dashboard/paymentHistory');
        }

      }


    }

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>

        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />

        <button className="btn btn-sm btn-accent" type="submit" disabled={!stripe || !clientSecret}>
          Pay
        </button>

        <p className="text-red-600 text-xl">{error}</p>
        {transactionId && <p className="text-green-600 text-2xl">Your TransactionId :- {transactionId}</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;