import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from './ReduxToolkit/Store';
//import Todo from './Components/Todo';
//import LassyLoading from './Components/LassyLoading';
//import ErrorBoundary from './Components/ErrorBoundary';
import Product from './Components/Product';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
   <Product/>
  </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
