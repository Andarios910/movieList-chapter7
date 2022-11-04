import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs'

import Jumbotron from './Jumbotron';
import Register from './Register';
import Login from './Login';

import { auth, logInWithEmailAndPassword, signInWithEmailAndPassword, signInWithGoogle, logout } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function NavbarMovies({movies, jumbotron, nameLogin, image}) {
    const [query, setQuery] = useState('');
    const [alreadyLogin, setAlreadyLogin] = useState(false)
    const navigate = useNavigate();

    const handleSubmitSearch = () => {
        navigate(`/search/${query}`)
    }

    const logOut = (e) => {
        e.preventDefault();
        logout();
        setAlreadyLogin(false);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem('google_user')
    }
    
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('google_user')

    useEffect(() => {

        if (user || token) {
            setAlreadyLogin(true);
        }

    }, [user, token])


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
                            {
                                (alreadyLogin) ? 
                                <div className='d-flex align-items-center'>
                                    <p className='text-white mx-3 '>{user.displayName || user.email }</p>
                                    <img 
                                        className='rounded' 
                                        src={user.photoURL || image} 
                                        width="40" 
                                        height="40" 
                                        alt="profile"/>
                                    <Button onClick={logOut} className='nav__button' variant='danger' style={{ borderRadius: '2rem' }} >LogOut</Button>
                                </div> 
                                : 
                                <div>
                                    <Login setToken={setAlreadyLogin} />
                                    <Register setToken={setAlreadyLogin} />
                                </div>
                            }
                        </Nav>
                    </Navbar.Collapse>
                    
                </Container>
            </Navbar>
            <Jumbotron movies={jumbotron}/>
        </>
    )
}
