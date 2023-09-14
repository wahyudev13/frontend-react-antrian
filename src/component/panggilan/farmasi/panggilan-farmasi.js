import axios from "axios";
import React from 'react';
import { useState, useEffect } from "react";
const dateTime = new Date()
function PanggilanFarmasi() {
    const host = process.env.REACT_APP_API;
    const [antrians, setAntrian] = useState([]);
    const [idPanggil, setidPanggilA] = useState(false);
    const [idStop, setidStopA] = useState(false);
    const [idLewati, setidLewatiA] = useState(false);
    const [idSelesai, setidSelesaiA] = useState(false);
    const [kodeAntrian, setkodeAntrianA] = useState('');
    const [tanggal, setTanggal] = useState('');
    const [count, setCount] = useState('')
    const [nomor, setNomor] = useState('')

    const [antriansb, setAntrianb] = useState([]);
    const [countb, setCountb] = useState('')
    const [nomorb, setNomorb] = useState('')

    const [noreprint, setNoreprint] = useState('')



    const waktu = () => {
        var tahun = dateTime.getFullYear();
        var bulan = dateTime.getMonth();
        var tanggal = dateTime.getDate();
        var hari = dateTime.getDay();
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

    //GET NOMOR ANTRIAN A
    const getNomor = async () => {
        await axios.get(`${host}/api/farmasi/nomor/nomor-a/get`)
            .then(function (response) {
                setCount(response.data.data);
                setNomor(response.data.data);

            }).catch(function (error) {
                console.log(error.message);
            });

    }

    //GET ANTRIAN A
    const fectData = async () => {
        await axios.get(`${host}/api/farmasi/nomor/antrian-a/get`)
            .then(function (response) {
                setAntrian(response.data.data);
            }).catch(function (error) {
                console.log(error.message);
            });

    }

    //GET NOMOR ANTRIAN B
    const getNomorB = async () => {
        await axios.get(`${host}/api/farmasi/nomor/nomor-b/get`)
            .then(function (response) {
                setCountb(response.data.data);
                setNomorb(response.data.data);

            }).catch(function (error) {
                console.log(error.message);
            });

    }

    //GET ANTRIAN B
    const fectDataB = async () => {
        await axios.get(`${host}/api/farmasi/nomor/antrian-b/get`)
            .then(function (response) {
                setAntrianb(response.data.data);
            }).catch(function (error) {
                console.log(error.message);
            });

    }


    useEffect(() => {
        fectData()
        fectDataB()


        // setInterval(() => {
        //     waktu();
        // }, 1000);
    }, [idPanggil, idStop, idLewati, idSelesai, kodeAntrian]);

    useEffect(() => {
        getNomor();
        getNomorB();
        waktu()
    }, []);

    // useEffect(() => {
    //     fectData()
    //     fectDataB()
    // }, [idPanggil,idStop,idLewati,idSelesai,kodeAntrian]);


    //TAMBAH NOMOR ANTRIAN A
    const storePostA = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nourut', nomor);
        await axios.post(`${host}/api/farmasi/nomor/antrian-a/tambah`, formData)
            .then(() => {
                fectData();
                printDiv('printAntrianFarmasiA');
                getNomor();
            })
            .catch((error) => {
                alert(error.response.data.data);
            })

    };

    //TAMBAH NOMOR ANTRIAN B
    const storePostB = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nourut', nomorb);
        await axios.post(`${host}/api/farmasi/nomor/antrian-b/tambah`, formData)
            .then(() => {
                fectDataB();
                printDiv('printAntrianFarmasiB');
                getNomorB();
            })
            .catch((error) => {
                alert(error.response.data.data);
            })

    };

    const panggilAntrianA = async (id) => {
        try {
            await axios.post(`${host}/api/farmasi/nomor/antrian-a/panggil/${id}`);
            setidPanggilA(true);
            setidPanggilA(true);
            setidLewatiA(false);
            setidStopA(false);
            setkodeAntrianA(id);
            console.log('BERHASIL PANGGIL');
        } catch (error) {
            alert(error.response.data.data);
            console.log('ERROR');
        }

    }
    const stopAntrianA = async (id) => {
        try {
            await axios.post(`${host}/api/farmasi/nomor/antrian-a/stop/${id}`);
            setidPanggilA(false);
            setidLewatiA(false);
            setidStopA(true);
            setkodeAntrianA(id);
        } catch (error) {
            alert(error.response.data.data);
        }

    }

    const lewatiAntrianA = async (id) => {
        try {
            await axios.post(`${host}/api/farmasi/nomor/antrian-a/lewati/${id}`);
            setidPanggilA(false);
            setidStopA(false);
            setidLewatiA(true);
            setkodeAntrianA(id);
        } catch (error) {
            alert(error.response.data.data);
        }

    }
    const selesaiAntrianA = async (id) => {
        try {
            await axios.post(`${host}/api/farmasi/nomor/antrian-a/selesai/${id}`);
            setidPanggilA(false);
            setidStopA(false);
            setidLewatiA(false);
            setidSelesaiA(true);

            setkodeAntrianA(id);
        } catch (error) {
            alert(error.response.data.data);
        }

    }

    // const printAntrianA = async (nomor) => {
    //     setNoreprint(nomor)
    //     printDiv('printAntrianFarmasiAulang')
    // }


    function printAntrianA(nomor, kategori) {
        var PW = window.open('', '_blank', 'Print content');
        PW.document.write(
            `
            <div style="width:200px;font-family: Tahoma;margin-top:10px; margin-right:5px; margin-bottom:100px; margin-left:15px; font-size:21px!important; border:0px solid #000">
                <p style="font-size:12px" align="center"><strong>NOMOR ANTRIAN FARMASI</strong><br> OBAT NON RACIKAN<br>RS PKU Muhammadiyah Sekapuk</p>
                <hr></hr>
                <div className="row">
                    <div className="col">
                        <h1 style="font-size:40px; text-align:center;margin:0px;">`+ kategori + `-` + nomor + `</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <hr></hr>
                        <p style="font-size:12px" align="center">`+ tanggal + `</p>
                    </div>
                </div>
            </div>
          `
        );
        PW.document.close();
        PW.focus();
        PW.print();
    }

    function printAntrianB(nomor, kategori) {
        var PW = window.open('', '_blank', 'Print content');
        PW.document.write(
            `
            <div style="width:200px;font-family: Tahoma;margin-top:10px; margin-right:5px; margin-bottom:100px; margin-left:15px; font-size:21px!important; border:0px solid #000">
                <p style="font-size:12px" align="center"><strong>NOMOR ANTRIAN FARMASI</strong><br> OBAT RACIKAN<br>RS PKU Muhammadiyah Sekapuk</p>
                <hr></hr>
                <div className="row">
                    <div className="col">
                        <h1 style="font-size:40px; text-align:center;margin:0px;">`+ kategori + `-` + nomor + `</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <hr></hr>
                        <p style="font-size:12px" align="center">`+ tanggal + `</p>
                    </div>
                </div>
            </div>
          `
        );
        PW.document.close();
        PW.focus();
        PW.print();
    }

    function printDiv(kategori) {
        var PW = window.open('', '_blank', 'Print content');
        PW.document.write(document.getElementById(kategori).innerHTML);
        PW.document.close();
        PW.focus();
        PW.print();
        // PW.close();
    }

    return (

        <div className="container-fluid mt-3">
            {/* Print Page Non Racikan A */}
            <div id="printAntrianFarmasiA" style={{ display: 'none' }} className="cetak">
                <div style={{ width: '200px', fontFamily: 'Tahoma', marginTop: '10px', marginRight: '5px', marginBottom: '100px', marginLeft: '15px', fontSize: '21px!important', border: '0px solid #000' }}>
                    <p style={{ fontSize: '12px' }} align="center"><strong>NOMOR ANTRIAN FARMASI</strong> OBAT NON RACIKAN <br></br><br></br>RS PKU Muhammadiyah Sekapuk</p>
                    <hr></hr>
                    <div className="row">
                        <div className="col text-center">
                            <h1 style={{ fontSize: '40px', textAlign: 'center', margin: '0px' }}>A-{count}</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <hr></hr>
                            <p style={{ fontSize: '12px' }} align="center">{tanggal}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Print Page Racikan B */}
            <div id="printAntrianFarmasiB" style={{ display: 'none' }} className="cetak">
                <div style={{ width: '200px', fontFamily: 'Tahoma', marginTop: '10px', marginRight: '5px', marginBottom: '100px', marginLeft: '15px', fontSize: '21px!important', border: '0px solid #000' }}>
                    <p style={{ fontSize: '12px' }} align="center"><strong>NOMOR ANTRIAN FARMASI</strong> <br></br>OBAT RACIKAN <br></br>RS PKU Muhammadiyah Sekapuk</p>
                    <hr></hr>
                    <div className="row">
                        <div className="col text-center">
                            <h1 style={{ fontSize: '40px', textAlign: 'center', margin: '0px' }}>B-{countb}</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <hr></hr>
                            <p style={{ fontSize: '12px' }} align="center">{tanggal}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-6">
                    <div className="card">
                        <div className="d-grid gap-2">
                            <form onSubmit={storePostA}>
                                <button className="btn btn-primary" style={{ width: '100%' }} type="submit">TAMBAH ANTRIAN NON RACIKAN</button>
                            </form>
                        </div>
                        <div className="card-header">
                            <strong>ANTRIAN OBAT NON RACIKAN</strong>
                        </div>
                        <div className="card-body">
                            <div className="table-scroll table-responsive">
                                <table className="table table-sm table-wrapper">
                                    <thead className="table-warning">
                                        <tr>
                                            {/* <th>Nomor Antrian</th> */}
                                            <th>Nomor Antrian</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {antrians.length !== 0 ? antrians.map((antrian, index) => (
                                            <tr key={index}>
                                                {
                                                    antrian.status == "1" ?
                                                        <td className='bg-success text-white'><h3><strong>{antrian.no_urut}</strong></h3></td> :
                                                        antrian.status == 2 ?
                                                            <td className='bg-danger text-white'><h3><strong>{antrian.no_urut}</strong></h3></td> :
                                                            antrian.status == 3 ?
                                                                <td className='bg-warning text-white'><h3><strong>{antrian.no_urut}</strong></h3></td> :
                                                                antrian.status == 4 ?
                                                                    <td className='bg-light'><h3><strong>{antrian.no_urut}</strong></h3></td>
                                                                    :
                                                                    <td><h3><strong>{antrian.no_urut}</strong></h3></td>
                                                }
                                                <td>
                                                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                        <button type="button" className="btn btn-success" onClick={() => panggilAntrianA(antrian.id)} >Panggil</button>
                                                        <button type="button" className="btn btn-danger" onClick={() => stopAntrianA(antrian.id)}>Stop</button>
                                                        <button type="button" className="btn btn-warning" onClick={() => lewatiAntrianA(antrian.id)} >Lewati</button>
                                                        <button type="button" className="btn btn-dark" onClick={() => selesaiAntrianA(antrian.id)}>Selesai</button>
                                                        <button type="button" className="btn btn-secondary" onClick={() => printAntrianA(antrian.no_urut, antrian.ketegori)}>Print</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )) : <tr><td colSpan={2}><center>TIDAK ADA ANTRIAN FARMASI</center></td></tr>}
                                    </tbody>

                                </table>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="card">
                        <div className="d-grid gap-2">
                            <form onSubmit={storePostB}>
                                <button className="btn btn-warning" style={{ width: '100%' }} type="submit">TAMBAH ANTRIAN RACIKAN</button>
                            </form>
                        </div>
                        <div className="card-header">
                            <strong>ANTRIAN OBAT RACIKAN</strong>
                        </div>
                        <div className="card-body">
                            <div className="table-scroll table-responsive">
                                <table className="table table-sm table-wrapper">
                                    <thead className="table-warning">
                                        <tr>
                                            {/* <th>Nomor Antrian</th> */}
                                            <th>Nomor Antrian</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {antriansb.length !== 0 ? antriansb.map((antrianb, index) => (
                                            <tr key={index}>
                                                {
                                                    antrianb.status == "1" ?
                                                        <td className='bg-success text-white'><h3><strong>{antrianb.no_urut}</strong></h3></td> :
                                                        antrianb.status == 2 ?
                                                            <td className='bg-danger text-white'><h3><strong>{antrianb.no_urut}</strong></h3></td> :
                                                            antrianb.status == 3 ?
                                                                <td className='bg-warning text-white'><h3><strong>{antrianb.no_urut}</strong></h3></td> :
                                                                antrianb.status == 4 ?
                                                                    <td className='bg-light'><h3><strong>{antrianb.no_urut}</strong></h3></td>
                                                                    :
                                                                    <td><h3><strong>{antrianb.no_urut}</strong></h3></td>
                                                }
                                                <td>
                                                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                        <button type="button" className="btn btn-success" onClick={() => panggilAntrianA(antrianb.id)} >Panggil</button>
                                                        <button type="button" className="btn btn-danger" onClick={() => stopAntrianA(antrianb.id)}>Stop</button>
                                                        <button type="button" className="btn btn-warning" onClick={() => lewatiAntrianA(antrianb.id)} >Lewati</button>
                                                        <button type="button" className="btn btn-dark" onClick={() => selesaiAntrianA(antrianb.id)}>Selesai</button>
                                                        <button type="button" className="btn btn-secondary" onClick={() => printAntrianB(antrianb.no_urut, antrianb.ketegori)}>Print</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )) : <tr><td colSpan={2}><center>TIDAK ADA ANTRIAN FARMASI</center></td></tr>}
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <footer className="footer fixed-bottom mt-auto py-3 bg-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12" style={{ textAlign: 'center'}}>
                           <p style={{color: '#dadada', fontSize: '15px'}}>Antrian Farmasi &copy; IT RS PKU Muhammadiyah Sekapuk</p>
                        </div>
                    </div>

                </div>
            </footer>
        </div>
    );
}

export default PanggilanFarmasi;