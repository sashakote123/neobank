import { useEffect, useState } from "react";

interface CurrencyData {
    [key: string]: {
        code: string;
        value: number;
    };
}

interface HookResult {
    data: CurrencyData | null,
    loading: boolean,
    error: boolean,
}

export const useGetCurrency = (ref: string, apikey: string | undefined): HookResult => {
    const [data, setData] = useState<CurrencyData | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        fetch(`${ref}${apikey}`)
            .then(resp => {
                if (resp.ok) return resp.json()
                else throw new Error()
            })
            .catch(() => setError(true))
            .then(json => { json ? setData(json.data) : setData(json) })
            .finally(() => setLoading(false))
    }, [apikey, ref])


    return { data, loading, error }
}