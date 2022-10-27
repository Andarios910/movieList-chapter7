import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { BsEnvelope } from 'react-icons/bs'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'

import { useSelector, useDispatch } from 'react-redux';
import { handleLogin } from '../features/login/loginSlice';

import { GoogleLogin } from '@react-oauth/google';

export default function Register({ setToken }) {
    const initialValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const dispatch = useDispatch();
    const { login } = useSelector((state) => state.login)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        dispatch(handleLogin(formValues))
        localStorage.setItem('token', login.token);
        localStorage.setItem('user', JSON.stringify(login));
        setFormValues({ email: "", password: "" })
        const token = localStorage.getItem('token')
        if(login && token) {
            setToken(true);
        } else {
            setToken(false)
        }
        handleClose();
    };
    
    useEffect(() => {
    }, [formErrors]);

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
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                localStorage.setItem('google_user', credentialResponse.credential)
                                const token = localStorage.getItem('google_user');
                                if(token) {
                                    setToken(true);
                                } else {
                                    setToken(false);
                                }
                                handleClose();
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />;
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}