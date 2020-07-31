import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import AccountDataProvider from './context/AccountData/AccountDataProvider';
import AccountDataContext, { initialAccountData } from './context/AccountData';

/* const [account, setAccount] = useState(initialAccountData.account);
const value = { account, setAccount} */

ReactDOM.render(
    <AccountDataProvider>
        <App />
    </AccountDataProvider>
    , document.getElementById('root')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
