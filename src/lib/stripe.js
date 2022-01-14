import {loadStripe} from '@stripe/stripe-js';
import {Elements,ElementsConsumer, CardElement} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51J7LH8K2J9IcJX9wqutIuVZ8iOQN0ToEyxSYtke5U2k1MGaWc1EufaUXa38Rv7Ru6xRC33254nqoQaAmKOdcfcOI00vlccXNVn');

export const Stripe = (props) => {
    return (
        <Elements stripe={stripePromise}>
            <ElementsConsumer>
                {props.children}
            </ElementsConsumer>
        </Elements>
    )
}