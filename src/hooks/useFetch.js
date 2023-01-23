import { useEffect, useState } from "react";

export const useFetch = (url) => {
    const [data, setData] = useState(null);

    const [config, setConfig] = useState(null);
    const [method, seMethod] = useState(null);
    const [callFetch, setCallFetch] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    const httpConfig = (data, method) => {
        if (method === "POST") {
            setConfig({
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            seMethod(method);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const response = await fetch(url);

                const json = await response.json();

                setData(json);
            } catch (error) {
                console.log(error.message);

                setError('Houve algum erro ao carregar os dados!');
            }

            setLoading(false);
        };

        fetchData();
    }, [url, callFetch]);

    useEffect(() => {
        const httpRequest = async () => {
            if (method === "POST") {
                let fetchOptions = [url, config];

                const response = await fetch(...fetchOptions);

                const json = await response.json();

                setCallFetch(json);
            };
        };

        httpRequest();
    }, [config, method, url]);


    return { data, httpConfig, loading, error };
}