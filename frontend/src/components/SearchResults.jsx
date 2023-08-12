import { Box, Typography } from "@mui/material"
import { React, useEffect, useState } from "react"
import '../styles/SearchResults.css'


const SearchResults = (searchResults, fieldRef) => {
    const [results, setResults] = useState([])
    const [inputHeight, setInputHeight] = useState(0);


    useEffect(() => {
        setResults(searchResults.searchResults)
    }, [searchResults])

    useEffect(() => {
        if (fieldRef.current) {
          setInputHeight(fieldRef.current.clientHeight);
        }
      }, [fieldRef]);
    
    return(
        <div className="overlay-container" style={{ marginTop: inputHeight + 170 }}>
          <div className="overlay-content">
            <ul className="result-list">
              {results.map((film, index) => (
                <li key={index} className="result-item">
                  <Typography className="result-film-name">{film.film_name}</Typography>
                  <img src={film.film_poster} className="search-film-preview" alt="film-preview" />
                  {/* Other film details */}
                </li>
              ))}
            </ul>
          </div>
        </div>
    )
}

export default SearchResults