import React, { useState, useEffect } from 'react'
import axios from 'axios';

import NavbarMovies from '../component/NavbarMovies'
import CardMovies from '../component/CardMovies'
import { Container } from 'react-bootstrap';

const key = 'a69ac84e7a5ab50d30d9c6e241bda7f6';

export default function HomeMovies() {
    const [ movies, setMovies ] = useState([]);

    const getData = async() => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`);
            setMovies(res.data.results)
            console.log(res.data.results);
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getData();
    }, [])
    return (
        <div>
            <NavbarMovies movies={movies} />
            <div>
                <Container>
                    <CardMovies movies={movies} />
                </Container>
            </div>
            <div>
                <Container>
                    <CardMovies movies={movies} />
                </Container>
            </div>
        </div>
    )
}
