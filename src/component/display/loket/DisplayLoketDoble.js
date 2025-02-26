import React from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import Marquee from "react-fast-marquee";
import { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCalendarDays, faClockFour, } from "@fortawesome/free-solid-svg-icons";
// import { faInstagramSquare, faSquareFacebook, faSquareYoutube, faSquareGooglePlus } from "@fortawesome/free-brands-svg-icons";


//var date = new Date();

function DisplayLoketDoble() {
    const host = process.env.REACT_APP_API;
    const [nourut, setNourut] = useState('0');
    const [nourut2, setNourut2] = useState('0');
    const [namapoli, setNamapoli] = useState('-');
    const [namapoli2, setNamapoli2] = useState('-');
    const [texts, setText] = useState([]);
    // const [resvoice, setResvoice] = useState('');

    const getText = async () => {
        await axios.get(`${host}/api/loket/text_marquee`)
            .then(function (response) {
                const text = response.data.data;
                text.map((data) => (
                    setText(data.value)
                ))
                //console.log(response.data.data);
            }).catch(function (error) {
                console.log(error.message);
            });
    }

    // const getVoice = async () => {
    //     await axios.get(`${host}/api/loket/responsive-voice`)
    //         .then(function (response) {
    //             const voice = response.data.data;
    //             voice.map((data) => (
    //                 setResvoice(data.value)
    //             ))
    //             // console.log(voice);
    //         }).catch(function (error) {
    //             console.log(error.message);
    //         });
    // }

    const getAll = async () => {
        getText();
        // getVoice();
    }

    useEffect(() => {
        getText();
        // getVoice();
    }, []);

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
        //LOKET 1
        echo.channel('channel-panggil-loket-dobel-1').listen('.panggil-antrian-loket-dobel-1', (data) => {
            setNourut(data.message.nomor);
            setNamapoli(data.message.namapoli);

            var msg = new SpeechSynthesisUtterance();
            msg.volume = 1;
            msg.rate = '0.9';
            msg.pitch = 1;
            msg.lang = "id-ID";
            msg.text = 'antrian pendaftaran ' + data.message.namapoli + ' nomor ' + data.message.nomor + 'ke loket 1';
            window.speechSynthesis.speak(msg);


        });
        // echo.channel('channel-stop-loket-manual').listen('.stop-antrian-loket-manual', (data) => {
        //     window.responsiveVoice.cancel();//STOP ANTRIAN
        //     console.log('Stop Antrian ' + data.message);
        // });


        //LOKET 2
        echo.channel('channel-panggil-loket-dobel-2').listen('.panggil-antrian-loket-dobel-2', (data) => {
            setNourut2(data.message.nomor);
            setNamapoli2(data.message.namapoli);
            var msg2 = new SpeechSynthesisUtterance();
            msg2.volume = 1;
            msg2.rate = '0.9';
            msg2.pitch = 1;
            msg2.lang = "id-ID";
            msg2.text = 'antrian pendaftaran ' + data.message.namapoli + ' nomor ' + data.message.nomor + 'ke loket 2';
            window.speechSynthesis.speak(msg2);

        });
    }, []);

    //SUARA TES
    useEffect(() => {
        window.Pusher = Pusher;
        const echo = new Echo({
            broadcaster: 'pusher',
            key: 'local',
            wsHost: process.env.REACT_APP_HOST_PUSHER,
            wsPort: process.env.REACT_APP_PORT_PUSHER,
            forceTLS: false,
            disableStats: true,
            encrypted: true,
        });
        echo.channel('tes-loket').listen('.tes-antrian-loket', (data) => {
            var msg = new SpeechSynthesisUtterance();
            msg.volume = 1;
            msg.lang = "id-ID";
            msg.text = data.message.text;
            window.speechSynthesis.speak(msg);
            console.log(data.message.text);
        });
    }, []);


    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>ANTRIAN LOKET DOBEL </title>
            </Helmet>
            <nav className="navbar navbar-fixed-top bg-warning" >
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img
                            alt=""
                            src="/logonavbar.png"
                            width="60"
                            height="60"
                            className="d-inline-block"
                        />{' '}
                        <strong style={{ fontSize: '25px', color: '#1c2474' }}>RS PKU Muhammadiyah Sekapuk</strong>
                    </a>

                    <div className='d-flex' type='button' onClick={() => getAll()}>
                        <strong style={{ fontSize: '25px', color: '#1c2474' }}>ANTRIAN LOKET PENDAFTARAN 5</strong>
                    </div>
                </div>
            </nav >

            <div className="container-fluid mt-2" >
                <div className="row g-2">
                    <div className="col-lg-6 col-md-6">
                        <div className="card text-bg-primary">
                            <h5 className="card-header text-center" style={{ fontSize: '70px', color: '#ffc107' }}>LOKET 1</h5>
                            <div className="card-body">
                                <h1 className="card-title text-center" style={{ fontSize: '50px' }}>NOMOR PENDAFTARAN</h1>
                                <h1 className="card-title text-center" style={{ fontSize: '280px' }}>{nourut}</h1>
                            </div>

                            <div className="card-footer text-center" style={{ fontSize: '50px', color: '#ffc107' }}>
                                {namapoli}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="card text-bg-danger">
                            <h5 className="card-header text-center" style={{ fontSize: '70px', color: '#ffc107' }}>LOKET 2</h5>
                            <div className="card-body">
                                <h1 className="card-title text-center" style={{ fontSize: '50px' }}>NOMOR PENDAFTARAN</h1>
                                <h1 className="card-title text-center" style={{ fontSize: '280px' }}>{nourut2}</h1>
                            </div>

                            <div className="card-footer text-center" style={{ fontSize: '50px', color: '#ffc107' }}>
                                {namapoli2}
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="footer fixed-bottom mt-auto py-3 bg-warning">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12" style={{ textAlign: 'right' }} >
                                <Marquee style={{ color: '#dc3545', fontSize: '25px', fontWeight: 'bold' }}>
                                    {texts}
                                </Marquee>
                            </div>
                        </div>

                    </div>
                </footer >
            </div >

        </>
    );
}

export default DisplayLoketDoble;

