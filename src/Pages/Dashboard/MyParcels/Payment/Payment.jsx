import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentFrom from "./PaymentFrom";

const stripePromise = loadStripe('pk_test_1234567890');

const Payment = () => {
    return (
        <div>
            <Elements stripePromise={stripePromise}>
                <PaymentFrom/>
            </Elements>
        </div>
    );
};

export default Payment;