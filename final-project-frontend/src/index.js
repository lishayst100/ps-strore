import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import './themed-bootstrap.scss';
import { UserContextProvider } from './services/loginContext';
/* import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css"; */


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    
      <UserContextProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </UserContextProvider>
   
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
