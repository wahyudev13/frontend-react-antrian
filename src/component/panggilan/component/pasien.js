import axios from "axios";

const host = process.env.REACT_APP_API;

const headers = {
    "Accept": "application/json",
    "X-API-KEY": process.env.REACT_APP_API_KEY || "",
};

// ambil data antrian
export const getAntrian = async (kode) => {
    try {
        const response = await axios.get(`${host}/api/cari?cari=${kode}`, { headers });
        return response.data?.data || [];
    } catch (error) {
        console.error("Error fetching antrian:", error.message);
        return [];
    }
};

// ambil data poli
export const getPoli = async () => {
    try {
        const response = await axios.get(`${host}/api/getpoli`, { headers });
        return response.data?.data || [];
    } catch (error) {
        console.error("Error fetching poli:", error.message);
        return [];
    }
};
