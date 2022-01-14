import {useState, createContext, useCallback, useContext} from "react";

import { commerce } from "../lib/commerce";

import { cartContext } from "./cartContext";

export const checkoutContext = createContext({
    checkoutTokenObj: null,
    shippingCountries:null,
    shippingCountrySubdivisions: null,
    shippingCountryOptions: null,
    shippingDetails:null,
    order:null,
    generateCheckoutTokenHandler: () =>{},
});

const CheckutCtxProvider = (props) => {
    const [checkoutTokenObj, setCheckoutTokenObj] = useState(null);
    const [shippingCountries, setShippingCountries] = useState(null);
    const [shippingCountrySubdivisions, setShippingCountrySubdivisions] = useState(null);
    const [countryShippingOptions, setCountryShippingOptions] = useState(null);
    const [shippingDetails, setShippingDetails] = useState(null);
    const [order, setOrder] = useState(null);

    const {refreshCartDataHandler} = useContext(cartContext);

    const generateCheckoutToken__FUNC = useCallback(async() => {
        console.log(commerce.cart.id());
        const tokenRes = await commerce.checkout.generateTokenFrom('cart', commerce.cart.id());
        const shippingCountriesRes = await commerce.services.localeListShippingCountries(tokenRes.id);
        const CountrySubdivisionsRes = await commerce.services.localeListShippingSubdivisions(tokenRes.id, 'AF');
        const CountryShippingOption = await commerce.checkout.getShippingOptions(tokenRes.id , {country: "AF"});

        console.log('///////////////////////');
        console.log(tokenRes);

        setShippingCountrySubdivisions(CountrySubdivisionsRes);
        setCheckoutTokenObj(tokenRes);
        setShippingCountries(shippingCountriesRes);
        setCountryShippingOptions(CountryShippingOption);
    }, []);

    const countrySubdivisions__FUNC = useCallback(async(country) => {
        const countrySubdivisions = await commerce.services.localeListShippingSubdivisions(checkoutTokenObj.id, country);

        setShippingCountrySubdivisions(countrySubdivisions);
    }, [checkoutTokenObj]);

    const shippingMethod__FUNC = useCallback(async(country) => {
        const shippingMethodRes = await commerce.checkout.getShippingOptions(checkoutTokenObj.id, {country});

        setCountryShippingOptions(shippingMethodRes);
    }, [checkoutTokenObj]);

    const submitShippingDetails_FUNC = (shippingDetailsObj) => {
        setShippingDetails(shippingDetailsObj);
    }

    const captureOrder__FUNC = async (orderDetails, changeCheckoutStepHandler) => {
        try{
            console.log("--------",checkoutTokenObj.id);
            const captureOrderRes = await commerce.checkout.capture(checkoutTokenObj.id, orderDetails);
            console.log("//////////////////////");
            console.log(captureOrderRes);

            setOrder(captureOrderRes);
            refreshCartDataHandler(changeCheckoutStepHandler);
        } catch(err){
            console.log('-------------------- ERROR');
            console.log(err.data.error);
        }

    }


    return (
        <checkoutContext.Provider value={{
            checkoutTokenObj,
            shippingCountries,
            shippingCountrySubdivisions,
            countryShippingOptions,
            shippingDetails,
            order,
            generateCheckoutTokenHandler: generateCheckoutToken__FUNC,
            countrySubdivisionsHandler: countrySubdivisions__FUNC,
            shippingMethodHandler: shippingMethod__FUNC,
            submitShippingDetailsHandler: submitShippingDetails_FUNC,
            captureOrderHandler:captureOrder__FUNC
        }}>
            {props.children}
        </checkoutContext.Provider>
    )
}

export default CheckutCtxProvider;