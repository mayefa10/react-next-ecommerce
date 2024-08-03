'use client';

import { AddressElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useCart } from '../../../hooks/useCart';
import { useEffect, useState } from 'react';
import { formatPrice } from '../../../utils/formatPrice';
import toast from 'react-hot-toast';
import Heading from '../components/Heading';
import Button from '../components/Button';

interface CheckoutFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  clientSecret,
  handleSetPaymentSuccess,
}) => {
  const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } =
    useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const formattedPrice = formatPrice(cartTotalAmount);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }
    handleSetPaymentSuccess(false);
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        redirect: 'if_required',
      })
      .then((result) => {
        if (!result.error) {
          toast.success('Checkout Success');

          handleClearCart();
          handleSetPaymentSuccess(true);
          handleSetPaymentIntent(null);
        }
        setIsLoading(false);
      });
  };
  return (
    <form onSubmit={handleSubmit} id="payment-form" className="mb-6">
      <div className="mb-6">
      <Heading title="Enter your details to complete checkout "></Heading>
      </div>
      <h2 className="font-semibold mb-2">
        Address Information
      </h2>
      <AddressElement options={{
        mode:'shipping',
        allowedCountries: ['US', 'COP'],
      }}/>
      
      <div className="py-4 text-center text-slate-700 text-xl font-bold">
        Total:{formattedPrice}
      </div>
      <Button label={isLoading ? 'Processing': 'Pay now'} disabled={isLoading || !stripe || !elements}
      onClick={()=>{}}  />
      <h2 className="font-semibold mt-4 mb-2">Payment information</h2>
      <PaymentElement id='payment-element' options={{layout:'tabs'}}/>
    </form>
  );
};

export default CheckoutForm;
