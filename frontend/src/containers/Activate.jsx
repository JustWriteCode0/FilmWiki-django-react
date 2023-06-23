import {React, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Activate = () => { 
    const [exeption, setExeption] = useState('')
    const url = window.location.pathname.split('/')

    const navigate = useNavigate()

    useEffect(() => {
        console.log('call')
        axios.post('http://127.0.0.1:8000/auth/users/activation/', {uid: url[2], token: url[3]})
        .then((response) => {
            if (response.status === 200) {
                navigate('/')
            }
        })
        .catch(function (error){
            if (error.response) {
                setExeption(error.request.response)
            } else {
                setExeption(error.message)
            }
        })
    }, []);
        
    
    return(
        <>
            <h1>activation</h1>
            <h1>{exeption ? exeption : ''}</h1>
        </>
        
    )
}

export default Activate