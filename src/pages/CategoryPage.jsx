import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import CardMovies from '../component/CardMovies';

const key = 'a69ac84e7a5ab50d30d9c6e241bda7f6';

export default function CategoryPage() {
    const location = useParams();
    const genreId = location.genre;
    const [movies, setMovies] = useState([]);

    const getDataCategory = async() => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=${genreId}`);
            setMovies(res.data.results)
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getDataCategory();
    }, [])

    return (
        <div>
            <CardMovies movies={movies}/>
        </div>
    )
}
