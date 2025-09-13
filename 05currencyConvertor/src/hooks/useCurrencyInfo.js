import { useEffect, useState } from "react";


function useCurrencyInfo(currency) {
    const [data, setData] = useState({});
    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
        .then((res) => res.json())   // converted the data into json format
        .then((res) => setData(res[currency]))  // accessing the currency from data
    }, [currency])
    return data;
}

export default useCurrencyInfo;