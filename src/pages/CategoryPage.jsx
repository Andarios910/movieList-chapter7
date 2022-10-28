import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CardMovies from '../component/CardMovies';
import NavbarMovies from '../component/NavbarMovies';
import JumbotronSearch from '../component/JumbotronSearch';
import ButtonCategories from '../component/ButtonCategories';

import { useSelector, useDispatch } from 'react-redux';
import { getDataCategory } from '../features/genre/genreSlice';

const image = 'https://listimg.pinclipart.com/picdir/s/84-841840_svg-royalty-free-library-icon-svg-profile-profile.png'

export default function CategoryPage() {
    const { name, genre } = useParams();
    const dispatch = useDispatch();
    const { dataGenre } = useSelector((state) => state.genre)

    useEffect(() => {
        dispatch(getDataCategory(genre))
    }, [dispatch, genre])

    return (
        <div>
            <NavbarMovies nameLogin='Google Account' image={image}/>
            <JumbotronSearch title='Genre' search={name}/>
            <ButtonCategories click={name}/>
            <CardMovies movies={dataGenre}/>
        </div>
    )
}
