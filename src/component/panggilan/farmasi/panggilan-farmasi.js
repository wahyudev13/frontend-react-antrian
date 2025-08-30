import axios from "axios";
import React from 'react';
import { useState, useEffect, useRef, useCallback, useMemo } from "react";

const dateTime = new Date()

function PanggilanFarmasi() {
    const host = process.env.REACT_APP_API;

    // API Headers (memoized)
    const headers = useMemo(() => ({
        "Accept": "application/json",
        "X-API-KEY": process.env.REACT_APP_API_KEY || "",
    }), []);

    // Debug: Log environment variables
    console.log('Environment Variables Check:', {
        REACT_APP_API: host,
        REACT_APP_API_KEY: process.env.REACT_APP_API_KEY ? '***' + process.env.REACT_APP_API_KEY.slice(-4) : 'NOT SET',
        NODE_ENV: process.env.NODE_ENV
    });

    // Validate API Key
    if (!process.env.REACT_APP_API_KEY) {
        console.error('❌ REACT_APP_API_KEY is not set! This will cause 401 errors.');
        console.error('💡 Solution: Create a .env file with REACT_APP_API_KEY=your_actual_api_key');
    } else {
        console.log('✅ API Key is set');
    }

    const [antrians, setAntrian] = useState([]);
    // Removed unused state: idPanggil, idStop, idLewati, idSelesai, idProses, kodeAntrian, kategori
    const [tanggal, setTanggal] = useState('');
    const [count, setCount] = useState('');
    const [nomor, setNomor] = useState('');

    const [antriansb, setAntrianb] = useState([]);
    const [countb, setCountb] = useState('');
    const [nomorb, setNomorb] = useState('');

    // Loading states
    const [loadingA, setLoadingA] = useState(false);
    const [loadingB, setLoadingB] = useState(false);

    // Track initial load to only show spinner on first fetch
    const hasLoadedA = useRef(false);
    const hasLoadedB = useRef(false);

    const waktu = () => {
        var tahun = dateTime.getFullYear();
        var bulan = dateTime.getMonth();
        var tanggal = dateTime.getDate();
        var hari = dateTime.getDay();
        // //Jam
        // var jam = date.getHours();
        // var menit = date.getMinutes();
        // var detik = date.getSeconds();
        const namaHari = [
            "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"
        ];

        const namaBulan = [
            "Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];
        setTanggal(`${namaHari[hari]}, ${tanggal} ${namaBulan[bulan]} ${tahun}`);

    }

    //GET NOMOR ANTRIAN A
    const getNomor = useCallback(async () => {
        try {
            const response = await axios.get(`${host}/api/farmasi/nomor/nomor-a/get`, { headers });
            setCount(response.data.data);
            setNomor(response.data.data);
        } catch (error) {
            console.error('Error getting nomor A:', error);
            if (error.response?.status === 401) {
                console.error('401 Unauthorized: Check your API Key');
            }
        }
    }, [host, headers]);

    //GET ANTRIAN A
    const fectData = useCallback(async () => {
        if (!hasLoadedA.current) {
            setLoadingA(true);
        }
        try {
            const response = await axios.get(`${host}/api/farmasi/nomor/antrian-a/get`, { headers });
            setAntrian(response.data.data);
        } catch (error) {
            console.error('Error fetching antrian A:', error);
            if (error.response?.status === 401) {
                console.error('401 Unauthorized: Check your API Key');
            }
        } finally {
            setLoadingA(false);
            hasLoadedA.current = true;
        }
    }, [host, headers]);

    //GET NOMOR ANTRIAN B
    const getNomorB = useCallback(async () => {
        try {
            const response = await axios.get(`${host}/api/farmasi/nomor/nomor-b/get`, { headers });
            setCountb(response.data.data);
            setNomorb(response.data.data);
        } catch (error) {
            console.error('Error getting nomor B:', error);
            if (error.response?.status === 401) {
                console.error('401 Unauthorized: Check your API Key');
            }
        }
    }, [host, headers]);

    //GET ANTRIAN B
    const fectDataB = useCallback(async () => {
        if (!hasLoadedB.current) {
            setLoadingB(true);
        }
        try {
            const response = await axios.get(`${host}/api/farmasi/nomor/antrian-b/get`, { headers });
            setAntrianb(response.data.data);
        } catch (error) {
            console.error('Error fetching antrian B:', error);
            if (error.response?.status === 401) {
                console.error('401 Unauthorized: Check your API Key');
            }
        } finally {
            setLoadingB(false);
            hasLoadedB.current = true;
        }
    }, [host, headers]);

    useEffect(() => {
        fectData();
        fectDataB();
    }, [fectData, fectDataB]);

    useEffect(() => {
        getNomor();
        getNomorB();
        waktu();
        // Set page title
        document.title = "PANGGILAN FARMASI";
    }, [getNomor, getNomorB]);

    //TAMBAH NOMOR ANTRIAN A
    const storePostA = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nourut', nomor);
        try {
            await axios.post(`${host}/api/farmasi/nomor/antrian-a/tambah`, formData, { headers });
            fectData();
            printDiv('printAntrianFarmasiA');
            getNomor();
        } catch (error) {
            console.error('Error storing post A:', error);
            if (error.response?.status === 401) {
                alert('Error 401: API Key tidak valid. Silakan periksa konfigurasi.');
            } else {
                alert(error.response?.data?.data || 'Terjadi kesalahan');
            }
        }
    };

    //TAMBAH NOMOR ANTRIAN B
    const storePostB = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nourut', nomorb);
        try {
            await axios.post(`${host}/api/farmasi/nomor/antrian-b/tambah`, formData, { headers });
            fectDataB();
            printDiv('printAntrianFarmasiB');
            getNomorB();
        } catch (error) {
            console.error('Error storing post B:', error);
            if (error.response?.status === 401) {
                alert('Error 401: API Key tidak valid. Silakan periksa konfigurasi.');
            } else {
                alert(error.response?.data?.data || 'Terjadi kesalahan');
            }
        }
    };

    const panggilAntrianA = async (id) => {
        try {
            await axios.post(`${host}/api/farmasi/nomor/antrian/panggil/${id}`, {}, { headers });
            // update state flags removed; directly refresh lists
            console.log('BERHASIL PANGGIL');
            // Refresh lists without triggering table spinners
            fectData();
            fectDataB();
        } catch (error) {
            console.error('Error panggil antrian A:', error);
            if (error.response?.status === 401) {
                alert('Error 401: API Key tidak valid. Silakan periksa konfigurasi.');
            } else {
                alert(error.response?.data?.data || 'Terjadi kesalahan');
            }
        }
    }

    const stopAntrianA = async (id) => {
        try {
            await axios.post(`${host}/api/farmasi/nomor/antrian/stop/${id}`, {}, { headers });

            fectData();
            fectDataB();
        } catch (error) {
            console.error('Error stop antrian A:', error);
            if (error.response?.status === 401) {
                alert('Error 401: API Key tidak valid. Silakan periksa konfigurasi.');
            } else {
                alert(error.response?.data?.data || 'Terjadi kesalahan');
            }
        }
    }

    const lewatiAntrianA = async (id) => {
        try {
            await axios.post(`${host}/api/farmasi/nomor/antrian/lewati/${id}`, {}, { headers });

            fectData();
            fectDataB();
        } catch (error) {
            console.error('Error lewati antrian A:', error);
            if (error.response?.status === 401) {
                alert('Error 401: API Key tidak valid. Silakan periksa konfigurasi.');
            } else {
                alert(error.response?.data?.data || 'Terjadi kesalahan');
            }
        }
    }

    const selesaiAntrianA = async (id) => {
        try {
            await axios.post(`${host}/api/farmasi/nomor/antrian/selesai/${id}`, {}, { headers });

            fectData();
            fectDataB();
        } catch (error) {
            console.error('Error selesai antrian A:', error);
            if (error.response?.status === 401) {
                alert('Error 401: API Key tidak valid. Silakan periksa konfigurasi.');
            } else {
                alert(error.response?.data?.data || 'Terjadi kesalahan');
            }
        }
    }

    const proses = async (id) => {
        try {
            await axios.post(`${host}/api/farmasi/nomor/antrian/proses/${id}`, {}, { headers });

            fectData();
            fectDataB();
        } catch (error) {
            console.error('Error proses A:', error);
            if (error.response?.status === 401) {
                alert('Error 401: API Key tidak valid. Silakan periksa konfigurasi.');
            } else {
                alert(error.response?.data?.data || 'Terjadi kesalahan');
            }
        }
    }

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
                                <table className="table table-wrapper">
                                    <thead className="table-warning">
                                        <tr>
                                            <th className="tb-head-sticky">Nomor Antrian</th>
                                            <th className="tb-head-sticky">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loadingA ? (
                                            <tr>
                                                <td colSpan={2} className="text-center">
                                                    <div className="d-flex justify-content-center align-items-center py-4">
                                                        <div className="spinner-border text-primary me-2" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                        <span>Loading data...</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : antrians.length !== 0 ? antrians.map((antrian, index) => (
                                            <tr key={index}>
                                                {
                                                    antrian.status === 1 ?
                                                        <td className='bg-success text-white'><h3><strong>{antrian.no_urut}</strong></h3></td> :
                                                        antrian.status === 2 ?
                                                            <td className='bg-danger text-white'><h3><strong>{antrian.no_urut}</strong></h3></td> :
                                                            antrian.status === 3 ?
                                                                <td className='bg-warning text-white'><h3><strong>{antrian.no_urut}</strong></h3></td> :
                                                                antrian.status === 4 ?
                                                                    <td className='bg-light'><h3><strong>{antrian.no_urut}</strong></h3></td> :
                                                                    antrian.status === 5 ?
                                                                        <td className='bg-primary' style={{ color: 'white' }}><h3><strong>{antrian.no_urut}</strong></h3></td>
                                                                        :
                                                                        <td><h3><strong>{antrian.no_urut}</strong></h3></td>
                                                }
                                                <td>
                                                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                        <button type="button" className="btn btn-primary" onClick={() => proses(antrian.id)}>Proses</button>
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
                                <table className="table table-wrapper">
                                    <thead className="table-warning">
                                        <tr>
                                            <th className="tb-head-sticky">Nomor Antrian</th>
                                            <th className="tb-head-sticky">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loadingB ? (
                                            <tr>
                                                <td colSpan={2} className="text-center">
                                                    <div className="d-flex justify-content-center align-items-center py-4">
                                                        <div className="spinner-border text-warning me-2" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                        <span>Loading data...</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : antriansb.length !== 0 ? antriansb.map((antrianb, index) => (
                                            <tr key={index}>
                                                {
                                                    antrianb.status === 1 ?
                                                        <td className='bg-success text-white'><h3><strong>{antrianb.no_urut}</strong></h3></td> :
                                                        antrianb.status === 2 ?
                                                            <td className='bg-danger text-white'><h3><strong>{antrianb.no_urut}</strong></h3></td> :
                                                            antrianb.status === 3 ?
                                                                <td className='bg-warning text-white'><h3><strong>{antrianb.no_urut}</strong></h3></td> :
                                                                antrianb.status === 4 ?
                                                                    <td className='bg-light'><h3><strong>{antrianb.no_urut}</strong></h3></td> :
                                                                    antrianb.status === 5 ?
                                                                        <td className='bg-primary' style={{ color: 'white' }}><h3><strong>{antrianb.no_urut}</strong></h3></td>
                                                                        :
                                                                        <td><h3><strong>{antrianb.no_urut}</strong></h3></td>
                                                }
                                                <td>
                                                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                        <button type="button" className="btn btn-primary" onClick={() => proses(antrianb.id)}>Proses</button>
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
                        <div className="col-lg-12" style={{ textAlign: 'center' }}>
                            <a href="/" style={{ color: '#000', fontSize: '15px', textDecoration: 'none' }}>Antrian Farmasi &copy; IT RS PKU Muhammadiyah Sekapuk</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default PanggilanFarmasi;