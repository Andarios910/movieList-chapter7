import React, { useState, useEffect } from 'react'
import ReactPaginate from "react-paginate";
import CardAll from '../component/CardAll';
import NavbarMovies from '../component/NavbarMovies';
import JumbotronSearch from '../component/JumbotronSearch';
import FooterMovie from '../component/FooterMovie';

import { useSelector, useDispatch } from 'react-redux';
import { getAllMovies } from '../features/movies/moviesSlice';

const key = 'a69ac84e7a5ab50d30d9c6e241bda7f6';
const image = 'https://listimg.pinclipart.com/picdir/s/84-841840_svg-royalty-free-library-icon-svg-profile-profile.png'

export default function AllMovie() {
    const [page, setPage] = useState(1);
    const pageCount = 6;
    const dispatch = useDispatch();
    const { allMovie } = useSelector((state) => state.movies)

    useEffect(() => {
        dispatch(getAllMovies(key, page))
    }, [dispatch, page])

    const handlePageClick = (data) => {
        setPage(data.selected + 1);
    };

    return (
        <div>
            <NavbarMovies nameLogin='Google Account' image={image}/>
            <JumbotronSearch title='All Movies' search='Movies' />
            <CardAll movies={allMovie} />
            <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />
            <FooterMovie />
        </div>
    )
}
