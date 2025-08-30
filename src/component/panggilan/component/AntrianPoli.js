import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop, faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function AntrianPoli({
    polis,
    antrians,
    selectedPoli,
    setSelectedPoli,
    setKode,
    disable,
    setStore,
    setUpdate,
    tesPanggilan,
    reload,
    title = "Panggil Antrian Poliklinik",
    headerClass = "header-antrian-a"
}) {
    return (
        <Container fluid>
            <Row>
                <Col>
                    <Card style={{ margin: "30px" }}>
                        <Card.Header className={headerClass}>
                            <Row>
                                <Col>{title}</Col>
                                <Col xs={3}>
                                    <Form.Select
                                        aria-label="Floating label select example"
                                        onChange={(e) => {
                                            const selectedKode = e.target.value;
                                            setKode(selectedKode);
                                            if (selectedKode === "") {
                                                setSelectedPoli({ kd_poli: "", nm_poli: "" });
                                            } else {
                                                const poliSelected = polis.find(
                                                    (poli) => poli.kd_poli === selectedKode
                                                );
                                                if (poliSelected) {
                                                    setSelectedPoli(poliSelected);
                                                }
                                            }
                                        }}
                                    >
                                        <option value="">- Pilih Poliklinik -</option>
                                        {polis.map((poli) => (
                                            <option key={poli.kd_poli} value={poli.kd_poli}>
                                                {poli.nm_poli}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <div className="table-scroll table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
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
                                        {antrians.length !== 0 ? (
                                            antrians.map((antrian) => (
                                                <tr
                                                    className={
                                                        antrian.stts === "Sudah" ? "table-danger" : ""
                                                    }
                                                    key={antrian.no_rawat}
                                                >
                                                    <td>{antrian.no_reg}</td>
                                                    <td>{antrian.no_rawat}</td>
                                                    <td>{antrian.no_rkm_medis}</td>
                                                    <td>{antrian.nm_pasien}</td>
                                                    <td>{antrian.nm_poli}</td>
                                                    <td>{antrian.png_jawab}</td>
                                                    <td>
                                                        <Button
                                                            disabled={
                                                                disable === "play-" + antrian.no_rawat
                                                                    ? true
                                                                    : false
                                                            }
                                                            onClick={() =>
                                                                setStore(
                                                                    antrian.no_reg,
                                                                    antrian.kd_dokter,
                                                                    antrian.kd_poli,
                                                                    antrian.no_rawat,
                                                                    antrian.no_rkm_medis,
                                                                    antrian.nm_pasien,
                                                                    antrian.nm_poli,
                                                                    antrian.nm_dokter,
                                                                    antrian.tgl_registrasi,
                                                                    "play-" + antrian.no_rawat
                                                                )
                                                            }
                                                            variant="primary"
                                                            size="sm"
                                                        >
                                                            <FontAwesomeIcon icon={faPlay} />{" "}
                                                        </Button>{" "}
                                                        <Button
                                                            disabled={
                                                                disable === "play-" + antrian.no_rawat
                                                                    ? false
                                                                    : true
                                                            }
                                                            onClick={() =>
                                                                setUpdate(
                                                                    antrian.tgl_registrasi,
                                                                    antrian.no_rkm_medis,
                                                                    antrian.kd_dokter,
                                                                    antrian.kd_poli,
                                                                    antrian.nm_pasien,
                                                                    antrian.nm_dokter,
                                                                    antrian.nm_poli,
                                                                    antrian.no_reg
                                                                )
                                                            }
                                                            variant="danger"
                                                            size="sm"
                                                        >
                                                            <FontAwesomeIcon icon={faStop} />{" "}
                                                        </Button>{" "}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={7}>
                                                    <center>TIDAK ADA PASIEN TERDAFTAR</center>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col style={{ textAlign: "-webkit-center" }}>
                    <Button
                        onClick={() => tesPanggilan(selectedPoli.nm_poli)}
                        variant="danger"
                        size="sm"
                    >
                        <FontAwesomeIcon icon={faPlay} /> TES ANTRIAN BOS
                    </Button>{" "}
                    <Button
                        onClick={() => reload()}
                        variant="success"
                        size="sm"
                    >
                        <FontAwesomeIcon icon={faSpinner} /> RELOAD PASIEN
                    </Button>{" "}
                </Col>
            </Row>
            {selectedPoli.nm_poli && (
                <center style={{ marginTop: "20px" }}>
                    <h1>{selectedPoli.nm_poli}</h1>
                </center>
            )}
        </Container>
    );
}
