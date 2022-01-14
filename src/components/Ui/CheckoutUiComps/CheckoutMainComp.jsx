import {useContext,useState} from 'react';

import { checkoutContext } from '../../../contextApi/CheckoutContext';

import {PaymentDetailsStep} from "./CheckoutStepComps/PaymentDetailsStep";
import {ShippingAddressStep} from "./CheckoutStepComps/ShippingAddressStep";
import {SuccessfulOrderStep} from "./CheckoutStepComps/SuccessfulOrderStep";


import classes from "./CheckoutMainComp.module.css";

export const CheckoutMainComp = () => {
    const [checkoutSteppingSystem, setCheckoutSteppingSystem] = useState(0);
    const {checkoutTokenObj,shippingCountries} = useContext(checkoutContext);

    const changeCheckoutStep__FUNC = (forwardStepping) => {
        if(forwardStepping){
            setCheckoutSteppingSystem(prev => prev+=1);
        } else {
            setCheckoutSteppingSystem(prev => prev-=1);
        }
    }

    return (
        <div className={classes["checkoutMainBlock--EL"]}>
            <div className={classes["checkMainBlockHeader--EL"]}>
                <h2>checkout</h2>
                <div className={classes["checkoutStepsHeader--CONTAINER"]}>
                    <div className={classes["checkoutStep--EL"]}>
                        <span className={classes["checkoutStepNumber--EL"]}>
                            {!checkoutSteppingSystem ? 1 : <img className={classes["checkout_CheckIcon--EL"]} src={`${process.env.PUBLIC_URL}assets/icons/check.png`} alt="check icon" />}
                        </span>
                        <span className={classes["checkoutStepTitle--EL"]}>Shipping address</span>
                    </div>

                    <hr />

                    <div className={classes["checkoutStep--EL"]} data-active={!!checkoutSteppingSystem}>
                        <span className={classes["checkoutStepNumber--EL"]}>
                            {checkoutSteppingSystem <= 1 ? 2 : <img className={classes["checkout_CheckIcon--EL"]} src={`${process.env.PUBLIC_URL}assets/icons/check.png`} alt="check icon" />}
                        </span>
                        <span className={`${classes["checkoutStepTitle--EL"]} ${checkoutSteppingSystem === 1 && classes["paymentStepIsActive"]}`}>Payment details</span>
                    </div>
                </div>
            </div>
            {
                !checkoutSteppingSystem ?
                !!checkoutTokenObj && !!shippingCountries && <ShippingAddressStep changeCheckoutStepHandler={changeCheckoutStep__FUNC}/> :
                checkoutSteppingSystem === 1 ?
                <PaymentDetailsStep changeCheckoutStepHandler={changeCheckoutStep__FUNC} /> :
                <SuccessfulOrderStep />
            }
        </div>
    )
}
