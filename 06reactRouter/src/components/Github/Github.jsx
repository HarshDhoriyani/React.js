import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

function Github() {

    // Method-2
    const data = useLoaderData()

    // Method-1
    // const [data, setData] = React.useState([]);
    // useEffect(() => {
    //     fetch('https://api.github.com/users/HarshDhoriyani')
    //     .then(response => response.json())
    //     .then(data => {
    //         setData(data);
    //     })
    // }, [])

    return (
        <div className="text-center m-4 bg-gray-600 text-white p-4 text-3xl">GitHub Followers: {data.followers}
        <img src={data.avatar_url} alt="Git Picture" width={300} />
        </div>
    )
}

export default Github;

export const githubInfoLoader = async() => {
    const response = await fetch('https://api.github.com/users/HarshDhoriyani')
    return response.json()
}