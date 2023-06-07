import React, {useEffect, useState} from "react";
import axios from 'axios'


const GetFilms = () => {
    const [post, setPost] = useState({post: []})
    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/v1/film/')
            .then((response) => {
                setPost({post: response.data})
                console.log(post)
            })
      }, []);
        
    return (
      <div>
            {
                post.post.map((post) => 
                <div key={post.id}>
                    <h1>{post.film_name}</h1>
                    <h3>{post.describe}</h3>
                </div>)
            }    
        </div>
    );
}

export default GetFilms