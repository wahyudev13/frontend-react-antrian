import Container  from "react-bootstrap/Container";
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import React from 'react';
import {useState, useEffect} from "react";
import Pusher from "pusher-js";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarDays, faClockFour} from "@fortawesome/free-solid-svg-icons";
import Nav from "react-bootstrap/Nav";
var date = new Date();


function DisplayB() {
    //Footer
    const [tanggal, setTanggal] = useState('');
    const [jam, setJam] = useState('');
    
    //AntrianA
    const [statusd, setStatusd] = useState('');
    // const [rawat, setRawat] = useState('');
    const [nomord, setNomord] = useState('000');
    const [namad, setNamad] = useState('-');
    const [polid, setPolid] = useState('Poliklinik D');
    const [dokterd, setDokterd] = useState('Dokter D');
    const [textd, setTextd] = useState('');
    const [playd, setPlayd] = useState('false');

    //AntrianB
    const [statusb, setStatusb] = useState('');
    const [rawatb, setRawatb] = useState('');
    const [nomorb, setNomorb] = useState('000');
    const [namab, setNamab] = useState('-');
    const [polib, setPolib] = useState('Poliklinik E');
    const [dokterb, setDokterb] = useState('Dokter E');
    const [textb, setTextb] = useState('');
    const [playb, setPlayb] = useState('false');

    //AntrianC
    const [statusc, setStatusc] = useState('');
    const [rawatc, setRawatc] = useState('');
    const [nomorc, setNomorc] = useState('000');
    const [namac, setNamac] = useState('-');
    const [polic, setPolic] = useState('Poliklinik F');
    const [dokterc, setDokterc] = useState('Dokter F');
    const [textc, setTextc] = useState('');
    const [playc, setPlayc] = useState('false');

    useEffect(() => {
        var tahun = date.getFullYear();
        var bulan = date.getMonth();
        var tanggal = date.getDate();
        var hari = date.getDay();
        var jam = date.getHours();
        var menit = date.getMinutes();
        var detik = date.getSeconds();
        switch(hari) {
        case 0: hari = "Minggu"; break;
        case 1: hari = "Senin"; break;
        case 2: hari = "Selasa"; break;
        case 3: hari = "Rabu"; break;
        case 4: hari = "Kamis"; break;
        case 5: hari = "Jum'at"; break;
        case 6: hari = "Sabtu"; break;
        }
        switch(bulan) {
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
        setTanggal(hari+','+tanggal+' '+bulan+' '+tahun);
        setJam(jam+':'+menit+':'+detik)
  
    });

    useEffect(() => {
        const pusher = new Pusher('21a139d8f76c9979bae5', {
            cluster : "ap1",
            });
    
        // Subscribe to the channel we specified in our Laravel Event
        const channel = pusher.subscribe('polid');
        channel.bind('polid-display', data => {
            setStatusd(data.message.status)
            // setRawat(data.message.no_rawat)
            setNomord(data.message.no_reg)
            setNamad(data.message.nm_pasien)
            setPolid(data.message.nm_poli)
            setDokterd(data.message.nm_dokter)
            setTextd('panggilan, '+data.message.nm_pasien+'nomor antrian, '+data.message.no_reg+',ke, '+data.message.nm_poli)
        
            if (data.message.status === '1') {
                setPlayd('true');
            }else{
                setPlayd('false');
                window.responsiveVoice.cancel();
            }
        });
        if (playd !== 'false') {
            window.responsiveVoice.speak(textd,"Indonesian Male");
        }
    },[textd, namad,nomord,statusd]);

    //Antrian B
    useEffect(() => {
        const pusher2 = new Pusher('21a139d8f76c9979bae5', {
            cluster : "ap1",
            });
    
        // Subscribe to the channel we specified in our Laravel Event
        const channel2 = pusher2.subscribe('polib');
        channel2.bind('polib-display', data => {
            setStatusb(data.message.status)
            setRawatb(data.message.no_rawat)
            setNomorb(data.message.no_reg)
            setNamab(data.message.nm_pasien)
            setPolib(data.message.nm_poli)
            setDokterb(data.message.nm_dokter)
            setTextb('panggilan, '+data.message.nm_pasien+'nomor antrian, '+data.message.no_reg+',ke, '+data.message.nm_poli)
        
            if (data.message.status === '1') {
                setPlayb('true');
            }else{
                setPlayb('false');
                window.responsiveVoice.cancel();
            }
        });

        if (playb !== 'false') {
            window.responsiveVoice.speak(textb,"Indonesian Male");
        }
    },[rawatb,playb,textb]);

    //Antrian C
    useEffect(() => {
        const pusher3 = new Pusher('21a139d8f76c9979bae5', {
            cluster : "ap1",
            });
    
        // Subscribe to the channel we specified in our Laravel Event
        const channel3 = pusher3.subscribe('polic');
        channel3.bind('polic-display', data => {
            setStatusc(data.message.status)
            setRawatc(data.message.no_rawat)
            setNomorc(data.message.no_reg)
            setNamac(data.message.nm_pasien)
            setPolic(data.message.nm_poli)
            setDokterc(data.message.nm_dokter)
            setTextc('panggilan, '+data.message.nm_pasien+'nomor antrian, '+data.message.no_reg+',ke, '+data.message.nm_poli)
        
            if (data.message.status === '1') {
                setPlayc('true');
            }else{
                setPlayc('false');
                window.responsiveVoice.cancel();
            }
        });

        if (playc !== 'false') {
            window.responsiveVoice.speak(textc,"Indonesian Male");
        }
    },[rawatc,playc,textc]);

    return(
        <div>
        <Navbar sticky="top" className='navbar-app'>
        <Container fluid>
           <Nav>
                <Navbar.Brand>
                        <img
                        alt=""
                        src="/logonavbar.png"
                        width="60"
                        height="60"
                        className="d-inline-block"
                        />{' '}
                    <strong className='title-app'>RS PKU Muhammadiyah Sekapuk</strong>
                </Navbar.Brand>
           </Nav>
                
            
            <Nav>
                <Navbar.Brand>
                    <strong className='title-app'>ANTRIAN POLIKLINIK 2</strong>
                </Navbar.Brand>
            </Nav>
            
        </Container>
        </Navbar>
        <Container fluid>
            {/* <Row>
                <Col>
                    <Alert variant="success" style={{ margin: '10px' }}>
                        This is a  alert—check it out!
                    </Alert>
                </Col>
            </Row> */}
            <Row md={3} xs={1} lg={3} xl={3} xxl={3} className="g-4">
                <Col>
                    <Card className="text-center card-nomor"> 
                        <Card.Header className="displayb-header-top">{polid}</Card.Header>
                        <Card.Body>
                            <Card.Title className="nama-pasien">{namad}</Card.Title>
                            <Card.Title className="no-antrian">{nomord}</Card.Title>
                        </Card.Body>
                        <Card.Footer className="displayb-nama-dokter">{dokterd}</Card.Footer>
                    </Card>
                </Col>
                <Col>
                    <Card className="text-center card-nomor"> 
                        <Card.Header className="displayb-header-top2">{polib}</Card.Header>
                        <Card.Body>
                        <Card.Title className="nama-pasien">{namab}</Card.Title>
                            <Card.Title className="no-antrian">{nomorb}</Card.Title>
                        </Card.Body>
                        <Card.Footer className="displayb-nama-dokter2">{dokterb}</Card.Footer>
                    </Card>
                </Col>
                <Col>
                    <Card className="text-center card-nomor"> 
                        <Card.Header className="displayb-header-top3">{polic}</Card.Header>
                        <Card.Body>
                            <Card.Title className="nama-pasien">{namac}</Card.Title>
                            <Card.Title className="no-antrian">{nomorc}</Card.Title>
                        </Card.Body>
                        <Card.Footer className="displayb-nama-dokter3">{dokterc}</Card.Footer>
                    </Card>
                </Col>
                
            </Row>
        </Container>
        <Navbar fixed="bottom" className='footer navbar-app'>
            <Container fluid>
                <Navbar.Brand className="credit-footer">
                    <FontAwesomeIcon icon={faCalendarDays} /> {tanggal}   <FontAwesomeIcon className="icojam" icon={faClockFour} /> {jam}
                </Navbar.Brand>
                <Nav>
                    <Navbar.Brand className="credit-footer">
                        Created By IT RSMS
                    </Navbar.Brand>
                </Nav>
            </Container>
        </Navbar>
    </div>
    );
}

export default DisplayB;

