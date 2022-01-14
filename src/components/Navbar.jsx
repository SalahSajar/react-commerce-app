import {useContext} from "react";
import {Link} from "react-router-dom";

import {cartContext} from "../contextApi/cartContext";

import classes from "./Navbar.module.css";

export const Navbar = ({showCartBtn}) => {
    const cartListCtx = useContext(cartContext);
    const cartProductsAmount = cartListCtx.cartProducts.reduce((acc,cartProduct) => acc += cartProduct.amount , 0);

    return (
        <nav className={`mainContentLayout ${classes["Navbar--EL"]}`}>
            <div className={classes["navbar_content--WRAPPER"]}>
                <Link className={classes["navLink--EL"]} to="/">
                    <img src={`${process.env.PUBLIC_URL}/assets/commerce.png`} alt="main logo" />Ecommerce
                </Link>
                {showCartBtn && <Link to="/cart" className={`${classes["cartLink--EL"]} ${classes["navLink--EL"]}`}>
                    <img src={`${process.env.PUBLIC_URL}/assets/icons/shopping-cart.png`} alt="cart logo" />
                    {cartProductsAmount ? <span className={classes["selectedProductLength--EL"]}>{cartProductsAmount}</span> : ""}
                </Link>}
            </div>
        </nav>
    )
}