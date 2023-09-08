import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Table from "react-bootstrap/Table";
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import React from 'react';
import { useState, useEffect } from "react";

function PanggilanLoket() {
    const host = process.env.REACT_APP_API;
    const [antrians, setAntrian] = useState([]);
    const [idPanggil, setidPanggil] = useState(false);
    const [idStop, setidStop] = useState(false);
    const [idLewati, setidLewati] = useState(false);
    const [idSelesai, setidSelesai] = useState(false);
    const [kodeAntrian, setkodeAntrian] = useState('');


    const fectData = async () => {
        await axios.get(`${host}/api/loket/get`)
            .then(function (response) {
                setAntrian(response.data.data);

            }).catch(function (error) {
                console.log(error.message);
            });

    }
    useEffect(() => {
        fectData()
    }, []);

    //useEffect hook
    useEffect(() => {
        fectData();
    }, [idPanggil, kodeAntrian, idStop, idLewati, idSelesai]);

    const panggilAntrian = async (id) => {
        try {
            const req = await axios.post(`${host}/api/loket/panggil/${id}`);
            setidPanggil(true);
            setidPanggil(true);
            setidLewati(false);
            setidStop(false);
            setkodeAntrian(id);
        } catch (error) {
            alert(error.response.data.data);
        }

    }
    const stopAntrian = async (id) => {
        try {
            const req = await axios.post(`${host}/api/loket/stop/${id}`);
            setidPanggil(false);
            setidLewati(false);
            setidStop(true);
            setkodeAntrian(id);
        } catch (error) {
            alert(error.response.data.data);
        }

    }

    const lewatiAntrian = async (id) => {
        try {
            const req = await axios.post(`${host}/api/loket/lewati/${id}`);
            setidPanggil(false);
            setidStop(false);
            setidLewati(true);
            setkodeAntrian(id);
        } catch (error) {
            alert(error.response.data.data);
        }

    }
    const selesaiAntrian = async (id) => {
        try {
            const req = await axios.post(`${host}/api/loket/selesai/${id}`);
            setidPanggil(false);
            setidStop(false);
            setidLewati(false);
            setidSelesai(true);

            setkodeAntrian(id);
        } catch (error) {
            alert(error.response.data.data);
        }

    }

    return (
        // <Container>
        //     <Row>
        //         <Col>
        //             <Card style={{ margin: '30px' }}>
        //                 <Card.Header className="header-antrian-a">
        //                     <Row>
        //                         <Col>
        //                             Panggilan Loket Pendaftaran
        //                         </Col>
        //                     </Row>

        //                 </Card.Header>
        //                 <Card.Body>
        //                     <Table striped bordered hover responsive size="sm">
        //                         <thead>
        //                             <tr>
        //                                 <th>No Antrian</th>
        //                                 <th>Aksi</th>
        //                             </tr>
        //                         </thead>
        //                         <tbody>
        //                             {antrians.length !== 0 ? antrians.map((antrian, index) => (
        //                                 <tr key={index}>
        //                                     <td>{antrian.noantrian}</td>
        //                                     <td>
        //                                         <div className="btn-group btn-group-sm" role="group" aria-label="Basic mixed styles example">
        //                                             <button type="button" className="btn btn-success">Panggil</button>
        //                                             <button type="button" className="btn btn-danger">Stop</button>
        //                                             <button type="button" className="btn btn-warning" >Lewati</button>
        //                                             <button type="button" className="btn btn-secondary" >Selesai</button>
        //                                         </div>
        //                                     </td>
        //                                 </tr>
        //                             )) : <tr><td colSpan={6}><center>TIDAK ADA ANTRIAN</center></td></tr>}
        //                         </tbody>
        //                     </Table>

        //                 </Card.Body>
        //             </Card>
        //         </Col>
        //     </Row>
        // </Container>
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    Antrian Pendaftaran Rawat Jalan
                </div>
                <div className="card-body">
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

                                    {/* <td>{antrian.no_urut}</td> */}

                                    {
                                        antrian.status == 1 ?
                                            <td className='bg-success text-white'>{antrian.noantrian}</td> :
                                            antrian.status == 2 ?
                                                <td className='bg-danger text-white'>{antrian.noantrian}</td> :
                                                antrian.status == 3 ?
                                                    <td className='bg-warning text-white'>{antrian.noantrian}</td> :
                                                    antrian.status == 4 ?
                                                        <td className='bg-light'>{antrian.noantrian}</td>
                                                        :
                                                        <td>{antrian.noantrian}</td>
                                    }
                                    <td>
                                        <div className="btn-group btn-group-sm" role="group" aria-label="Basic mixed styles example">
                                            <button type="button" className="btn btn-success" onClick={() => panggilAntrian(antrian.kd)} >Panggil</button>
                                            <button type="button" className="btn btn-danger" onClick={() => stopAntrian(antrian.kd)}>Stop</button>
                                            <button type="button" className="btn btn-warning" onClick={() => lewatiAntrian(antrian.kd)} >Lewati</button>
                                            <button type="button" className="btn btn-secondary" onClick={() => selesaiAntrian(antrian.kd)}>Selesai</button>
                                        </div>
                                    </td>
                                </tr>
                            )) : <tr><td colSpan={2}><center>TIDAK ADA ANTRIAN PENDAFTARAN</center></td></tr>}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}

export default PanggilanLoket;