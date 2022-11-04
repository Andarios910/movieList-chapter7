import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import NavbarMovies from '../component/NavbarMovies';
import JumbotronDetail from '../component/JumbotronDetail';
import CardMovies from '../component/CardMovies';
import CardInfo from '../component/CardInfo';
import FooterMovie from '../component/FooterMovie';

import { useSelector, useDispatch } from 'react-redux'
import { getMoviesDetail, getCast } from '../features/movies/moviesSlice'

const image = 'https://listimg.pinclipart.com/picdir/s/84-841840_svg-royalty-free-library-icon-svg-profile-profile.png'

export default function DetailPage() {
    const location = useParams();
    const id = location.id;
    const { detail, cast } = useSelector((state) => state.movies);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMoviesDetail(id))
        dispatch(getCast(id))
    }, [dispatch, id])

    return (
        <div>
            <NavbarMovies nameLogin='Google Account' image={image}/>
            <JumbotronDetail movies={detail}/>
            <CardInfo title='Cast and Crew Info' check='true' />
            <CardMovies movies={cast} cardStatus='true' />
            <FooterMovie />
        </div>
    )
}
