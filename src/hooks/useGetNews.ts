import { useEffect, useState } from "react";
import { INews } from "../types/types";


interface HookResult {
    data: INews[] | null,
    loading: boolean,
    error: boolean,
}

export const useGetNews = (ref: string, apikey: string | undefined): HookResult => {
    const [data, setData] = useState<INews[] | null>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        fetch(`${ref}${apikey}`)
            .then(resp => {
                if (resp.ok) return resp.json()
                else throw new Error()
            })
            .catch(() => setError(true))
            .then(json => json ? setData(json.articles) : setData(json))
            .finally(() => setLoading(false))
    }, [apikey, ref])


    return { data, loading, error }
}