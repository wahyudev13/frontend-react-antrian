import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';
import axios from "axios";
import React from 'react';

import { useState, useEffect } from "react";

function AntrianE() {

    const [antrians, setAntrian] = useState([]);
    const [polis, setPoli] = useState([]);
    const [kode, setKode] = useState('');
    const [count, setCount] = useState(0);
    const [disable, setDisable] = useState([]);
    const host = process.env.REACT_APP_API;
    const [selectedPoli, setSelectedPoli] = useState({ kd_poli: '', nm_poli: '' });
    const fectData = async () => {
        await axios.get(`${host}/api/cari?cari=${kode}`)
            .then(function (response) {
                const pasien = response.data.data;
                setAntrian(pasien);
                //console.log(response.data.data);
            }).catch(function (error) {
                console.log(error.message);
            });

        await axios.get(`${host}/api/getpoli`)
            .then(function (response) {
                const poli = response.data.data;
                setPoli(poli);
                //console.log(response.data.data);
            }).catch(function (error) {
                console.log(error.message);
            });
    }
    //useEffect hook
    useEffect(() => {
        fectData();
    }, [kode]);

    const setStore = async (no_reg, kd_dokter, kd_poli, no_rawat, no_rkm_medis, nm_pasien, nm_poli, nm_dokter, tgl_registrasi, kelas) => {
        if (disable.length === 0) {
            setCount(count + 1)
            setDisable(kelas)

            await axios.post(`${host}/api/antrian/storee`, {
                id: count,
                kd_dokter: kd_dokter,
                kd_poli: kd_poli,
                status: 1,
                no_rawat: no_rawat,
                no_reg: no_reg,
                no_rkm_medis: no_rkm_medis,
                nm_pasien: nm_pasien,
                nm_poli: nm_poli,
                nm_dokter: nm_dokter,
                tgl_registrasi: tgl_registrasi
            }).then(function (res) {
                console.log('success', res);
            }).catch(function (error) {
                console.log(error.message);
            });
        } else {
            alert('STOP ANTRIAN DAHULU');
        }
    }

    const setUpdate = async (tgl_registrasi, no_rkm_medis, kd_dokter, kd_poli, nm_pasien, nm_poli, nm_dokter, no_reg) => {
        setDisable([])

        await axios.post(`${host}/api/antriane/update/` + tgl_registrasi + '/' + no_rkm_medis + '/' + kd_dokter + '/' + kd_poli + '', {
            status: 2,
            nm_pasien: nm_pasien,
            nm_dokter: nm_dokter,
            nm_poli: nm_poli,
            no_reg: no_reg
        }).then(function (res) {
            console.log('success stop', res);
        }).catch(function (error) {
            console.log(error.message);
        });
    }
    const tesPanggilan = async (nm_poli) => {
        try {
            const response = await axios.post(`${host}/api/antrian/tes/2`, {
                text: `SELAMAT DATANG DI ${nm_poli || 'RS PKU Muhammadiyah Sekapuk'}`
            });
            console.log('TES PANGGILAN ANTRIAN 1', response);
            Swal.fire({
                title: 'Berhasil!',
                text: 'Panggilan berhasil dilakukan.',
                icon: 'success',
                timer: 900,
                showConfirmButton: false
            });

        } catch (error) {
            console.error('Terjadi kesalahan:', error);
            Swal.fire({
                title: 'Gagal!',
                text: 'Terjadi kesalahan: ' + error,
                icon: 'error',
                timer: 900,
                showConfirmButton: false
            });
        }
    };


    const reload = async () => {
        try {
            fectData();
            Swal.fire({
                title: 'Berhasil!',
                icon: 'success',
                timer: 900,
                showConfirmButton: false
            });
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
            Swal.fire({
                title: 'Gagal!',
                text: 'Terjadi kesalahan: ' + error,
                icon: 'error',
                timer: 900,
                showConfirmButton: false
            });
        }
    };

    return (
        <Container fluid>
            <Row>
                <Col>
                    <Card style={{ margin: '30px' }}>
                        <Card.Header className="header-antrian-e">
                            <Row>
                                <Col>
                                    Panggil Antrian Poliklinik E
                                </Col>
                                <Col xs={3}>
                                    <Form.Select aria-label="Floating label select example" onChange={(e) => {
                                        const selectedKode = e.target.value;
                                        setKode(selectedKode);
                                        if (selectedKode === '') {
                                            // Kalau kosong, reset selectedPoli
                                            setSelectedPoli({ kd_poli: '', nm_poli: '' });
                                        } else {
                                            const poliSelected = polis.find(poli => poli.kd_poli === selectedKode);
                                            if (poliSelected) {
                                                setSelectedPoli(poliSelected);
                                            }
                                        }
                                    }}>
                                        <option value="">- Pilih Poliklinik -</option>
                                        {
                                            polis.map((poli, index) => (
                                                <>
                                                    <option value={poli.kd_poli}>{poli.nm_poli}</option>
                                                </>
                                            ))
                                        }
                                    </Form.Select>

                                </Col>

                            </Row>

                        </Card.Header>
                        <Card.Body>
                            <div className="table-scroll table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr >
                                            <th>No Reg</th>
                                            <th>No Rawat</th>
                                            <th>No Rekam Medis</th>
                                            <th>Nama Pasien</th>
                                            <th>Poliklinik</th>
                                            <th>Penjamin</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {antrians.length !== 0 ? antrians.map((antrian, index) => (
                                            <tr className={antrian.stts === 'Sudah' ? 'table-danger' : ''} key={index}>
                                                <td>{antrian.no_reg}</td>
                                                <td>{antrian.no_rawat}</td>
                                                <td>{antrian.no_rkm_medis}</td>
                                                <td>{antrian.nm_pasien}</td>
                                                <td>{antrian.nm_poli}</td>
                                                <td>{antrian.png_jawab}</td>
                                                <td>
                                                    <Button disabled={disable === 'play-' + antrian.no_rawat ? true : false} onClick={() => setStore(antrian.no_reg, antrian.kd_dokter, antrian.kd_poli, antrian.no_rawat, antrian.no_rkm_medis, antrian.nm_pasien, antrian.nm_poli, antrian.nm_dokter, antrian.tgl_registrasi, 'play-' + antrian.no_rawat)} variant="primary" size="sm"><FontAwesomeIcon icon={faPlay} /> </Button>{' '}
                                                    <Button disabled={disable === 'play-' + antrian.no_rawat ? false : true} onClick={() => setUpdate(antrian.tgl_registrasi, antrian.no_rkm_medis, antrian.kd_dokter, antrian.kd_poli, antrian.nm_pasien, antrian.nm_dokter, antrian.nm_poli, antrian.no_reg)} variant="danger" size="sm"><FontAwesomeIcon icon={faStop} /> </Button>{' '}
                                                </td>
                                            </tr>
                                        )) : <tr><td colSpan={7}><center>TIDAK ADA PASIEN TERDAFTAR</center></td></tr>}
                                    </tbody>
                                </table>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col style={{ textAlign: '-webkit-center' }}>
                    <Button onClick={() => tesPanggilan(selectedPoli.nm_poli)} variant="danger" size="sm"><FontAwesomeIcon icon={faPlay} /> TES ANTRIAN BOS</Button>{' '}
                    <Button onClick={() => reload()} variant="success" size="sm"><FontAwesomeIcon icon={faSpinner} /> RELOAD PASIEN</Button>{' '}
                </Col>
            </Row>
            {selectedPoli.nm_poli && (
                <center style={{ marginTop: '20px' }}>
                    <h1>{selectedPoli.nm_poli}</h1>
                </center>
            )}
        </Container>
    );
}

export default AntrianE;


