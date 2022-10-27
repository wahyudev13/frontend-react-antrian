import Container  from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Table from "react-bootstrap/Table";

//import $ from 'jquery';

import Form from 'react-bootstrap/Form';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlay, faStop, faSpellCheck} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import React from 'react';

import { useState , useEffect } from "react";

function AntrianD() {

    const [antrians, setAntrian] = useState([]);
    const [polis, setPoli] = useState([]);
    const [kode, setKode] = useState('');

    const fectData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/cari/?cari=${kode}`);
            const respoli = await axios.get('http://127.0.0.1:8000/api/getpoli');
            //get response data
            const data = await response.data.data;
            const data2 = await respoli.data.data;
            //assign response data to state "posts"
            setAntrian(data);
            setPoli(data2);
        } catch (e) {
            console.log(e.message);
        }
    }
    //useEffect hook
    useEffect(() => {
        fectData();
    }, [kode]);

    const setStorec = async (no_reg, kd_dokter, kd_poli, no_rawat, no_rkm_medis,nm_pasien, nm_poli, nm_dokter, tgl_registrasi) => {
        //console.log(no_reg, kd_dokter)
        try {
            await axios.post('http://127.0.0.1:8000/api/antrian/stored',{
                kd_dokter : kd_dokter,
                kd_poli : kd_poli,
                status : '1',
                no_rawat : no_rawat,
                no_reg : no_reg,
                no_rkm_medis : no_rkm_medis,
                nm_pasien : nm_pasien,
                nm_poli : nm_poli,
                nm_dokter : nm_dokter,
                tgl_registrasi : tgl_registrasi
            });
            console.log('success')
        } catch (e) {
            console.log(e.message);
            alert('STOP ANTRIAN DULU')
        }
    }

    const setUpdate = async (tgl_registrasi,no_rkm_medis,kd_dokter,kd_poli, nm_pasien,nm_poli,nm_dokter, no_reg) => {
        try {
            await axios.post('http://127.0.0.1:8000/api/antriand/update/'+tgl_registrasi+'/'+no_rkm_medis+'/'+kd_dokter+'/'+kd_poli+'/',{
                status : '2',
                // nm_pasien : nm_pasien,
                // nm_dokter : nm_dokter,
                // nm_poli : nm_poli,
                // no_reg : no_reg
            });
            console.log('success updated')
            alert('ANTRIAN BERHASIL DI STOP')
        } catch (error) {
            alert('PASIEN BELUM DIPANGGIL')
            console.log(error.message);
        }
    }

    
    return(
        <Container>
            <Row>
                <Col>
                <Card style={{ margin: '30px' }}>
                    <Card.Header className="header-antrian-d">
                    <Row>
                            <Col>
                                Panggil Antrian Poliklinik D
                            </Col>
                            <Col  xs={3}>
                               
                                <Form.Select aria-label="Floating label select example" onChange={(e) => setKode(e.target.value)}>
                                <option value="">- Pilih Poliklinik -</option>
                                    {
                                        polis.map((poli,index) => (
                                            <>
                                                <option value={poli.kd_poli}>{poli.nm_poli}</option>
                                            </>
                                        ))
                                    }
                                </Form.Select>
                                {/* <Col sm="10">
                                    <Button  type="submit" Button variant="outline-primary"><FontAwesomeIcon icon={faSpellCheck} /></Button>{' '}
                                </Col> */}
                                    
                            </Col>
                                
                        </Row>
                    </Card.Header>
                    <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>No Reg</th>
                                <th>No Rawat</th>
                                <th>No Rekam Medis</th>
                                <th>Nama Pasien</th>
                                <th>Poliklinik</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {antrians.map((antrian, index) => (
                               <tr key={index}>
                                    <td>{antrian.no_reg}</td>
                                    <td>{antrian.no_rawat}</td>
                                    <td>{antrian.no_rkm_medis}</td>
                                    <td>{antrian.nm_pasien}</td>
                                    <td>{antrian.nm_poli}</td>
                                    <td> 
                                        <Button onClick={() => setStorec(antrian.no_reg, antrian.kd_dokter, antrian.kd_poli, antrian.no_rawat, antrian.no_rkm_medis,antrian.nm_pasien,antrian.nm_poli,antrian.nm_dokter, antrian.tgl_registrasi)} variant="primary" size="sm"><FontAwesomeIcon icon={faPlay} /> </Button>{' '}
                                        <Button onClick={() => setUpdate(antrian.tgl_registrasi,antrian.no_rkm_medis,antrian.kd_dokter, antrian.kd_poli,antrian.nm_pasien,antrian.nm_dokter,antrian.nm_poli,antrian.no_reg)} variant="danger" size="sm"><FontAwesomeIcon icon={faStop} /> </Button>{' '}
                                    </td>
                                </tr> 
                            ))}
                        </tbody>
                        </Table>

                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default AntrianD;


