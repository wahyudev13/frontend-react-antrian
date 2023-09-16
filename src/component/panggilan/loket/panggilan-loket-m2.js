import axios from "axios";
import React from 'react';
import { useState, useEffect } from "react";

function PanggilanLoket() {
    const host = process.env.REACT_APP_API;
    const [noAntrian, setnoAntrian] = useState(1);

    const panggilAntrian = async () => {
        try {
           await axios.post(`${host}/api/loket/m2/panggil/${noAntrian}`);

        } catch (error) {
            alert(error.response.data.data);
        }

    }
    const stopAntrian = async () => {
        try {
           await axios.post(`${host}/api/loket/m2/stop/${noAntrian}`);

        } catch (error) {
            alert(error.response.data.data);
        }

    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12" style={{textAlign: '-webkit-center'}}>
                    <div className="card" style={{ maxWidth: '30rem' }}>
                        <div className="card-header text-center text-bg-primary">
                            Antrian Pendaftaran Rawat Jalan (Nomor Manual)
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
                                <button className="btn btn-danger" type="button" id="stop" onClick={() => stopAntrian()}>Stop</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="footer fixed-bottom mt-auto py-3 bg-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12" style={{ textAlign: 'center'}}>
                        <a href="/" style={{color: '#dadada', fontSize: '15px', textDecoration: 'none'}}>Antrian Loket Pendaftaran &copy; IT RS PKU Muhammadiyah Sekapuk</a>
                        </div>
                    </div>

                </div>
            </footer>

        </div>

    );
}

export default PanggilanLoket;