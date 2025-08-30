import axios from "axios";
import Swal from 'sweetalert2';
const host = process.env.REACT_APP_API;
const apiKey = process.env.REACT_APP_API_KEY || "";

/**
 * Reusable fungsi untuk store data ke endpoint tertentu
 * @param {string} endpoint - contoh: "antrian", "poli", "pasien"
 * @param {object} data - body request
 */
export const storeData = async (endpoint, data) => {
    try {
        const res = await axios.post(`${host}/api/antrian/${endpoint}`, data, {
            headers: {
                "Accept": "application/json",
                "X-API-KEY": apiKey,
            },
        });
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.message || err.message);
    }
};

export const tesStore = async (endpoint, nm_poli) => {
    try {
        const res = await axios.post(`${host}/api/antrian/tes/${endpoint}`, {
            text: `SELAMAT DATANG DI ${nm_poli || 'RS PKU Muhammadiyah Sekapuk'}`
        });
        Swal.fire({
            title: 'Berhasil!',
            text: 'Panggilan berhasil dilakukan.',
            icon: 'success',
            timer: 900,
            showConfirmButton: false
        });
        return res.data;
    } catch (err) {
        Swal.fire({
            title: 'Gagal!',
            text: 'Terjadi kesalahan: ' + err.message,
            icon: 'error',
            timer: 900,
            showConfirmButton: false
        });
        throw new Error(err.response?.data?.message || err.message);
    }
};

