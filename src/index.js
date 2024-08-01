import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import CustomerList from './CustomerData/customerList';
import CustomerForm from './CustomerData/customerFrom';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
//  root element of application of the react
// this  is the root element of the Application where the application start

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  //strick mood detecting the  problems in the  application
  <React.StrictMode>
    {/* use route  for  navagatinng one  component to another */}
    <Router>
      <Routes>
        {/* this  is the path of  our router to render using a  path */}
        <Route path="/" element={<App />} />
        <Route path="/customer-form" element={<CustomerForm />} />
        <Route path="/customer-list" element={<CustomerList />} />
      </Routes>
    </Router>
  </React.StrictMode>
);


reportWebVitals();
