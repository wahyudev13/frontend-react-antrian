
import axios from "axios";
import React from 'react';
import Pusher from 'pusher-js';
import { useState, useEffect } from "react";
function AntrianProses() {
    const host = process.env.REACT_APP_API;

    // API Headers
    const headers = {
        "Accept": "application/json",
        "X-API-KEY": process.env.REACT_APP_API_KEY || "",
    };

    const [proses, setProses] = useState([]);

    useEffect(() => {
        // setInterval(() => {
        //     getProses();
        // }, 60000);
        getProses();
    }, []);

    const getProses = async (id) => {
        await axios.get(`${host}/api/farmasi/nomor/antrian/proses/get`, { headers })
            .then(function (response) {
                setProses(response.data.data);
                console.log(response.data.data);
            }).catch(function (error) {
                console.log(error.message);
            });

    }


    return (
        <>
            <tbody style={{ fontSize: '30px', textAlign: 'center' }}>
                {proses.length !== 0 ? proses.map((proses, index) => (

                    <tr key={index}>
                        <td style={{ fontSize: '50px', fontWeight: 'bold' }}>{proses.ketegori + '-' + proses.no_urut}</td>
                        <td>{proses.ketegori === 'A' ? 'NON RACIKAN' : 'RACIKAN'}</td>
                        <td>{proses.status === 5 ? 'Disiapkan' : 'Selesai'}</td>
                    </tr>

                )) : <tr><td colSpan={3}><center>TIDAK AD</center></td></tr>}


            </tbody>

        </>

    );

}

export default AntrianProses;