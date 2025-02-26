import React from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faClockFour, } from "@fortawesome/free-solid-svg-icons";
import { faInstagramSquare, faSquareFacebook, faSquareYoutube, faSquareGooglePlus } from "@fortawesome/free-brands-svg-icons";

var date = new Date();
let isAudioPlaying = false;
function playNextAudio(audioList) {
    if (audioList.length > 0) {
        if (isAudioPlaying) return;

        var nextAudio = audioList.shift();
        isAudioPlaying = true;
        nextAudio.play();

        nextAudio.onended = function () {
            isAudioPlaying = false;
            playNextAudio(audioList);
        };
    }
}

function DisplayLoket2() {
    const [nourut, setNourut] = useState('0');


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
        echo.channel('channel-panggil-loket-manual').listen('.panggil-antrian-loket-manual', (data) => {
            setNourut(data.message);

            var audioList = [
                //new Audio("audio/bell.wav"),
                new Audio("audio/loketpendaftaran2.wav"),
            ];

            // Ratusan
            if (data.message >= 100 && data.message < 1000) {
                let ratusan = Math.floor(data.message / 100) * 100;
                audioList.push(new Audio("audio/" + ratusan + ".wav"));

                let puluhanDanSatuan = data.message % 100;

                if (puluhanDanSatuan >= 1 && puluhanDanSatuan <= 20) {
                    audioList.push(new Audio("audio/" + puluhanDanSatuan + ".wav"));
                } else if (puluhanDanSatuan === 0 || puluhanDanSatuan % 10 === 0) {
                    audioList.push(new Audio("audio/" + puluhanDanSatuan + ".wav"));
                } else {
                    let puluhan = Math.floor(puluhanDanSatuan / 10) * 10;
                    let satuan = puluhanDanSatuan % 10;

                    audioList.push(new Audio("audio/" + puluhan + ".wav"));
                    if (satuan > 0) {
                        audioList.push(new Audio("audio/" + satuan + ".wav"));
                    }
                }
            }
            // Nomor antrian 1-99
            else if (data.message >= 1 && data.message <= 99) {
                if (
                    (data.message >= 1 && data.message <= 20) ||
                    data.message === 30 || data.message === 40 || data.message === 50 ||
                    data.message === 60 || data.message === 70 || data.message === 80 ||
                    data.message === 90
                ) {
                    audioList.push(new Audio("audio/" + data.message + ".wav"));
                } else if (data.message >= 21 && data.message <= 99) {
                    let puluhan = Math.floor(data.message / 10) * 10;
                    let satuan = data.message % 10 / 1

                    audioList.push(new Audio("audio/" + puluhan + ".wav"));
                    if (satuan > 0) {
                        audioList.push(new Audio("audio/" + satuan + ".wav"));
                    }
                }
            }

            playNextAudio(audioList);
            console.log('Panggil Antrian ' + data.message);

            // window.responsiveVoice.speak('PANGGILAN. antrian pendaftaran nomor ' + data.message, "Indonesian Male");

        });
        echo.channel('channel-stop-loket-manual').listen('.stop-antrian-loket-manual', (data) => {
            window.speechSynthesis.cancel();
            console.log('Stop Antrian ' + data.message);
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

            <nav className="navbar bg-warning navbar-fixed-top">
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

                    <div className='d-flex'>
                        <strong style={{ fontSize: '25px', color: '#1c2474' }}>ANTRIAN LOKET PENDAFTARAN 3</strong>
                    </div>
                </div>
            </nav>

            <div className="container-fluid mt-5" >
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
                            <video autoPlay loop muted width="100%" height="auto">
                                <source src={process.env.REACT_APP_VIDIO_LOKET} type="video/mp4" />
                                Sorry, your browser doesn't support videos.
                            </video>
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
                            <div className="col-lg-6" style={{ textAlign: 'right' }}>
                                <FontAwesomeIcon icon={faInstagramSquare} /> @rs.pkusekapuk
                                <FontAwesomeIcon className="icojam" icon={faSquareFacebook} />  <FontAwesomeIcon icon={faSquareYoutube} /> RS Pku Muhammadiyah Sekapuk
                                <FontAwesomeIcon className="icojam" icon={faSquareGooglePlus} /> www.rspkusekapuk.com
                            </div>
                        </div>

                    </div>
                </footer>
            </div>

        </>
    );
}

export default DisplayLoket2;

