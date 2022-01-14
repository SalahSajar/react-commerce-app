import React from 'react';

import classes from "./ProductsList.module.css";

import {Product} from "../Ui/Product";

export const ProductsList = ({productsArr}) => {
    return (
        <div className={classes["products--CONTAINER"]}>
            {!!productsArr.length && productsArr.map(productInfos => {
                return (
                    <Product key={productInfos.id} id={productInfos.id} productName={productInfos.name} productDesc={productInfos.description} productPrice={productInfos.price.formatted_with_symbol} productImg={productInfos.image.url} />
                )
            })}
        </div>
    )
}
