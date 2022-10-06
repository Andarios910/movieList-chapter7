import React from 'react'
import { Carousel, Button } from 'react-bootstrap'

export default function Jumbotron({movies}) {
    return (
            <Carousel className='jumbotron' controls={false}>
                {
                    movies &&
                    movies.slice(0,3).map(items => (
                        <Carousel.Item interval={500} key={items.id}> 
                            <div 
                                style={{
                                    position: 'absolute', 
                                    width: "100%", 
                                    height: '600px', 
                                    backgroundImage: 'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))'
                                }}>
                            </div>
                            <Carousel.Caption className='carousel__text' 
                                style={{ textAlign: 'left', left: '5rem', bottom: '6rem'}}>
                                <h3>{items.title}</h3>
                                <p>{items.overview}</p>
                                <Button style={{ backgroundColor: 'red', borderColor: 'red', borderRadius: '2rem', padding: '0.5rem 1rem' }}>WATCH TRAILLER</Button>
                            </Carousel.Caption>
                            <img
                                className=""
                                src={`https://image.tmdb.org/t/p/original${items.backdrop_path}`}
                                alt="First slide"
                                style={{
                                    backgroundSize: 'cover',
                                    width: '100vw',
                                    maxHeight: '100vh',
                                }}
                            />
                        </Carousel.Item>
                    ))
                }
            </Carousel>
    )
}
