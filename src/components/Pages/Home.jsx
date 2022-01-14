import {Fragment, useContext, useEffect, useCallback} from 'react';

import { Navbar } from '../Navbar';
import {ProductsList} from "../Ui/ProductsList";

import {cartContext} from "../../contextApi/cartContext";

import { commerce } from '../../lib/commerce';

export const Home = ({productsList}) => {
    const {loadCartItemsHandler} = useContext(cartContext);

    const loadCartItemsList__FUNC = useCallback( async () => {
        const cartItemsList = await commerce.cart.retrieve();
        loadCartItemsHandler(cartItemsList, true);
    }, [loadCartItemsHandler]);

    useEffect(() => {
        loadCartItemsList__FUNC();
    }, [loadCartItemsList__FUNC])

    return (
        <Fragment>
            <Navbar showCartBtn={true} />

            <main className={`mainContentLayout`}>
                <ProductsList productsArr={productsList} />
            </main>
            
        </Fragment>
    )
}