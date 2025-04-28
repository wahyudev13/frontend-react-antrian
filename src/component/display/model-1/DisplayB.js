import Container from "react-bootstrap/Container";
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import React from 'react';
import { useState, useEffect } from "react";
import Pusher from "pusher-js";
import Echo from 'laravel-echo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faClockFour } from "@fortawesome/free-solid-svg-icons";
import { faInstagramSquare, faSquareFacebook, faSquareYoutube, faSquareGooglePlus } from "@fortawesome/free-brands-svg-icons";
// import Nav from "react-bootstrap/Nav";
var date = new Date();


function DisplayB() {
    //Footer
    const [tanggal, setTanggal] = useState('');
    var time = new Date().toLocaleTimeString();
    const [jam, setJam] = useState(time);

    //AntrianD
    const [idD, setIdD] = useState(0);
    const [statusd, setStatusd] = useState(0);
    const [rawatd, setRawatd] = useState('');
    const [nomord, setNomord] = useState('000');
    const [namad, setNamad] = useState('-');
    const [polid, setPolid] = useState('Poliklinik D');
    const [dokterd, setDokterd] = useState('Dokter D');
    const [textd, setTextd] = useState('');
    const [playd, setPlayd] = useState('false');

    //AntrianE
    const [idE, setIdE] = useState(0);
    const [statuse, setStatuse] = useState(0);
    const [rawate, setRawate] = useState('');
    const [nomore, setNomore] = useState('000');
    const [namae, setNamae] = useState('-');
    const [polie, setPolie] = useState('Poliklinik E');
    const [doktere, setDoktere] = useState('Dokter E');
    const [texte, setTexte] = useState('');
    const [playe, setPlaye] = useState('false');

    //AntrianF
    const [idF, setIdF] = useState(0);
    const [statusf, setStatusf] = useState(0);
    const [rawatf, setRawatf] = useState('');
    const [nomorf, setNomorf] = useState('000');
    const [namaf, setNamaf] = useState('-');
    const [polif, setPolif] = useState('Poliklinik F');
    const [dokterf, setDokterf] = useState('Dokter F');
    const [textf, setTextf] = useState('');
    const [playf, setPlayf] = useState('false');

    const waktu = () => {
        var tahun = date.getFullYear();
        var bulan = date.getMonth();
        var tanggal = date.getDate();
        var hari = date.getDay();
        //Jam
        var jam = date.getHours();
        var menit = date.getMinutes();
        var detik = date.getSeconds();
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
        waktu()
        setInterval(() => {
            updateTime();
        }, 1000);
    });

    //Antrian D
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
        echo.channel('polid').listen('.polid-display', (data) => {
            setIdD(data.message.id)
            setStatusd(data.message.status)
            setRawatd(data.message.no_rawat)
            setNomord(data.message.no_reg)
            setNamad(data.message.nm_pasien)
            setPolid(data.message.nm_poli)
            setDokterd(data.message.nm_dokter)
            setTextd('panggilan, ' + data.message.nm_pasien.toLowerCase().slice(0, -2) + 'nomor antrian, ' + data.message.no_reg + ',ke, ' + data.message.nm_poli)

            if (data.message.status === 1) {
                setPlayd('true');
            } else {
                setPlayd('false');
                console.log('stop antrian D');
            }
        });


        if (playd !== 'false') {
            if (playe === 'true' || playf === 'true') {
                setTimeout(() => {
                    var msg = new SpeechSynthesisUtterance();
                    msg.volume = 1;
                    msg.lang = "id-ID";
                    msg.text = textd;
                    window.speechSynthesis.speak(msg);
                    //window.responsiveVoice.speak(textd, "Indonesian Male")
                }, 1000);
            } else {
                var msg = new SpeechSynthesisUtterance();
                msg.volume = 1;
                msg.lang = "id-ID";
                msg.text = textd;
                window.speechSynthesis.speak(msg);
                // window.responsiveVoice.speak(textd, "Indonesian Male")
            }
        }
    }, [rawatd, textd, playd, namad, nomord, idD]);

    //Antrian E
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
        echo.channel('polie').listen('.polie-display', (data) => {
            setIdE(data.message.id)
            setStatuse(data.message.status)
            setRawate(data.message.no_rawat)
            setNomore(data.message.no_reg)
            setNamae(data.message.nm_pasien)
            setPolie(data.message.nm_poli)
            setDoktere(data.message.nm_dokter)
            setTexte('panggilan, ' + data.message.nm_pasien.toLowerCase().slice(0, -2) + 'nomor antrian, ' + data.message.no_reg + ',ke, ' + data.message.nm_poli)

            if (data.message.status === 1) {
                setPlaye('true');
            } else {
                setPlaye('false');
                console.log('stop antrian E');
            }
        });

        if (playe !== 'false') {
            if (playd === 'true' || playf === 'true') {
                setTimeout(() => {
                    var msg = new SpeechSynthesisUtterance();
                    msg.volume = 1;
                    msg.lang = "id-ID";
                    msg.text = texte;
                    window.speechSynthesis.speak(msg);
                    //window.responsiveVoice.speak(texte, "Indonesian Male")
                }, 1000);
            } else {
                var msg = new SpeechSynthesisUtterance();
                msg.volume = 1;
                msg.lang = "id-ID";
                msg.text = texte;
                window.speechSynthesis.speak(msg);
                //window.responsiveVoice.speak(texte, "Indonesian Male")
            }
        }
    }, [rawate, playe, texte, nomore, idE]);

    //Antrian F
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
        echo.channel('polif').listen('.polif-display', (data) => {
            setIdF(data.message.id)
            setStatusf(data.message.status)
            setRawatf(data.message.no_rawat)
            setNomorf(data.message.no_reg)
            setNamaf(data.message.nm_pasien)
            setPolif(data.message.nm_poli)
            setDokterf(data.message.nm_dokter)
            setTextf('panggilan, ' + data.message.nm_pasien.toLowerCase().slice(0, -2) + 'nomor antrian, ' + data.message.no_reg + ',ke, ' + data.message.nm_poli)

            if (data.message.status === 1) {
                setPlayf('true');
            } else {
                setPlayf('false');
                console.log('stop antrian F');
            }
        });

        if (playf !== 'false') {
            if (playd === 'true' || playe === 'true') {
                setTimeout(() => {
                    var msg = new SpeechSynthesisUtterance();
                    msg.volume = 1;
                    msg.lang = "id-ID";
                    msg.text = textf;
                    window.speechSynthesis.speak(msg);
                    //window.responsiveVoice.speak(textf, "Indonesian Male")
                }, 1000);
            } else {
                var msg = new SpeechSynthesisUtterance();
                msg.volume = 1;
                msg.lang = "id-ID";
                msg.text = textf;
                window.speechSynthesis.speak(msg);
                // window.responsiveVoice.speak(textf, "Indonesian Male")
            }
        }
    }, [rawatf, playf, textf, nomorf, idF]);

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
        echo.channel('tes2').listen('.tes-antrian-2', (data) => {
            var msg = new SpeechSynthesisUtterance();
            msg.volume = 1;
            msg.lang = "id-ID";
            msg.text = data.message.text;
            window.speechSynthesis.speak(msg);
            console.log(data.message.text);
        });
    }, []);

    return (
        <div>
            <nav className="navbar bg-primary navbar-fixed-top ">
                <div className="container-fluid text-white">
                    <a className="navbar-brand text-white" href="/">
                        <img
                            alt=""
                            src="/logonavbar.png"
                            width="60"
                            height="60"
                            className="d-inline-block"
                        />{' '}
                        <strong style={{ fontSize: '25px' }}>RS PKU Muhammadiyah Sekapuk</strong>
                    </a>

                    <div className='d-flex'>
                        <strong style={{ fontSize: '25px' }}>ANTRIAN POLIKLINIK 2</strong>
                    </div>
                </div>
            </nav>
            <Container fluid>
                <Row className="g-4">
                    <Col xs={12} md={4}>
                        <Card className="text-center card-nomor">
                            <Card.Header className="displayb-header-top">{polid} ({dokterd})</Card.Header>
                            <Card.Body>
                                <Card.Title className="nama-pasien">{namad}</Card.Title>
                                <Card.Title className="no-antrian">{nomord}</Card.Title>
                            </Card.Body>
                            {/* <Card.Footer className="nama-dokter">{dokter}</Card.Footer> */}
                        </Card>
                        <Card className="text-center card-nomor">
                            <Card.Header className="displayb-header-top2">{polie} ({doktere})</Card.Header>
                            <Card.Body>
                                <Card.Title className="nama-pasien">{namae}</Card.Title>
                                <Card.Title className="no-antrian">{nomore}</Card.Title>
                            </Card.Body>
                            {/* <Card.Footer className="nama-dokter2">{dokterb}</Card.Footer> */}
                        </Card>
                        <Card className="text-center card-nomor">
                            <Card.Header className="displayb-header-top3">{polif} ({dokterf})</Card.Header>
                            <Card.Body>
                                <Card.Title className="nama-pasien">{namaf}</Card.Title>
                                <Card.Title className="no-antrian">{nomorf}</Card.Title>
                            </Card.Body>
                            {/* <Card.Footer className="nama-dokter3">{dokterc}</Card.Footer> */}
                        </Card>

                    </Col>

                    <Col xs={12} md={8}>
                        <Card className="center card-nomor">
                            <video autoPlay loop muted width="100%" height="auto">
                                <source src={process.env.REACT_APP_VIDIO_DISB} type="video/mp4" />
                                Sorry, your browser doesn't support videos.
                            </video>
                        </Card>
                        {[
                            'primary',
                        ].map((variant) => (
                            <Alert key={variant} variant={variant}>
                                <Alert.Heading className="text-center">
                                    <FontAwesomeIcon icon={faInstagramSquare} /> @rs.pkusekapuk
                                    <FontAwesomeIcon className="icojam" icon={faSquareFacebook} />  <FontAwesomeIcon icon={faSquareYoutube} /> RS Pku Muhammadiyah Sekapuk
                                    <FontAwesomeIcon className="icojam" icon={faSquareGooglePlus} /> www.rspkusekapuk.com
                                </Alert.Heading>
                            </Alert>
                        ))}
                    </Col>
                </Row>
            </Container>
            <Navbar bg="primary" fixed="bottom" className='footer navbar-app'>
                <Container fluid>
                    <marquee direction="left" className="credit-footer">Selamat Datang Di Rumah Sakit PKU Muhammadiyah Sekapuk</marquee>
                    <Navbar.Brand className="credit-footer">
                        <FontAwesomeIcon className="icojam" icon={faCalendarDays} /> {tanggal}   <FontAwesomeIcon className="icojam" icon={faClockFour} /> {jam}
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    );
}

export default DisplayB;

