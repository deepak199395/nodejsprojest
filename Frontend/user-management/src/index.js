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
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
  <App/>
  </Provider>
  </React.StrictMode>
);


reportWebVitals();
