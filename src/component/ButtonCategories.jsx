import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from 'react-router-dom';

export default function ButtonCategories({ categories }) {
    const navigate = useNavigate();
    return (
        <Container>
            <div style={{ marginBottom: '2rem' }}>
                <Swiper
                    slidesPerView={6}
                    spaceBetween={5}
                    showsPagination={false}
                    className="mySwiper"
                >
                {
                    categories.map(genre => (
                        <SwiperSlide>
                            <Button 
                                className='btn__category' 
                                variant='outline-danger' 
                                key={genre.id} 
                                onClick={() => navigate(`/genre/${genre.id}`)}
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
