import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Display from './component/display/model-1/Display';
import DisplayB from './component/display/model-1/DisplayB';
import DisplayC from './component/display/model-2/DisplayC';
import DisplayD from './component/display/model-2/DisplayD';
import Antrian from './component/panggilan/Antrian';
import AntrianB from './component/panggilan/AntrianB';
import AntrianC from './component/panggilan/AntrianC';
import AntrianD from './component/panggilan/AntrianD';
import AntrianE from './component/panggilan/AntrianE';
import AntrianF from './component/panggilan/AntrianF';

//Antrian Loket
import Displayloket from './component/display/loket/DisplayLoket';
import DisplayloketM2 from './component/display/loket/DisplayLoket2';
import PanggilanLoket from './component/panggilan/loket/panggilan-loket';
import PanggilanLoketM2 from './component/panggilan/loket/panggilan-loket-m2';

//Home
import Home from './component/home';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Navbartop/> */}
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />

        <Route path='display-a' element={<Display/>} />
        <Route path='display-b' element={<DisplayB/>} />
        <Route path='display-c' element={<DisplayC/>} />
        <Route path='display-d' element={<DisplayD/>} />
        <Route path='panggilan-a' element={<Antrian/>} />
        <Route path='panggilan-b' element={<AntrianB/>} />
        <Route path='panggilan-c' element={<AntrianC/>} />
        <Route path='panggilan-d' element={<AntrianD/>} />
        <Route path='panggilan-e' element={<AntrianE/>} />
        <Route path='panggilan-f' element={<AntrianF/>} />

        <Route path='display-loket' element={<Displayloket/>} />
        <Route path='panggilan-loket' element={<PanggilanLoket/>} />
        <Route path='display-loket-m2' element={<DisplayloketM2/>} />
        <Route path='panggilan-loket-m2' element={<PanggilanLoketM2/>} />
      </Routes>
    </BrowserRouter>
    {/* <Footer/> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
