import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './home/Login';
import Register from './home/Register';
import { Provider } from 'react-redux';
import store from './home/redux/Store';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
console.log({store}, "store");
root.render(
  
<Provider store={store}>
  <App/>
</Provider>
  // <BrowserRouter>
  //    <Routes>
  //       <Route path='/' element={<Login/>} />
  //       <Route path='/register' element={<Register/>} />
  //       <Route path='/home' element={<App/>} />
  //    </Routes>
  // </BrowserRouter>


 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
