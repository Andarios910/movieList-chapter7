import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

import NavbarMovies from '../component/NavbarMovies';
import JumbotronDetail from '../component/JumbotronDetail';
import CardMovies from '../component/CardMovies';
import CardInfo from '../component/CardInfo';
import FooterMovie from '../component/FooterMovie';

const key = 'a69ac84e7a5ab50d30d9c6e241bda7f6';
const image = 'https://listimg.pinclipart.com/picdir/s/84-841840_svg-royalty-free-library-icon-svg-profile-profile.png'

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
            const info = res.data.cast.slice(0,10)
            setCast(info)
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getMovie();
        getCast();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <NavbarMovies nameLogin='Google Account' image={image}/>
            <JumbotronDetail movies={movie}/>
            <CardInfo title='Cast and Crew Info' check='true' />
            <CardMovies movies={cast} cardStatus='true' />
            <FooterMovie />
        </div>
    )
}
