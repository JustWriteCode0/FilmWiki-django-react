import React from "react";
import axios from "axios";


const Film = () => {
    
    const url = window.location.pathname.split('/')
    console.log(url)
    axios.post(`http://127.0.0.1:8000/api/v1/films/${url[1]}`)
    .then((response) => {
        console.log(response)
    })
    return(
        <h1></h1>
    )
}

export default Film