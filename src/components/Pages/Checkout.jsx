import {Fragment, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';

import { checkoutContext } from '../../contextApi/CheckoutContext';
import { cartContext } from '../../contextApi/cartContext';

import { Navbar } from '../Navbar';
import {CheckoutMainComp} from "../Ui/CheckoutUiComps/CheckoutMainComp";

import classes from "./Checkout.module.css";

export const Checkout = () => {
    const {generateCheckoutTokenHandler} = useContext(checkoutContext);
    const {cartProducts} = useContext(cartContext);

    const navigate = useNavigate();

    useEffect(() => {

        if(cartProducts.length){
            generateCheckoutTokenHandler();
        } else {
            console.log("--------- Redirect To Home");
            navigate("/", { replace: true });
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [generateCheckoutTokenHandler]);

    return (
        <Fragment>
            <Navbar showCartBtn={false} />
            <section className={classes["checkoutSection--EL"]}>
                <CheckoutMainComp />
            </section>
        </Fragment>
    )
}
