import React, { useState, useEffect } from 'react'
import axios from 'axios';

import NavbarMovies from '../component/NavbarMovies'
import CardMovies from '../component/CardMovies'
import CardInfo from '../component/CardInfo';   
import ButtonCategories from '../component/ButtonCategories';

import { Container } from 'react-bootstrap';

const key = 'a69ac84e7a5ab50d30d9c6e241bda7f6';

export default function HomeMovies() {
    const [ movies, setMovies ] = useState([]);
    const [ categories, setCategories ] = useState([]);

    const getData = async() => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`);
            // const res = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`);
            setMovies(res.data.results)
            console.log(res);
        } catch(error) {
            console.error(error);
        }
    }

    const getDataCategory = async() => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`);
            setCategories(res.data.genres)
            console.log(res.data.genres);
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getData();
        getDataCategory();
    }, [])
    return (
        <div>
            <NavbarMovies movies={movies} />
            <div>
                <Container>
                    <CardInfo title='Popular Movie' />
                    <CardMovies movies={movies} />
                </Container>
            </div>
            <div>
                <Container>
                    <CardInfo title='Browse By Category' />
                    <ButtonCategories categories={categories}/>
                    <CardMovies movies={movies} />
                </Container>
            </div>
        </div>
    )
}
