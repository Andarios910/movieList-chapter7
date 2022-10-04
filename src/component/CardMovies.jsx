import React from 'react'
import { useNavigate } from 'react-router-dom';

import "swiper/css";
import "swiper/css/pagination";
import { Card, Container } from 'react-bootstrap'
import { Swiper, SwiperSlide } from "swiper/react";

export default function CardMovies({ movies }) {
    const navigate = useNavigate();

    return (
        <div className='movie__card '>
            <div className='container card__info'>
                <h2 style={{marginBottom: '2rem'}}>Popular Movie</h2>
                <h5 className='all__movies'>See All Movies</h5>
            </div>
            <Container className='container'>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    showsPagination={false}
                    className="mySwiper"
                >
                    {
                        movies &&
                        movies.map(items => (
                            <SwiperSlide key={items.id} style={{ }} onClick={() => navigate(`/${items.id}`)}>
                                <Card 
                                    border="light"
                                    style={{ width: '15rem', position: 'relative', cursor: 'pointer' }}
                                >
                                    <img 
                                        className='img__card'
                                        src={`https://image.tmdb.org/t/p/w500${items.poster_path}`} 
                                        alt='card'
                                    />
                                    <div className='description'>
                                        <h5>{items.title}</h5>
                                        <p>{items.vote_average}/10</p>
                                    </div>
                                </Card>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </Container>
        </div>
        
    )
}
