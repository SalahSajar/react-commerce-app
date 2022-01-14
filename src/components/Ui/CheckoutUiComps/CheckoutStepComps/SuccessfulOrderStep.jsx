import {useContext} from 'react';
import { Link } from 'react-router-dom';

import { checkoutContext } from '../../../../contextApi/CheckoutContext';

import classes from "./SuccessfulOrderStep.module.css";

export const SuccessfulOrderStep = () => {
    const {order} = useContext(checkoutContext);

    
    return (
        <div className={`shippingDetailsContent--CONTAINER`}>
            <div className={classes["shippingDetailsTypos--WRAPPER"]}>
                <h2>Thank you for the purchase, {`${order.customer.firstname} ${order.customer.lastname}`}</h2>

                <p>Order ref: {order.customer_reference}</p>
            </div>
            <div className="shippingDetailsCtaBtns--CONTAINER">
                <Link className="backBtn--EL" to="/" >Back To Home</Link>
            </div>
        </div>
    )
}
