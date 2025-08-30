
import axios from "axios";
import React from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { useState, useEffect } from "react";
import './Marquee.css';
import Marquee from "react-fast-marquee";
import AntrianProses from './antrian-proses';
function DisplayFarmasi3() {
    const host = process.env.REACT_APP_API;

    // API Headers
    const headers = {
        "Accept": "application/json",
        "X-API-KEY": process.env.REACT_APP_API_KEY || "",
    };

    const [proses, setProses] = useState([]);
    const [nourut, setNourut] = useState('0');
    const [nourutB, setNourutB] = useState('0');

    useEffect(() => {
        const interval = setInterval(() => {
            getProses();
        }, 60000);

        getProses();

        return () => clearInterval(interval); // hapus interval lama saat effect re-run/unmount
    }, [nourut, nourutB]);


    const getProses = async (id) => {
        await axios.get(`${host}/api/farmasi/nomor/antrian/proses/get`, { headers })
            .then(function (response) {
                setProses(response.data.data);
                //console.log(response.data.data);
            }).catch(function (error) {
                console.log(error.message);
            });

    }

    useEffect(() => {
        Window.Pusher = Pusher;
        const echo = new Echo({
            broadcaster: 'pusher',
            key: 'local',
            wsHost: process.env.REACT_APP_HOST_PUSHER,
            wsPort: process.env.REACT_APP_PORT_PUSHER,
            forceTLS: false,
            disableStats: true,
            encrypted: true,
        });
        echo.channel('channel-panggil-farmasi-a').listen('.panggil-antrian-farmasi-a', (data) => {
            if (data.message.ketegori === 'A') {
                setNourut(data.message.no_urut);
                if (process.env.REACT_APP_RESPON_VOICE === 'true') {
                    window.responsiveVoice.speak('PANGGILAN. antrian farmasi ' + data.message.ketegori + '' + data.message.no_urut, "Indonesian Male");
                } else {
                    var msg = new SpeechSynthesisUtterance();
                    msg.volume = 1;
                    msg.lang = "id-ID";
                    msg.text = 'panggilan. antrian farmasi ' + data.message.ketegori + '' + data.message.no_urut;
                    window.speechSynthesis.speak(msg);
                }
                console.log('Panggil Antrian A ' + data.message.no_urut);
            } else if (data.message.ketegori === 'B') {
                setNourutB(data.message.no_urut);
                if (process.env.REACT_APP_RESPON_VOICE === 'true') {
                    window.responsiveVoice.speak('PANGGILAN. antrian farmasi ' + data.message.ketegori + '' + data.message.no_urut, "Indonesian Male");
                } else {
                    var msg2 = new SpeechSynthesisUtterance();
                    msg2.volume = 1;
                    msg2.lang = "id-ID";
                    msg2.text = 'panggilan. antrian farmasi ' + data.message.ketegori + '' + data.message.no_urut;
                    window.speechSynthesis.speak(msg2);
                }
                console.log('Panggil Antrian B ' + data.message.no_urut);
            }
        });

        echo.channel('channel-stop-farmasi-a').listen('.stop-antrian-farmasi-a', (data) => {
            if (process.env.REACT_APP_RESPON_VOICE === 'true') {
                window.responsiveVoice.cancel();
            } else {
                window.speechSynthesis.cancel();
            }
            console.log('Stop Antrian ' + data.message.no_urut);
        });

        echo.channel('channel-lewati-farmasi-a').listen('.panggil-lewati-farmasi-a', (data) => {
            if (process.env.REACT_APP_RESPON_VOICE === 'true') {
                window.responsiveVoice.cancel();
            } else {
                window.speechSynthesis.cancel();
            }
            console.log('Lewati Antrian ' + data.message.no_urut);
        });

    }, []);

    // const marquee = {

    //     top: 1,
    //     position: relative,
    //     animation: marquee 10s linear infinite

    // };


    return (
        <>
            <nav className="navbar bg-success navbar-fixed-top" style={{ zIndex: '1' }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img
                            alt=""
                            src="/logonavbar.png"
                            width="60"
                            height="60"
                            className="d-inline-block"
                        />{' '}
                        <strong style={{ fontSize: '25px', color: '#fff' }}>RS PKU Muhammadiyah Sekapuk</strong>
                    </a>

                    <div className='d-flex'>
                        <strong style={{ fontSize: '25px', color: '#fff' }}>ANTRIAN APOTEK 3</strong>
                    </div>
                </div>
            </nav>

            <div className="container-fluid" style={{ marginTop: '5px' }}>
                <div className="row g-2">
                    <div className="col-lg-5 col-md-5">
                        <div className="card shadow rounded" style={{ backgroundColor: '#cfe2ff' }}>
                            <h5 className="card-header text-center bg-primary" style={{ fontSize: '30px', color: '#FFF' }}>OBAT NON RACIKAN</h5>
                            <div className="card-body">

                                <h1 className="card-title text-center" style={{ fontSize: '200px' }}>A-{nourut}</h1>
                            </div>
                        </div>

                        <div className="card shadow rounded" style={{ backgroundColor: '#fff3cd', marginTop: '10px' }}>
                            <h5 className="card-header text-center bg-warning" style={{ fontSize: '30px', color: '#FFF' }}>OBAT RACIKAN</h5>
                            <div className="card-body ">

                                <h1 className="card-title text-center" style={{ fontSize: '200px' }}>B-{nourutB}</h1>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-7 col-md-7">

                        <div className="card-body">
                            <div className="row mb-3" >
                                <div className="col">
                                    <div className="card shadow rounded bg-success">
                                        <h5 className="card-header text-center" style={{ fontSize: '30px', color: '#fff' }}>NOMOR</h5>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card shadow rounded bg-success">
                                        <h5 className="card-header text-center" style={{ fontSize: '30px', color: '#fff' }}>JENIS RESEP</h5>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card shadow rounded bg-success">
                                        <h5 className="card-header text-center" style={{ fontSize: '30px', color: '#fff' }}>STATUS</h5>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {proses.length >= 8 ?
                            <marquee scrollamount="5" direction="up" style={{ width: '100%', height: '80%' }}>
                                <div className="card-body">
                                    {proses.length !== 0 ? proses.map((proses, index) => (

                                        <div className="row" key={index}>
                                            <div className="col">
                                                <div className="card  rounded">
                                                    <h5 className="card-header text-center" style={{ fontSize: '50px', color: '#000' }}>{proses.ketegori + '-' + proses.no_urut}</h5>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="card  rounded">
                                                    <h5 className="card-header text-center" style={{ fontSize: '30px', color: '#000', padding: '20px' }}>{proses.ketegori === 'A' ? 'NON RACIKAN' : 'RACIKAN'}</h5>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="card  rounded">
                                                    <h5 className="card-header text-center" style={{ fontSize: '30px', color: '#000', padding: '20px' }}>{proses.status === 5 ? 'Disiapkan' : 'Selesai'}</h5>
                                                </div>
                                            </div>
                                        </div>

                                    )) : <div></div>}
                                </div>
                            </marquee>

                            :
                            <div className="card-body">
                                {proses.length !== 0 ? proses.map((proses, index) => (

                                    <div className="row" key={index}>
                                        <div className="col">
                                            <div className="card  rounded">
                                                <h5 className="card-header text-center" style={{ fontSize: '50px', color: '#000' }}>{proses.ketegori + '-' + proses.no_urut}</h5>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card  rounded">
                                                <h5 className="card-header text-center" style={{ fontSize: '30px', color: '#000', padding: '20px' }}>{proses.ketegori === 'A' ? 'NON RACIKAN' : 'RACIKAN'}</h5>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card  rounded">
                                                <h5 className="card-header text-center" style={{ fontSize: '30px', color: '#000', padding: '20px' }}>{proses.status === 5 ? 'Disiapkan' : 'Selesai'}</h5>
                                            </div>
                                        </div>
                                    </div>

                                )) : <div></div>}
                            </div>
                        }


                    </div>
                    {/* <!-- end col --> */}

                </div>
                {/* <!-- end row --> */}
            </div >

        </>
    );
}

export default DisplayFarmasi3;

