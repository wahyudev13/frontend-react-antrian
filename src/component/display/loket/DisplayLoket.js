
import Vidio3 from "../../../vidio/vidio3.mp4";
import Vidio2 from "../../../vidio/vidio2.mp4";
import Vidio1 from "../../../vidio/vidio1.mp4";
import Vidio4 from "../../../vidio/vidio4.mp4";
import Container from "react-bootstrap/Container";
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import React from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faClockFour, } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faFacebookF, faYoutube, faInstagramSquare, faSquareInstagram, faWeebly, faSquareXTwitter, faSquareFacebook, faSquareYoutube, faSquareGooglePlus } from "@fortawesome/free-brands-svg-icons";
import Nav from "react-bootstrap/Nav";

var date = new Date();

function DisplayLoket() {
    const [nourut, setNourut] = useState('0');
    const [text, setText] = useState('');
    const [play, setPlay] = useState('false');
    const [idAntrian, setidAntrian] = useState('');

    var time = new Date().toLocaleTimeString();
    const [jam, setJam] = useState(time);
    const [tanggal, setTanggal] = useState('');

    const waktu = () => {
        var tahun = date.getFullYear();
        var bulan = date.getMonth();
        var tanggal = date.getDate();
        var hari = date.getDay();
        // //Jam
        // var jam = date.getHours();
        // var menit = date.getMinutes();
        // var detik = date.getSeconds();
        switch (hari) {
            case 0: hari = "Minggu"; break;
            case 1: hari = "Senin"; break;
            case 2: hari = "Selasa"; break;
            case 3: hari = "Rabu"; break;
            case 4: hari = "Kamis"; break;
            case 5: hari = "Jum'at"; break;
            case 6: hari = "Sabtu"; break;
        }
        switch (bulan) {
            case 0: bulan = "Januari"; break;
            case 1: bulan = "Februari"; break;
            case 2: bulan = "Maret"; break;
            case 3: bulan = "April"; break;
            case 4: bulan = "Mei"; break;
            case 5: bulan = "Juni"; break;
            case 6: bulan = "Juli"; break;
            case 7: bulan = "Agustus"; break;
            case 8: bulan = "September"; break;
            case 9: bulan = "Oktober"; break;
            case 10: bulan = "November"; break;
            case 11: bulan = "Desember"; break;
        }
        setTanggal(hari + ',' + tanggal + ' ' + bulan + ' ' + tahun)
    }

    const updateTime = () => {
        var time = new Date().toLocaleTimeString();
        setJam(time);
    }

    useEffect(() => {
        setInterval(() => {
            waktu();
            updateTime();
        }, 1000);
    });
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
        echo.channel('channel-panggil-antrian-loket').listen('.panggil-antrian-loket', (data) => {
            setNourut(data.message.noantrian);
            setidAntrian(data.message.kd);
            setPlay('true');
            console.log('Panggil Antrian ' + data.message.noantrian);
        });

        echo.channel('channel-stop-antrian-loket').listen('.stop-antrian-loket', (data) => {
            setPlay('false');
            window.responsiveVoice.cancel();
            console.log('Stop Antrian ' + data.message.noantrian);
        });

        echo.channel('channel-lewati-antrian-loket').listen('.lewati-antrian-loket', (data) => {
            setPlay('false');
            window.responsiveVoice.cancel();
            console.log('Lewati Antrian ' + data.message.no_urut);
        });

        if (play === 'true') {
            window.responsiveVoice.speak('PANGGILAN. antrian pendaftaran nomor ' + nourut, "Indonesian Male");
        }

    }, [play, idAntrian]);


    return (

        <>

            <nav className="navbar bg-warning navbar-fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img
                            alt=""
                            src="/logonavbar.png"
                            width="60"
                            height="60"
                            className="d-inline-block"
                        />{' '}
                        <strong style={{ fontSize: '25px', color: '#1c2474' }}>RS PKU Muhammadiyah Sekapuk</strong>
                    </a>

                    <div className='d-flex'>
                        <strong style={{ fontSize: '25px', color: '#1c2474' }}>ANTRIAN LOKET PENDAFTARAN</strong>
                    </div>
                </div>
            </nav>

            <div className="container-fluid mt-5">
                <div className="row g-2">
                    <div className="col-lg-5 col-md-6">
                        <div className="card text-bg-primary">
                            <h5 className="card-header text-center" style={{ fontSize: '30px', color: '#ffc107' }}>NOMOR ANTRIAN</h5>
                            <div className="card-body">
                                <h1 className="card-title text-center" style={{ fontSize: '280px' }}>{nourut}</h1>
                            </div>

                            <div className="card-footer text-center" style={{ fontSize: '30px', color: '#ffc107' }}>
                                LOKET PENDAFTARAN
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7 col-md-6">
                        <div className="card">
                            <video controls autoPlay loop muted width="100%" height="auto">
                                <source src={Vidio4} type="video/mp4" />
                                Sorry, your browser doesn't support videos.
                            </video>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="footer fixed-bottom mt-auto py-3 bg-warning">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6">
                            <FontAwesomeIcon icon={faCalendarDays} /> {tanggal}     
                            <FontAwesomeIcon className="icojam" icon={faClockFour} /> {jam}
                        </div>
                        <div className="col-lg-6" style={{ textAlign: 'right'}}>
                            <FontAwesomeIcon icon={faInstagramSquare} /> @rs.pkusekapuk
                            <FontAwesomeIcon className="icojam" icon={faSquareFacebook} />  <FontAwesomeIcon icon={faSquareYoutube} /> RS Pku Muhammadiyah Sekapuk
                            <FontAwesomeIcon className="icojam" icon={faSquareGooglePlus} /> www.rspkusekapuk.com
                        </div>
                    </div>

                </div>
            </footer>
        </>
    );
}

export default DisplayLoket;
