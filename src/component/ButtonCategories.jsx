import React, { useEffect } from 'react'

import { Button, Container } from 'react-bootstrap'
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { getGenre } from '../features/genre/genreSlice';

const key = 'a69ac84e7a5ab50d30d9c6e241bda7f6';

export default function ButtonCategories({click}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { genre } = useSelector((state) => state.genre)

    useEffect(() => {
        dispatch(getGenre(key))
    }, [dispatch])

    return (
        <Container>
            <div style={{ marginBottom: '2rem' }}>
                <Swiper
                    slidesPerView={6}
                    spaceBetween={5}
                    className="mySwiper"
                >
                {
                    genre &&
                    genre.map(genre => (
                        <SwiperSlide key={genre.id} >
                            <Button 
                                className='btn__category'
                                variant={click === genre.name ? 'danger' : 'outline-danger'} 
                                onClick={() => navigate(`/genre/${genre.name}/${genre.id}`)}
                            >
                                {genre.name}
                            </Button>
                        </SwiperSlide>
                    ))
                }
                </Swiper>
            </div>
        </Container>
    )
}
