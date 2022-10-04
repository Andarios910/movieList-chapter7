import React from 'react'
// import { UncontrolledCarousel } from 'reactstrap'
import { Carousel, Button } from 'react-bootstrap'

export default function Jumbotron({movies}) {

    return (
            <Carousel className='jumbotron' controls={false}>
                {
                    movies &&
                    movies.map(items => (
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
                                style={{ position: 'absolute', marginBottom: '12rem', textAlign: 'start', marginRight: '10rem'}}>
                                <h3>{items.title}</h3>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere, esse!</p>
                                <Button>WATCH TRAILLER</Button>
                            </Carousel.Caption>
                            <img
                                className="d-block w-100"
                                src={`https://image.tmdb.org/t/p/original${items.backdrop_path}`}
                                alt="First slide"
                                style={{
                                    backgroundSize: 'cover',
                                    height: '600px',
                                }}
                            />
                        </Carousel.Item>
                    ))
                }
            </Carousel>
    )
}
