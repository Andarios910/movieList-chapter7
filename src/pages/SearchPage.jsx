import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

import CardMovies from '../component/CardMovies';

export default function SearchPage() {
    const location = useParams();
    const search = location.s;
    const key = 'a69ac84e7a5ab50d30d9c6e241bda7f6';
    const [movies, setMovies] = useState([]);

    const getSearch = async() => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&page=1&include_adult=false&query=${search}`)
            setMovies(res.data.results)
        }catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getSearch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <CardMovies movies={movies}/>
        </div>
    )
}
