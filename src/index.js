import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import CartContextProvider from "./contextApi/cartContext";

import './index.css';
import App from './App';

ReactDOM.render(
<BrowserRouter>
    <CartContextProvider>
        <App />
    </CartContextProvider>
</BrowserRouter> , document.getElementById('root'));
