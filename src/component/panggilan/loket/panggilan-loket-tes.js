import axios from "axios";
import React from 'react';
import { useState } from "react";

function PanggilanLoket() {
    const host = process.env.REACT_APP_API;
    const [noAntrian, setnoAntrian] = useState('SELAMAT DATANG DI PENDAFTARAN RS PKU MUHAMMADIYAH SEKAPUK');

    const panggilAntrian = async () => {
        try {
            const response = await axios.post(`${host}/api/antrian/tes/loket`, {
                text: noAntrian
            });
            console.log('TES PANGGILAN LOKET', response);
        } catch (error) {
            alert(error.response.data.data);
        }

    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12" style={{ textAlign: '-webkit-center' }}>
                    <div className="card" style={{ maxWidth: '90rem' }}>
                        <div className="card-header text-center text-bg-primary">
                            Antrian Pendaftaran Rawat Jalan (TES SUARA)
                        </div>
                        <div className="card-body">
                            <div className="input-group input-group-lg">
                                <input type="text" className="form-control" id="noantrian" aria-describedby="basic-addon3 basic-addon4"
                                    value={noAntrian}
                                    onChange={(e) => setnoAntrian(e.target.value)}
                                />
                                <button className="btn btn-success" type="button" id="panggil" onClick={() => panggilAntrian()}>Panggil</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="footer fixed-bottom mt-auto py-3 bg-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12" style={{ textAlign: 'center' }}>
                            <a href="/" style={{ color: '#dadada', fontSize: '15px', textDecoration: 'none' }}>Antrian Loket Pendaftaran &copy; IT RS PKU Muhammadiyah Sekapuk</a>
                        </div>
                    </div>

                </div>
            </footer>

        </div>

    );
}

export default PanggilanLoket;