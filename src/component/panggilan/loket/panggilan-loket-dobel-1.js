import axios from "axios";
import React from 'react';
import { useState, useEffect, useMemo, useCallback } from "react";
import Form from 'react-bootstrap/Form';
import { Helmet } from "react-helmet";
function PanggilanLoket1() {
    const host = process.env.REACT_APP_API;
    const [noAntrian, setnoAntrian] = useState(1);
    const [polis, setPoli] = useState([]);
    const [namaPoli, setNamaPoli] = useState('');
    const [loadingPoli, setLoadingPoli] = useState(false);
    const [isCalling, setIsCalling] = useState(false);

    // API headers (memoized)
    const headers = useMemo(() => ({
        "Accept": "application/json",
        "X-API-KEY": process.env.REACT_APP_API_KEY || "",
    }), []);

    const fectData = useCallback(async () => {
        setLoadingPoli(true);
        try {
            const response = await axios.get(`${host}/api/getpoli`, { headers });
            setPoli(response.data.data || []);
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoadingPoli(false);
        }
    }, [host, headers]);

    useEffect(() => {
        fectData();
    }, [fectData]);

    const panggilAntrian = useCallback(async () => {
        try {
            setIsCalling(true);
            await axios.post(`${host}/api/loket/dobel-1/panggil`, {
                nomor: noAntrian,
                namapoli: namaPoli
            }, { headers });
            console.log('success panggil');
        } catch (error) {
            alert(error?.response?.data?.data || 'Terjadi kesalahan');
        } finally {
            setIsCalling(false);
        }
    }, [host, headers, noAntrian, namaPoli]);
    // const stopAntrian = async () => {
    //     try {
    //         await axios.post(`${host}/api/loket/m2/stop/${noAntrian}`);

    //     } catch (error) {
    //         alert(error.response.data.data);
    //     }

    // }

    return (
        <div className="container mt-5">
            <Helmet>
                <meta charSet="utf-8" />
                <title>PANGGILAN LOKET 1</title>
            </Helmet>
            <div className="row">

                <div className="col-md-12" style={{ textAlign: '-webkit-center' }}>

                    <div className="card" style={{ maxWidth: '30rem', marginBottom: '20px' }}>
                        <div className="card-header text-center text-bg-primary" style={{ fontSize: '20px' }}>
                            Antrian Pendaftaran Loket 1
                        </div>
                        <div className="card-header text-center text-bg-primary">
                            <Form.Select aria-label="Floating label select example" onChange={(e) => setNamaPoli(e.target.value)} disabled={loadingPoli} value={namaPoli}>
                                <option value="">{loadingPoli ? 'Memuat daftar poli...' : '- PILIH POLIKLINIK DULU KAK -'}</option>
                                {polis.map((poli, index) => (
                                    <option key={index} value={poli.nm_poli}>{poli.nm_poli}</option>
                                ))}
                            </Form.Select>
                        </div>
                        <div className="card-body">
                            <div className="input-group input-group-lg">
                                <span className="input-group-text" id="basic-addon3">Nomor Antrian</span>
                                <input type="number" className="form-control" id="noantrian" aria-describedby="basic-addon3 basic-addon4"
                                    placeholder="Tulis Nomor Antrian"
                                    value={noAntrian}
                                    onChange={(e) => setnoAntrian(e.target.value)}
                                />
                                <button className="btn btn-success" type="button" id="panggil" onClick={panggilAntrian} disabled={isCalling}>
                                    {isCalling ? 'Memanggil...' : 'Panggil'}
                                </button>
                                {/* <button className="btn btn-danger" type="button" id="stop" onClick={() => stopAntrian()}>Stop</button> */}
                            </div>
                        </div>
                    </div>

                    <h1>{namaPoli}</h1>
                </div>
            </div>

            <footer className="footer fixed-bottom mt-auto py-3 bg-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12" style={{ textAlign: 'center' }}>
                            <a href="/" style={{ color: '#000', fontSize: '15px', textDecoration: 'none' }}>Antrian Loket Pendaftaran &copy; IT RS PKU Muhammadiyah Sekapuk</a>
                        </div>
                    </div>

                </div>
            </footer>

        </div>

    );
}

export default PanggilanLoket1;