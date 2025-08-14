import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      console.log("Error:", error);
    } else {
      console.log("PaymentMethod:", paymentMethod);
      setSuccess("Payment method created successfully!");
      // এখানে তুমি চাইলে backend এ paymentMethod.id পাঠাতে পারো
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded">
      <form onSubmit={handleSubmit} className="space-y-4">
        <CardElement className="p-2 border rounded" />
        <button
          type="submit"
          disabled={!stripe}
          className="btn btn-primary w-full"
        >
          Pay For Parcel Pickup
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </div>
  );
};

export default PaymentForm;
