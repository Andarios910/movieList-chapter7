import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { BsEnvelope } from 'react-icons/bs'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'

import { useDispatch } from 'react-redux';
import { handleLogin, googleOauth } from '../features/login/loginSlice';

// import { auth } from "../firebase";
// import { useAuthState } from "react-firebase-hooks/auth";

export default function Register({ setToken }) {
    const initialValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const dispatch = useDispatch();
    // const { loginEP } = useSelector((state) => state.login)

    // const [user, loading, error] = useAuthState(auth);
    
    // console.log(loginEP)
    // console.log(user);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    // console.log(auth)
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        try {
            dispatch(handleLogin(formValues))
            // logInWithEmailAndPassword(formValues.email, formValues.password)
            setFormValues({email: '', password: ''})
            handleClose();
        } catch(error) {
            console.error(error);
        }
    };

    const handleLoginGoogle = () => {
        try {
            dispatch(googleOauth())
            handleClose();
        }catch(error){
            console.error(error);
        }
        // dispatch(googleOauth(credentialResponse))
    }

    const token = localStorage.getItem('token');
    const gToken = localStorage.getItem('google_user');
    useEffect(() => {
        if(token || gToken) {
            setToken(true);
        } else {
            setToken(false)
        }
    }, [token, setToken, gToken]);

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters";
        }
        return errors;
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }
    return (
        <>
            <Button onClick={handleShow} className='nav__button' variant='outline-danger' style={{ borderRadius: '2rem', padding: '0.5rem 1rem'}} >Login</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='form__register' onSubmit={handleSubmit}>
                        <Form.Group className="mb-3 position-relative" controlId="formEmail">
                            <Form.Control
                                name='email' 
                                type="email" 
                                placeholder='Email Address' 
                                value={formValues.email}
                                onChange={handleChange}
                            />
                            <BsEnvelope className='icon' />
                            <p className='text-danger'>{formErrors.email}</p>
                        </Form.Group>
                        
                        <Form.Group className="mb-3 position-relative" controlId="formPassword">
                            <Form.Control
                                name='password'
                                type={(showPassword === false) ? 'password':'text'} 
                                placeholder='Password' 
                                autoComplete="off" 
                                value={formValues.password}
                                onChange={handleChange} 
                            />
                            <div>
                                {
                                    (showPassword === false) ? 
                                        <BsFillEyeSlashFill className='icon' onClick={handleClickShowPassword} />: 
                                        <BsFillEyeFill className='icon' onClick={handleClickShowPassword}/>
                                }
                            </div>
                            <p className='text-danger'>{formErrors.password}</p>
                        </Form.Group>
                        
                        <Button className='modal__button' variant="danger" type='submit' style={{borderRadius: '2.5rem'}}>
                            Login
                        </Button>
                        {/* <GoogleLogin
                            onSuccess={handleLoginGoogle}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        /> */}
                    </Form>
                    <Button 
                            onClick={handleLoginGoogle} 
                            className='modal__button' variant="danger" type='google' style={{borderRadius: '2.5rem'}}>
                            Login Wiwth Google
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    );
}