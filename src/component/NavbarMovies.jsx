import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar, Button, Nav, Container } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs'

import Jumbotron from './Jumbotron';

export default function NavbarMovies({movies, jumbotron}) {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmitSearch = () => {
        navigate(`/search/${query}`)
    }

    return (
        <>  
            <Navbar className='__nav' collapseOnSelect expand="lg">
                        <Container>
                            <Navbar.Brand onClick={() => navigate('/')}>
                                <img src='https://movielist-react-app.netlify.app/static/media/Logo.eeba5c17ddf85f2145e83dd963662921.svg' alt='logo'/>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="ms-auto">
                                    <form onSubmit={handleSubmitSearch}>
                                            <input
                                                type='Search'
                                                placeholder='Search'
                                                onChange={(e) => setQuery(e.target.value)}
                                            />
                                            <BsSearch className='icon__search' type='submit'/>
                                    </form>
                                    <Button className='nav__button' variant='outline-danger' style={{ borderRadius: '2rem', padding: '0.5rem 1rem'}} >Login</Button>
                                    <Button className='nav__button' variant='danger' style={{ borderRadius: '2rem' }} >Register</Button>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
            </Navbar>
            <Jumbotron movies={jumbotron}/>
        </>
    )
}
