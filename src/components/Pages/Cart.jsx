import {Fragment, useEffect, useContext , useCallback} from 'react';
import { Link , useNavigate} from 'react-router-dom';

import { cartContext } from '../../contextApi/cartContext';
import { commerce } from '../../lib/commerce';

import { CartItemCard } from "../Ui/CartItemCard";
import { Navbar } from '../Navbar';

import classes from "./Cart.module.css";

export const Cart = () => {
    const { loadCartItemsHandler, cartProducts, emptyCartHandler} = useContext(cartContext);
    const totalPrice = cartProducts.reduce((acc, cartProduct) => acc += cartProduct.price*cartProduct.amount, 0).toFixed(2);

    const navigate = useNavigate();

    const retrieveCart_FUNC = useCallback(async () => {
        const cartItems = await commerce.cart.retrieve();

        loadCartItemsHandler(cartItems, false);
    }, [loadCartItemsHandler]);

    const emptyCart__FUNC = () => {
        emptyCartHandler();
    }

    useEffect(() => {
        retrieveCart_FUNC();
    },[retrieveCart_FUNC]);

    return (
        <Fragment>
            <Navbar showCartBtn={false} />

            <section className={`mainContentLayout ${classes["cartSection--EL"]}`}>
                {
                    !!cartProducts.length ? cartProducts.every(cartProduct => cartProduct.name) && (
                        <div className={classes["cartMainBlock--CONTAINER"]}>
                            <h2 className={classes["cart_header--EL"]}>your shopping cart</h2>
                            <div className={classes["cartItems--CONTAINER"]}>
                                {!!cartProducts.length && cartProducts.map((cartItem, i) => !!cartItem.amount && <CartItemCard key={i} cartItemInfos={cartItem} />)}
                            </div>
                            <div className={classes["totalPrice--WRAPPER"]}>
                                <span className={classes["totalPrice--EL"]}>Subtotal:${totalPrice}</span>

                                <div className={classes["ctasEl--CONTAINER"]}>
                                    <button type="button" className={classes["emptyCartBtn--EL"]} onClick={emptyCart__FUNC}>empty cart</button>
                                    <button type="button" className={classes["checkoutBtn--EL"]} onClick={() => navigate("/checkout", { replace: true })}>checkout</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={classes["emptycartTypos--CONTAINER"]}>
                            <h2>Your Shopping Cart</h2>
                            <p>You have no items in your shopping cart, <Link to="/">start adding some!</Link></p>
                        </div>
                    )
                }
                
                
            </section>
        </Fragment>
    )
}
