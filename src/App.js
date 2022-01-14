import { Routes, Route} from "react-router-dom";
import {Fragment , useState, useEffect} from "react";


import {Checkout} from "./components/Pages/Checkout";
import {Cart} from "./components/Pages/Cart";
import {Home} from "./components/Pages/Home";

import { commerce } from "./lib/commerce";

import CheckutCtxProvider from "./contextApi/CheckoutContext"

function App() {

  const [productsList, setProductsList] = useState([]);
  
  const fetchProductsList__FUNC = async () => {
    const productsArray = await commerce.products.list();

    setProductsList(productsArray.data);
  }

  useEffect(() => {
    fetchProductsList__FUNC();
  }, [])
 
  return (
    <Fragment>
      <Routes>

        <Route path="/" exact element={<Home productsList={productsList} />} /> 
        <Route path="/checkout" element={<CheckutCtxProvider> <Checkout /> </CheckutCtxProvider>} />
        <Route path="/cart" element={<Cart />} /> 

      </Routes>
    </Fragment>

  )
}

export default App;
