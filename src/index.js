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
import DisplayLoket4 from './component/display/loket/DisplayLoket4';
//SUARA LOKAL
import DisplayLoket3 from './component/display/loket/DisplayLoket3';

//LOKEL DOBEL
import DisplayLoketDoble from './component/display/loket/DisplayLoketDoble';
import PanggilanLoketDobel1 from './component/panggilan/loket/panggilan-loket-dobel-1';
import PanggilanLoketDobel2 from './component/panggilan/loket/panggilan-loket-dobel-2';

//Antrian Farmasi
import PanggilanFarmasi from './component/panggilan/farmasi/panggilan-farmasi';
import DisplayFarmasi from './component/display/farmasi/display-faramasi';
import DisplayFarmasi2 from './component/display/farmasi/display-faramasi2';
import DisplayFarmasi3 from './component/display/farmasi/display-faramasi-3';


//TES ANTRIAN LOKET
import PanggilanLoketTes from './component/panggilan/loket/panggilan-loket-tes';


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
        <Route path='/' element={<Home />} />

        <Route path='display-a' element={<Display />} />
        <Route path='display-b' element={<DisplayB />} />
        <Route path='display-c' element={<DisplayC />} />
        <Route path='display-d' element={<DisplayD />} />
        <Route path='panggilan-a' element={<Antrian />} />
        <Route path='panggilan-b' element={<AntrianB />} />
        <Route path='panggilan-c' element={<AntrianC />} />
        <Route path='panggilan-d' element={<AntrianD />} />
        <Route path='panggilan-e' element={<AntrianE />} />
        <Route path='panggilan-f' element={<AntrianF />} />

        <Route path='display-loket' element={<Displayloket />} />
        <Route path='panggilan-loket' element={<PanggilanLoket />} />
        <Route path='display-loket-m2' element={<DisplayloketM2 />} />
        <Route path='panggilan-loket-m2' element={<PanggilanLoketM2 />} />

        <Route path='display-loket-lokal' element={<DisplayLoket3 />} />
        <Route path='display-loket-m4' element={<DisplayLoket4 />} />

        <Route path='display-loket-dobel' element={<DisplayLoketDoble />} />
        <Route path='panggilan-loket-dobel-1' element={<PanggilanLoketDobel1 />} />
        <Route path='panggilan-loket-dobel-2' element={<PanggilanLoketDobel2 />} />

        <Route path='panggilan-farmasi' element={<PanggilanFarmasi />} />
        <Route path='display-farmasi' element={<DisplayFarmasi />} />
        <Route path='display-farmasi2' element={<DisplayFarmasi2 />} />
        <Route path='display-farmasi3' element={<DisplayFarmasi3 />} />


        <Route path='panggilan-loket-tes' element={<PanggilanLoketTes />} />


      </Routes>
    </BrowserRouter>
    {/* <Footer/> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
