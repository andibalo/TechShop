import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = (props) => {
  return (
    <div className="container p-5 text-center">
      <Elements stripe={promise}>
        <div className="col-md-8 offset-md-2">
          <p>Complete your purchase</p>
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
