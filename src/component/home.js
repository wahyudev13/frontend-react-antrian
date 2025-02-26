import React from 'react';

function Home() {
    return (
        <>
            <nav className="navbar bg-success navbar-fixed-top">
                <div className="container-fluid">
                    <div className='d-flex' style={{ color: '#fff' }}>
                        ANTRIAN
                    </div>
                    <div className='d-flex' style={{ color: '#fff' }}>
                        Update 26 Februari 2025
                    </div>
                </div>
            </nav>

            <div className="container mt-1" >
                <div className="row g-2">
                    <div className="col-lg-12">
                        <div className='row'>
                            <div className='col-lg-3'>
                                {/* <div className="card mb-3">
                                    <div className="card-header bg-primary text-white text-center">
                                        ANTRIAN LOKET
                                    </div>
                                    <div className="card-body text-center">
                                        <div className="d-grid gap-2 col-6 mx-auto">
                                            <a className="btn btn-primary" href='/display-loket' type="button">DISPLAY</a>
                                            <a className="btn btn-primary" href='/panggilan-loket' type="button">PANGGILAN</a>
                                        </div>

                                    </div>
                                </div> */}

                                <div className="card mb-3">
                                    <div className="card-header bg-primary text-white text-center">
                                        ANTRIAN LOKET DOBEL
                                    </div>
                                    <div className="card-body text-center">
                                        <div className="d-grid gap-2 col-6 mx-auto">
                                            <a className="btn btn-primary" href='/display-loket-dobel' type="button">DISPLAY</a>
                                            <a className="btn btn-primary" href='/panggilan-loket-dobel-1' type="button">PANGGILAN LOKET 1</a>
                                            <a className="btn btn-primary" href='/panggilan-loket-dobel-2' type="button">PANGGILAN LOKET 2</a>
                                        </div>

                                    </div>
                                </div>

                                <div className="card mb-3">
                                    <div className="card-header bg-success text-white text-center">
                                        ANTRIAN LOKET MODEL 2
                                    </div>
                                    <div className="card-body text-center">
                                        <div className="d-grid gap-2 col-6 mx-auto">
                                            <a className="btn btn-success" href='/display-loket-m2' type="button">DISPLAY</a>
                                            <a className="btn btn-success" href='/panggilan-loket-m2' type="button">PANGGILAN</a>
                                        </div>

                                    </div>
                                </div>

                                <div className="card mb-3">
                                    <div className="card-header bg-dark text-white text-center">
                                        ANTRIAN LOKET LOKAL
                                    </div>
                                    <div className="card-body text-center">
                                        <div className="d-grid gap-2 col-6 mx-auto">
                                            <a className="btn btn-dark" href='/display-loket-lokal' type="button">DISPLAY</a>
                                        </div>

                                    </div>
                                </div>
                                <div className="card mb-3">
                                    <div className="card-header bg-info text-white text-center">
                                        ANTRIAN LOKET RESPONSIVE VOICE
                                    </div>
                                    <div className="card-body text-center">
                                        <div className="d-grid gap-2 col-6 mx-auto">
                                            <a className="btn btn-info" href='/display-loket-m4' type="button">DISPLAY</a>
                                        </div>

                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header bg-danger text-white text-center">
                                        TESTING SUARA LOKET
                                    </div>
                                    <div className="card-body text-center">
                                        <div className="d-grid gap-2 col-6 mx-auto">
                                            <a className="btn btn-danger" href='/panggilan-loket-tes' type="button">PANGGILAN</a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3'>
                                <div className="card">
                                    <div className="card-header bg-warning text-center">
                                        ANTRIAN FARMASI
                                    </div>
                                    <div className="card-body text-center">
                                        <div className="d-grid gap-2 col-6 mx-auto">
                                            <a className="btn btn-warning" href='/display-farmasi' type="button">DISPLAY</a>
                                            <a className="btn btn-warning" href='/display-farmasi2' type="button">DISPLAY 2 RESPONSIVE VOICE</a>
                                            <a className="btn btn-warning" href='/display-farmasi3' type="button">DISPLAY 3</a>
                                            <a className="btn btn-warning" href='/panggilan-farmasi' type="button">PANGGILAN</a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3'>
                                <div className="card">
                                    <div className="card-header bg-danger text-white text-center">
                                        ANTRIAN POLIKLINIK A-C
                                    </div>
                                    <div className="card-body text-center">
                                        <div className="d-grid gap-2 col-6 mx-auto">
                                            <a className="btn btn-danger" href='/display-a' type="button">DISPLAY</a>
                                            <a className="btn btn-danger" href='/display-c' type="button">DISPLAY 2</a>
                                            <a className="btn btn-danger" href='/panggilan-a' type="button">PANGGILAN A</a>
                                            <a className="btn btn-danger" href='/panggilan-b' type="button">PANGGILAN B</a>
                                            <a className="btn btn-danger" href='/panggilan-c' type="button">PANGGILAN C</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3'>
                                <div className="card">
                                    <div className="card-header bg-secondary text-white text-center">
                                        ANTRIAN POLIKLINIK D-F
                                    </div>
                                    <div className="card-body text-center">
                                        <div className="d-grid gap-2 col-6 mx-auto">
                                            <a className="btn btn-secondary" href='/display-b' type="button">DISPLAY</a>
                                            <a className="btn btn-secondary" href='/display-d' type="button">DISPLAY 2</a>
                                            <a className="btn btn-secondary" href='/panggilan-d' type="button">PANGGILAN D</a>
                                            <a className="btn btn-secondary" href='/panggilan-e' type="button">PANGGILAN E</a>
                                            <a className="btn btn-secondary" href='/panggilan-f' type="button">PANGGILAN F</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;