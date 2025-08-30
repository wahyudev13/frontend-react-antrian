import { useEffect, useMemo, useState, useCallback } from "react";

function getApiHeaders() {
    return {
        "Accept": "application/json",
        "X-API-KEY": process.env.REACT_APP_API_KEY || "",
    };
}

function toAbsoluteUrls(baseHost, urls) {
    const base = (baseHost || "").replace(/\/$/, "");
    return urls.map((rawUrl) =>
        /^https?:\/\//i.test(String(rawUrl))
            ? String(rawUrl)
            : `${base}${String(rawUrl).startsWith("/") ? "" : "/"}${String(rawUrl)}`
    );
}

export default function useVideoPlaylist({ host, path }) {
    const headers = useMemo(() => getApiHeaders(), []);
    const [videoList, setVideoList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const refresh = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${host}${path}`, {
                headers,
                cache: "no-store",
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();

            let urls = [];
            if (Array.isArray(data?.data)) {
                urls = data.data
                    .map((item) => item?.video?.url || item?.video?.src || item?.video?.path)
                    .filter(Boolean);
            }
            if (urls.length === 0) {
                const singleUrl =
                    data?.video_url ||
                    data?.url ||
                    data?.src ||
                    data?.data?.video_url ||
                    data?.data?.url ||
                    data?.data?.src;
                if (singleUrl) urls = [singleUrl];
            }

            const absolute = toAbsoluteUrls(host, urls);
            setVideoList(absolute);
            setCurrentIndex(0);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [host, path, headers]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    const next = useCallback(() => {
        setCurrentIndex((prev) => (videoList.length === 0 ? 0 : (prev + 1) % videoList.length));
    }, [videoList.length]);

    return { videoList, currentIndex, setCurrentIndex, next, loading, error, refresh };
}


