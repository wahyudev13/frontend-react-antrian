
import React from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faClockFour, } from "@fortawesome/free-solid-svg-icons";
import { faInstagramSquare,faSquareFacebook, faSquareYoutube, faSquareGooglePlus } from "@fortawesome/free-brands-svg-icons";

var date = new Date();

function DisplayFarmasi() {
    const [kategori, setKategori] = useState('');
    const [nourut, setNourut] = useState('0');
    const [nourutB, setNourutB] = useState('0');
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
        echo.channel('channel-panggil-farmasi-a').listen('.panggil-antrian-farmasi-a', (data) => {
            if (data.message.ketegori == 'A') {
                setKategori(data.message.ketegori);
                setNourut(data.message.no_urut);
                setidAntrian(data.message.id);
                setPlay('true');
                var msg = new SpeechSynthesisUtterance();
                msg.volume = 1;
                msg.lang = "id-ID";
                msg.text = 'panggilan. antrian farmasi '+data.message.ketegori+''+data.message.no_urut;
                window.speechSynthesis.speak(msg);

                console.log('Panggil Antrian A ' + data.message.no_urut);
            }else if (data.message.ketegori == 'B') {
                setKategori(data.message.ketegori);
                setNourutB(data.message.no_urut);
                setidAntrian(data.message.id);
                setPlay('true');
                var msg = new SpeechSynthesisUtterance();
                msg.volume = 1;
                msg.lang = "id-ID";
                msg.text = 'panggilan. antrian farmasi '+data.message.ketegori+''+data.message.no_urut;
                window.speechSynthesis.speak(msg);
                console.log('Panggil Antrian B ' + data.message.no_urut);
            }
        });

        echo.channel('channel-stop-farmasi-a').listen('.stop-antrian-farmasi-a', (data) => {
            setPlay('false');
            window.speechSynthesis.cancel();
            // window.responsiveVoice.cancel();
            console.log('Stop Antrian ' + data.message.no_urut);
        });

        echo.channel('channel-lewati-farmasi-a').listen('.panggil-lewati-farmasi-a', (data) => {
            setPlay('false');
            window.speechSynthesis.cancel();
            // window.responsiveVoice.cancel();
            console.log('Lewati Antrian ' + data.message.no_urut);
        });

        // if (play === 'true') {
          
        //    // window.responsiveVoice.speak('PANGGILAN. antrian pendaftaran nomor ' + nourut, "Indonesian Male");
        // }

    }, []);


    return (

        <>

            <nav className="navbar bg-success navbar-fixed-top">
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
                        <strong style={{ fontSize: '25px', color: '#fff' }}>ANTRIAN APOTEK</strong>
                    </div>
                </div>
            </nav>

            <div className="container-fluid mt-5">
                <div className="row g-2">
                    <div className="col-lg-6 col-md-6">
                        <div className="card shadow rounded" style={{backgroundColor: '#cfe2ff'}}>
                            <h5 className="card-header text-center bg-primary" style={{ fontSize: '30px', color: '#FFF' }}>OBAR NON RACIKAN</h5>
                            <div className="card-body">
                                <h2 className="card-title text-center">ANTRIAN FARMASI</h2>
                                <h1 className="card-title text-center" style={{ fontSize: '230px' }}>A-{nourut}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="card shadow rounded" style={{backgroundColor: '#fff3cd'}}>
                            <h5 className="card-header text-center bg-warning" style={{ fontSize: '30px' , color: '#FFF'}}>OBAR RACIKAN</h5>
                            <div className="card-body ">
                                <h2 className="card-title text-center">ANTRIAN FARMASI</h2>
                                <h1 className="card-title text-center" style={{ fontSize: '230px' }}>B-{nourutB}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="footer fixed-bottom mt-auto py-3 bg-success">
                <div className="container-fluid text-white">
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

export default DisplayFarmasi;

