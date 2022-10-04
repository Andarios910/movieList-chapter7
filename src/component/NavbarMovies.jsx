import React from 'react'

import { Navbar, Button, Nav, Container } from 'react-bootstrap';

import Jumbotron from './Jumbotron';

export default function NavbarMovies({movies}) {
    return (
        <>  
            <Navbar className='__nav' collapseOnSelect expand="lg">
                        <Container>
                            <Navbar.Brand href="#home">
                                <img src='https://movielist-react-app.netlify.app/static/media/Logo.eeba5c17ddf85f2145e83dd963662921.svg' alt='logo'/>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="ms-auto">
                                    <Button className='nav__button' variant='outline-danger' style={{ borderRadius: '2rem', padding: '0.5rem 1rem'}} >Login</Button>
                                    <Button className='nav__button' variant='danger' style={{ borderRadius: '2rem' }} >Register</Button>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
            </Navbar>
            <Jumbotron movies={movies}/>
        </>
    )
}
