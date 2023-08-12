import { React, useCallback, useEffect, useRef, useState } from 'react'
import debounce from 'lodash.debounce';
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { Button, Grid, Typography, TextField, Box, IconButton } from '@mui/material'
import SearchResults from '../components/SearchResults';
import SearchIcon from '@mui/icons-material/Search';
import "../styles/FilmsCatalog.css"


const FilmsCatalog = () => {
    const [filmData, setFilmData] = useState({})
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const inputRef = useRef(null);

    useEffect(() => {
      // get films for catalog
      axios.get('http://127.0.0.1:8000/api/v1/films/')
      .then((response) => {
        setFilmData({films: response.data.results, next: response.data.next})
      })
    }, [])

    const searchHandler = (event) => {     
      const searchQuery = event.target.value
      setSearchQuery(searchQuery)

      axios.get(`http://127.0.0.1:8000/api/v1/films/?search=${searchQuery}&page_size=10`)
      .then((response) => {
        setSearchResults(response.data.results)
      })
    }

    const debouncedSearchHandler = useCallback(
      // search field on change wait 450ms and send get request
      debounce(searchHandler, 450)
    , []);

    const handleClickSearch = () => {
      // when user click search button set result of search on page
      if (searchResults.length > 0) {
        setFilmData(searchResults)
      }
    }

    const handleMoreFilms = () => {
      // when on page 50 films add button "more" on click get next page of pagination
      axios.get(filmData.next)
      .then((response) => {
        setFilmData(prevData => ({
          ...filmData,
          films: [...prevData.films, ...response.data.results],
          next: response.data.next
        }));
      })
    }


    return(
      <>
      <Box className="search-films-container">
        <TextField className="search-films-field" label="search" ref={inputRef} onChange={debouncedSearchHandler} />
        <IconButton className="search-button" onClick={handleClickSearch}>
          <SearchIcon/>
        </IconButton>
      </Box>
      {searchQuery.length > 0 && (
        <SearchResults searchResults={searchResults} fieldRef={inputRef} />
      )}
      <Grid container className="films-container" sx={{ marginTop: '15px', }}>
          {filmData.films?.map(film => {
            return (
              <Grid item className="films-item" xl={2} lg={2} md={2.4} sm={4} xs={6} key={film.id}>
                <Link to={`/film/${film.slug_film_name}`}>
                  <img src={film.film_poster} className="catalog-film-image" alt="poster" />
                </Link>
                <Typography className="catalog-film-name">{film.film_name}</Typography>
              </Grid>
            )
          })}
          {filmData.next ? <Button className="more-films-btn" onClick={handleMoreFilms}>More</Button> : ''}
      </Grid>   
    </>  
    )
}

export default FilmsCatalog