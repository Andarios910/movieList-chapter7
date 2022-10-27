import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import CardMovies from '../component/CardMovies';
import NavbarMovies from '../component/NavbarMovies';
import JumbotronSearch from '../component/JumbotronSearch';

import { useSelector, useDispatch } from 'react-redux';
import { getSearch } from '../features/movies/searchSlice';

const image = 'https://listimg.pinclipart.com/picdir/s/84-841840_svg-royalty-free-library-icon-svg-profile-profile.png'

export default function SearchPage() {
    const location = useParams();
    const search = location.s;
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.search)
    console.log(data)

    useEffect(() => {
        dispatch(getSearch(search))
    }, [dispatch, search])

    return (
        <div>
            <NavbarMovies nameLogin='Google Account' image={image}/>
            <JumbotronSearch title='All Movies' search={search}/>
            <CardMovies movies={data}/>
        </div>
    )
}
