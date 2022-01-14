import {useContext} from 'react';

import {cartContext} from "../../contextApi/cartContext";

import classes from "./CartItemCard.module.css";

export const CartItemCard = ({cartItemInfos}) => {
    const {removeFromCartHandler, increaseProductHandler, decreaseProductHandler} = useContext(cartContext);

    const increaseCartItemAmount_FUNC = () => {
        increaseProductHandler(cartItemInfos.productId);
    }

    const decreaseCartItemAmount_FUNC = () => {
        decreaseProductHandler(cartItemInfos.itemId);
    }

    const removeCartItem_FUNC = () => {
        removeFromCartHandler(cartItemInfos.itemId);
    }

    return (
        <div className={classes["cartItem--EL"]}>
            <div className={classes["cartItemImg--CONTAINER"]}>
                <img src={cartItemInfos.img} alt="cart item" />
            </div>
            <div className={classes["cartItemContent--WRAPPER"]}>
                <div className={classes["cartItemTypos--CONTAINER"]}>
                    <h2>{cartItemInfos.name}</h2>
                    <h3>${cartItemInfos.price}</h3>
                </div>
                <div className={classes["cartItemTypos--CONTAINER"]}>
                    <div className={classes["cartItemAmount"]}>
                        <button type="button" onClick={decreaseCartItemAmount_FUNC} >-</button>
                        <span>{cartItemInfos.amount}</span>
                        <button type="button" onClick={increaseCartItemAmount_FUNC} >+</button>
                    </div>
                    <button type='button' className={classes["removeCartItem--BTN"]}  onClick={removeCartItem_FUNC}>remove</button>
                </div>
            </div>
        </div>
    )
}
