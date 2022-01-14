import {useContext} from 'react';
import {CardElement} from '@stripe/react-stripe-js';

import { Stripe } from '../../../../lib/stripe';

import { checkoutContext } from '../../../../contextApi/CheckoutContext';

import classes from "./PaymentDetailsStep.module.css";

export const PaymentDetailsStep = ({changeCheckoutStepHandler}) => {
    const {checkoutTokenObj, captureOrderHandler,shippingDetails} = useContext(checkoutContext);

    const totalPrice = checkoutTokenObj.live.total.raw;


    const sumbitFullShippingDetails__FUNC = async (e, elements, stripe) => {
        e.preventDefault();

        if(!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        
        const {error, paymentMethod} = await stripe.createPaymentMethod({type: "card", card: cardElement});

        if(!!error){
            console.log(error.message);
            return;
        }

        console.log("--------paymentMethod", paymentMethod);
        console.log(shippingDetails.address.subdivisions);

        const captureOrderObj = {
            line_items: shippingDetails.items_list,
            customer: {
                firstname: shippingDetails.customer.firstName,
                lastname: shippingDetails.customer.lastName,
                email: shippingDetails.customer.email
            },
            shipping: {
                name: "Primary",
                street: shippingDetails.address.address_line,
                town_city: shippingDetails.address.city,
                county_state: shippingDetails.address.subdivisions,
                postal_zip_code: shippingDetails.address.postal_zip_code,
                country: shippingDetails.address.country
            },
            fulfillment: {
                shipping_method:shippingDetails.shipping_option.id
            },
            payment: {
                gateway: 'test_gateway',
                card: {
                    number: '4242 4242 4242 4242',
                    expiry_month: '01',
                    expiry_year: '2029',
                    cvc: '123',
                    postal_zip_code: '94103',
                },
            },
        }


        captureOrderHandler(captureOrderObj, changeCheckoutStepHandler);
    }

    return (
        <div className={`shippingDetailsContent--CONTAINER ${classes["shippingPaymentDetailsBlock--EL"]}`}>
            <h2 className="shippingDetails_header--EL">Order summary</h2>
            <div className={classes["finalCartItemsDetailsBlock--EL"]}>
                <div className={classes["finalCartItems--CONTAINER"]}>
                    {checkoutTokenObj.live.line_items.map((cartItem , i)=> (
                        <div key={i} className={classes["shippingItemBlock--EL"]}>
                            <div className={classes["shippingItemTypos--WRAPPER"]}>
                                <h5>{cartItem.name}</h5>
                                <span>Quantity: {cartItem.quantity}</span>
                            </div>
                            <span className={classes["shippingItemTotalPrice--EL"]}>${cartItem.price.raw}</span>
                        </div>
                    ))}
                </div>
                <div className={classes["totalCartPrice--CONTAINER"]}>
                    <h4>total</h4>
                    <span className={classes["totalCartPrice--EL"]}>${totalPrice}</span>
                </div>
            </div>
            <hr />
            <div className={classes["shippingPaymentMethod--CONTAINER"]}>
                <h2 className="shippingDetails_header--EL">Payment method</h2>
                
                <Stripe>
                    {({elements, stripe}) => (
                        <form onSubmit={(e) => sumbitFullShippingDetails__FUNC(e, elements, stripe)}>
                            <CardElement />

                            <div className="shippingDetailsCtaBtns--CONTAINER">
                                <button type='submit' className="backBtn--EL" onClick={() => changeCheckoutStepHandler(false)}>back</button>
                                <button type='submit' className="nextBtn--EL" disabled={!stripe}>pay ${totalPrice}</button>
                            </div>
                        </form>
                    )}
                </Stripe>
            </div>
        </div>
    )
}
