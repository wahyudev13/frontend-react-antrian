import React from 'react';
import Swal from 'sweetalert2';
import AntrianPoli from "./component/AntrianPoli";
import { getAntrian, getPoli } from "./component/pasien";
import { storeData, tesStore } from "./component/panggil";
import { updateData } from "./component/stop";

import { useState, useEffect } from "react";

function Antrian() {
    const [antrians, setAntrian] = useState([]);
    const [polis, setPoli] = useState([]);
    const [kode, setKode] = useState([]);
    const [count, setCount] = useState(0);
    const [disable, setDisable] = useState([]);
    const [selectedPoli, setSelectedPoli] = useState({ kd_poli: '', nm_poli: '' });

    const fetchData = async () => {
        setAntrian(await getAntrian(kode));
        setPoli(await getPoli());
    };

    useEffect(() => {
        fetchData(); // otomatis jalan pertama kali
    }, [kode]);

    const setStore = async (no_reg, kd_dokter, kd_poli, no_rawat, no_rkm_medis, nm_pasien, nm_poli, nm_dokter, tgl_registrasi, kelas) => {
        if (disable.length === 0) {
            setCount(count + 1)
            setDisable(kelas)
            try {
                const result = await storeData("storeb", {
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
                });
                console.log("✅ Store antrian berhasil:", result);
            } catch (err) {
                console.error("❌ Gagal store antrian:", err.message);
            }
        }
    };

    const setUpdate = async (tgl_registrasi, no_rkm_medis, kd_dokter, kd_poli, nm_pasien, nm_poli, nm_dokter, no_reg) => {
        setDisable([]);
        try {
            const result = await updateData("updateb", tgl_registrasi, no_rkm_medis, kd_dokter, kd_poli, {
                status: 2,
                nm_pasien: nm_pasien,
                nm_dokter: nm_dokter,
                nm_poli: nm_poli,
                no_reg: no_reg,
            });
            console.log("✅ Update antrian berhasil:", result);
        } catch (err) {
            console.error("❌ Gagal Update antrian:", err.message);
        }
    };

    const tesPanggilan = async (nm_poli) => {
        try {
            const result = await tesStore("1", nm_poli);
            console.log("✅ TES PANGGILAN ANTRIAN 1", result);
        } catch (error) {
            console.error("❌ Gagal TES PANGGILAN ANTRIAN 1", error.message);
        }
    };


    const reload = async () => {
        try {
            await fetchData();
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
        <AntrianPoli
            polis={polis}
            antrians={antrians}
            selectedPoli={selectedPoli}
            setSelectedPoli={setSelectedPoli}
            setKode={setKode}
            disable={disable}
            setStore={setStore}
            setUpdate={setUpdate}
            tesPanggilan={tesPanggilan}
            reload={reload}
            title="Panggil Antrian Poliklinik B"
            headerClass="header-antrian-b"
        />
    );
}

export default Antrian;


