import {useContext} from 'react';

import {cartContext} from "../../contextApi/cartContext";

import classes from "./Product.module.css";

export const Product = ({id,productName, productPrice, productDesc, productImg}) => {
    const cartListCtx = useContext(cartContext);

    const addToCart__HANDLER = ( ) => {
        cartListCtx.increaseProductHandler(id);
    }
    
    return (
        <div className={classes["productCart--EL"]}>
            <div className={classes["productImg--EL"]}>
                <img src={productImg} alt="product look" />
            </div>
            <div className={classes["productDetails--CONTAINER"]}>
                <div className={classes["productDetailsTypos--EL"]}>
                    <div className={classes["productDetailsHeader--EL"]}>
                        <h3>{productName}</h3>
                        <h3>{productPrice}</h3>
                    </div>
                    <p>{productDesc.replace(/<p>/g, '').replace("</p>", '')}</p>
                </div>
                <button type="button" onClick={addToCart__HANDLER}>
                    <img src={`${process.env.PUBLIC_URL}/assets/icons/add-to-cart.png`} alt="add to cart" />
                </button>
            </div>
        </div>
    )
}
