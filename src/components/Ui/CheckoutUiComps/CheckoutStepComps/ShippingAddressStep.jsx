import {useState, useEffect, useContext , useCallback} from 'react';
import {Link} from "react-router-dom";

import { checkoutContext } from '../../../../contextApi/CheckoutContext';

import classes from "./ShippingAddressStep.module.css";

let firstRenderBlocker = true;

export const ShippingAddressStep = (props) => {
    const {
        checkoutTokenObj,
        shippingCountries ,
        shippingCountrySubdivisions ,
        countryShippingOptions ,
        countrySubdivisionsHandler ,
        shippingMethodHandler,
        submitShippingDetailsHandler
    } = useContext(checkoutContext);

    const [selectedCountry, setSelectedCountry] = useState("AF");

    const loadCountriesHandler = useCallback(() => document.getElementById('countries').innerHTML = shippingCountries.html , [shippingCountries.html]);
    const loadCountrySubdivisionsHandler = () => document.getElementById('countrySubdivisions').innerHTML = shippingCountrySubdivisions.html;

    const loadShippingOptionsHandler = () => {
        const shippingOptions = countryShippingOptions.map(shippingOption => {
            const shippingOptionDetails = `${shippingOption.description} - (${shippingOption.price.formatted_with_symbol})`;

            return `<option value="${shippingOption.description}">${shippingOptionDetails}</option>`;
        }).join("");

        document.getElementById('shippingOptions').innerHTML = shippingOptions;
    }

    const submitShippingDetails__FUNC = (e) => {
        e.preventDefault();

        const shippingInfos = checkoutTokenObj.shipping_methods.find(shippingMethod => shippingMethod.description === e.target.shippingOptions.value);

        const customerObj = {
            firstName: e.target.fName.value,
            lastName:e.target.lName.value,
            email:e.target.email.value
        }

        const addressObj = {
            country: e.target.countries.value,
            subdivisions: e.target.countrySubdivisions.value,
            city: e.target.city.value,
            address_line: e.target.addressLine.value,
            postal_zip_code: e.target.postalCode.value,
        }

        const shippingDetailsObj = {
            items_list: checkoutTokenObj.live.line_items,
            customer: customerObj,
            address: addressObj,
            shipping_option: shippingInfos,
        }

        submitShippingDetailsHandler(shippingDetailsObj);

        props.changeCheckoutStepHandler(true);
    }

    useEffect(() => {
        if(firstRenderBlocker){
            firstRenderBlocker = false;
            return;
        }

        countrySubdivisionsHandler(selectedCountry);
        shippingMethodHandler(selectedCountry);
    }, [selectedCountry, countrySubdivisionsHandler, shippingMethodHandler]);

    useEffect(() => {
        if(!!shippingCountrySubdivisions){
            loadCountrySubdivisionsHandler();
        }

        if(!!countryShippingOptions){
            loadShippingOptionsHandler();
        }
    });

    useEffect(() => {
        loadCountriesHandler();
    }, [loadCountriesHandler]);
    
    return (
        <div className="shippingDetailsContent--CONTAINER">
            <h2 className="shippingDetails_header--EL">Shipping address</h2>

            <form className={classes["shippingDetails_form--EL"]} onSubmit={submitShippingDetails__FUNC}>
                <div className={classes["formInputs--WRAPPER"]}>
                    <div className={classes["shippingInputBlock--EL"]}>
                        <input type="text" placeholder="shippingInputPlaceholder" className={classes["shippingInfos_input--EL"]} name="fName" id="fName" required/>
                        <label htmlFor='fName'>First name*</label>
                    </div>
                    <div className={classes["shippingInputBlock--EL"]}>
                        <input type="text" placeholder="shippingInputPlaceholder" className={classes["shippingInfos_input--EL"]} name="lName" id="lName" required/>
                        <label htmlFor='lName'>Last name *</label>
                    </div>
                    <div className={classes["shippingInputBlock--EL"]}>
                        <input type="text" placeholder="shippingInputPlaceholder" className={classes["shippingInfos_input--EL"]} name="addressLine" id="addressLine" required/>
                        <label htmlFor='addressLine'>Address line *</label>
                    </div>
                    <div className={classes["shippingInputBlock--EL"]}>
                        <input type="email" placeholder="shippingInputPlaceholder" className={classes["shippingInfos_input--EL"]} name="email" id="email" required/>
                        <label htmlFor='email'>Email *</label>
                    </div>
                    <div className={classes["shippingInputBlock--EL"]}>
                        <input type="text" placeholder="shippingInputPlaceholder" className={classes["shippingInfos_input--EL"]} name="city" id="city" required/>
                        <label htmlFor='city'>City *</label>
                    </div>
                    <div className={classes["shippingInputBlock--EL"]}>
                        <input type="number" placeholder="shippingInputPlaceholder" className={classes["shippingInfos_input--EL"]} name="postalCode" id="postalCode" required/>
                        <label htmlFor='postalCode'>Zip / Postal code *</label>
                    </div>

                    <div className={`${classes["shippingInputBlock--EL"]} ${classes["shippingDetailsSelectiong--CONTAINER"]}`}>
                        <span>Shipping Country</span>
                        <select name="countries" id="countries" onChange={(e) => {console.log("country Changed");setSelectedCountry(e.target.value)}}>
                            {/* <option value="US">United States</option> */}
                        </select>
                    </div>
                    <div className={`${classes["shippingInputBlock--EL"]} ${classes["shippingDetailsSelectiong--CONTAINER"]}`}>
                        <span>Shipping Subdivision</span>
                        <select name="countrySubdivisions" id="countrySubdivisions" >
                            {/* <option value="LA">Los angeles</option> */}
                        </select>
                    </div>
                    <div className={`${classes["shippingInputBlock--EL"]} ${classes["shippingDetailsSelectiong--CONTAINER"]}`}>
                        <span>Shipping Options</span>
                        <select name="shippingOptions" id="shippingOptions" >
                            {/* <option value="International">International - ($10.00)</option> */}
                        </select>
                    </div>
                </div>
                <div className="shippingDetailsCtaBtns--CONTAINER">
                    <Link to="/cart" className="backBtn--EL">back to cart</Link>

                    <button type='submit' className="nextBtn--EL">next</button>
                </div>
            </form>
        </div>
    )
}
