import React, { useEffect } from 'react'

import NavbarMovies from '../component/NavbarMovies'
import CardMovies from '../component/CardMovies'
import CardInfo from '../component/CardInfo';   
import ButtonCategories from '../component/ButtonCategories';

import { Container } from 'react-bootstrap';
import FooterMovie from '../component/FooterMovie';

import { useSelector, useDispatch  } from 'react-redux';
import { getMovies } from '../features/movies/moviesSlice';
import { getTrending } from '../features/movies/trendingSlice';

const key = 'a69ac84e7a5ab50d30d9c6e241bda7f6';
const image = 'https://listimg.pinclipart.com/picdir/s/84-841840_svg-royalty-free-library-icon-svg-profile-profile.png'

export default function HomeMovies() {
    const { movies } = useSelector((state) => state.movies)
    const { trending } = useSelector((state) => state.trending)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMovies(key));
        dispatch(getTrending(key));
    }, [dispatch])
    return (
        <div>
            <NavbarMovies movies={movies} jumbotron={trending} nameLogin='Google Account' image={image} />
            <div>
                <Container>
                    <CardInfo title='Popular Movie' />
                    <CardMovies movies={movies} />
                </Container>
            </div>
            <div>
                <Container>
                    <CardInfo title='Browse By Category' />
                    <ButtonCategories />
                    <CardMovies movies={movies} />
                </Container>
            </div>
            <FooterMovie />
        </div>
    )
}
