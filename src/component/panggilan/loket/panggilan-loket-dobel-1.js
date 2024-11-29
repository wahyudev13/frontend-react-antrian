import axios from "axios";
import React from 'react';
import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import { Helmet } from "react-helmet";
function PanggilanLoket1() {
    const host = process.env.REACT_APP_API;
    const [noAntrian, setnoAntrian] = useState(1);
    const [polis, setPoli] = useState([]);
    const [namaPoli, setNamaPoli] = useState('');


    useEffect(() => {
        const fectData = async () => {
            await axios.get(`${host}/api/getpoli`)
                .then(function (response) {
                    const poli = response.data.data;
                    setPoli(poli);
                    //console.log(response.data.data);
                }).catch(function (error) {
                    console.log(error.message);
                });
        }
        fectData()
    }, []);

    const panggilAntrian = async () => {
        if (namaPoli !== '') {
            try {
                await axios.post(`${host}/api/loket/dobel-1/panggil`, {
                    nomor: noAntrian,
                    namapoli: namaPoli
                }).then(function (res) {
                    console.log('success', res);
                }).catch(function (error) {
                    console.log(error.message);
                });
            } catch (error) {
                alert(error.response.data.data);
            }
        } else {
            alert('PILIH POLIKLINIK DULU YA KAK :)');
        }
    }
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
                            <Form.Select aria-label="Floating label select example" onChange={(e) => setNamaPoli(e.target.value)}>
                                <option value="">- PILIH POLIKLINIK DULU KAK -</option>
                                {
                                    polis.map((poli, index) => (
                                        <>
                                            <option key={index} value={poli.nm_poli}>{poli.nm_poli}</option>
                                        </>
                                    ))
                                }
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
                                <button className="btn btn-success" type="button" id="panggil" onClick={() => panggilAntrian()}>Panggil</button>
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