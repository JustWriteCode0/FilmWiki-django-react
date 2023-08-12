import {React, useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const Activate = () => { 
    const [exeption, setExeption] = useState('')
    
    const { uid } = useParams()
    const { token } = useParams()
    const navigate = useNavigate()

    
    useEffect(() => {
        axios.post('http://127.0.0.1:8000/auth/users/activation/', {uid, token})
        .then((response) => {
            navigate('/')
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