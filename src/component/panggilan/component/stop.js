import axios from "axios";

const host = process.env.REACT_APP_API;
const apiKey = process.env.REACT_APP_API_KEY || "";

export const updateData = async (endpoint, tgl_registrasi, no_rkm_medis, kd_dokter, kd_poli, data) => {
    try {
        const res = await axios.post(`${host}/api/antrian/${endpoint}/${tgl_registrasi}/${no_rkm_medis}/${kd_dokter}/${kd_poli}`, data, {
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
