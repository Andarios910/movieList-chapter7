import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

import NavbarMovies from '../component/NavbarMovies';
import JumbotronDetail from '../component/JumbotronDetail';
import CardMovies from '../component/CardMovies';

const key = 'a69ac84e7a5ab50d30d9c6e241bda7f6';
// https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US

export default function DetailPage() {
    const location = useParams();
    const id = location.id;
    const [ movie, setMovie ] = useState([]);
    const [ cast, setCast] = useState([])

    const getMovie = async() => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}`)
            setMovie(res.data);
        } catch(error) {
            console.error(error);
        }
    }

    const getCast = async() => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${key}&language=en-US`)
            // console.log(res1.data.cast.slice(0,4));
            setCast(res.data.cast.slice(0,4))
            console.log(res.data)
        } catch(error) {
            console.error(error);
        }
    }

    console.log(movie)

    useEffect(() => {
        getMovie();
        getCast();
    }, [])

    return (
        <div>
            <NavbarMovies />
            <JumbotronDetail movies={movie}/>
            <CardMovies movies={cast}/>
        </div>
    )
}
