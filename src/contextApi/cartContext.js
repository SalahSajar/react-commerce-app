import {createContext ,useState ,useCallback} from "react";

import {commerce} from "../lib/commerce";

export const cartContext = createContext(null);

const CartContextProvider = (props) => {
    const [cartProducts , setCartProducts] = useState([]);

    const decreaseProduct__HANDLER = (id) => {
        setCartProducts(prev => {
            const cartItemsClone = prev.map(cartItemClone => {
                if(cartItemClone.itemId === id){
                    cartItemClone.amount--;

                    commerce.cart.update(id, {quantity: cartItemClone.amount}).then(data => console.log(data));
                }

                return cartItemClone;
            });

            return cartItemsClone
        })
    }

    const increaseProduct__HANDLER = (id) => {
        commerce.cart.add(id ,1).then(data => console.log(data));

        if(!cartProducts.length || cartProducts.every(cartProduct => cartProduct.productId !== id)){

            setCartProducts(prev => {
                const cartListClone = [...prev];
                cartListClone.push({id, amount:1});

                return cartListClone;
            });

        } else if(cartProducts.length || cartProducts.some(cartProduct => cartProduct.productId === id)){
            setCartProducts(prev => {
                const cartListClone = [...prev].map(cartItem => {
                    if(cartItem.productId === id){
                        cartItem.amount++;
                    }
                    return cartItem;
                });
                return cartListClone;

            })
        }
    }

    const loadCartItems__HANDLER = useCallback((cartItems) => {
        setCartProducts(() => {
            const cartItemObj = cartItems.line_items.map(cartItem => {
                return {
                    productId: cartItem.product_id,
                    itemId: cartItem.id,
                    amount: cartItem.quantity,
                    name: cartItem.product_name,
                    img: cartItem.image.url,
                    price: cartItem.price.raw,
                }
            });

            return cartItemObj;
        });
    }, []);

    const removeFromCart__HANDLER = (id) => {
        commerce.cart.remove(id).then(data => console.log(data));
        setCartProducts(prev => {
            return prev.filter(cartItem => cartItem.itemId !== id);
        });
    }

    const emptyCart__HANDLER = () => {
        commerce.cart.empty().then(data => console.log(data));
        setCartProducts([]);
    }

    const refreshCartData__FUNC = async (changeCheckoutStepHandler) => {
        setCartProducts([]);
        await commerce.cart.refresh();

        changeCheckoutStepHandler(true);
    }

    return (
        <cartContext.Provider value={{
            cartProducts,
            decreaseProductHandler: decreaseProduct__HANDLER,
            increaseProductHandler: increaseProduct__HANDLER,
            removeFromCartHandler: removeFromCart__HANDLER, 
            loadCartItemsHandler:loadCartItems__HANDLER,
            emptyCartHandler: emptyCart__HANDLER,
            refreshCartDataHandler:refreshCartData__FUNC,
        }}>
            {props.children}
        </cartContext.Provider>
    )

}

export default CartContextProvider;
