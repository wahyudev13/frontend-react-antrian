import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import Antrian from './component/Antrian';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const panggil = ReactDOM.createRoot(document.getElementById('panggil'));
panggil.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='panggilan' element={<Antrian/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
