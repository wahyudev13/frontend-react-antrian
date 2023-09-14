import React from 'react';

function Home() {
    return (
        <>
            <div className="container mt-5" >
                <div className="row g-2">
                    <div className="col-lg-12">
                        <div className='row'>
                            <div className='col-lg-3'>
                                <div className="card mb-3">
                                    <div className="card-header bg-primary text-white text-center">
                                        ANTRIAN LOKET
                                    </div>
                                    <div className="card-body text-center">
                                        <div className="d-grid gap-2 col-6 mx-auto">
                                            <a className="btn btn-primary" href='/display-loket' type="button">DISPLAY</a>
                                            <a className="btn btn-primary" href='/panggilan-loket' type="button">PANGGILAN</a>
                                        </div>

                                    </div>
                                </div>

                                <div className="card">
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
                            </div>
                            <div className='col-lg-3'>
                                <div className="card">
                                    <div className="card-header bg-warning text-center">
                                        ANTRIAN FARMASI
                                    </div>
                                    <div className="card-body text-center">
                                        <div className="d-grid gap-2 col-6 mx-auto">
                                            <a className="btn btn-warning" href='/display-farmasi' type="button">DISPLAY</a>
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
                {/* <div className="row g-2">
                    <div className="col-lg-12">
                        <div className='row'>
                            <div className='col-lg-3'>
                                <div className="card">
                                    <div className="card-header bg-primary text-white text-center">
                                        ANTRIAN LOKET
                                    </div>
                                    <div className="card-body text-center">
                                        <div className="d-grid gap-2 col-6 mx-auto">
                                            <a className="btn btn-primary" href='/display-loket' type="button">DISPLAY</a>
                                            <a className="btn btn-primary" href='/panggilan-loket' type="button">PANGGILAN</a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div> */}
            </div>
        </>
    );
}

export default Home;