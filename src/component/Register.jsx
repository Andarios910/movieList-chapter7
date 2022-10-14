import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import {BsPerson, BsEnvelope} from 'react-icons/bs'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'

export default function Register() {
    const initialValues = { first_name: "", last_name: "",  email: "", password: "", password_confirmation: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        console.log(e);
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    // console.log(formValues)
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        try {
            const req = await axios.post('http://notflixtv.herokuapp.com/api/v1/users', formValues)
            console.log(req);
            // localStorage.setItem('user', JSON.stringify(req.data.data))
            // setFormValues({ email: "", password: "" })
            // const user = JSON.parse(localStorage.getItem('user'))
            // if(user.token) {
            //     setToken(true);
            // } else {
            //     setToken(false);
            // }
            handleClose();
        }catch(error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const [showPwdCon, setShowPwdCon] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }
    
    const handleClickConPass = () => {
        setShowPwdCon(!showPwdCon)
    }
    return (
        <>
            <Button onClick={handleShow} className='nav__button' variant='danger' style={{ borderRadius: '2rem' }} >Register</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='form__register' onSubmit={handleSubmit}>
                        <Form.Group className="mb-3 position-relative" controlId="firstName" >
                            <Form.Control 
                                required 
                                name='first_name' 
                                type="text"
                                placeholder="First Name" 
                                onChange={handleChange}
                                value={formValues.first_name} 
                            />
                            <BsPerson className='icon' />
                        </Form.Group>

                        <Form.Group className="mb-3 position-relative" controlId="lastName">
                            <Form.Control 
                                required 
                                name='last_name'
                                type="text"  
                                placeholder="Last Name" 
                                onChange={handleChange}
                                value={formValues.last_name} 
                            />
                            <BsPerson className='icon' />
                        </Form.Group>

                        <Form.Group className="mb-3 position-relative" controlId="email">
                            <Form.Control 
                                type="email"
                                name='email' 
                                placeholder='Email Address' 
                                onChange={handleChange}
                                value={formValues.email}
                            />
                            <BsEnvelope className='icon' />
                        </Form.Group>

                        <Form.Group className="mb-3 position-relative" controlId="password">
                            <Form.Control 
                                required 
                                name='password'
                                type={(showPassword === false) ? 'password':'text'} 
                                placeholder='Password' 
                                autoComplete="off" 
                                onChange={handleChange}
                                value={formValues.password}
                            />
                            <div>
                                {
                                    (showPassword === false) ? 
                                        <BsFillEyeSlashFill className='icon' onClick={handleClickShowPassword} />: 
                                        <BsFillEyeFill className='icon' onClick={handleClickShowPassword}/>
                                }
                            </div>
                        </Form.Group>
                        
                        <Form.Group className="mb-3 position-relative" controlId="passwordConfirmation">
                            <Form.Control 
                                required 
                                name='password_confirmation'
                                type={(showPwdCon === false) ? 'password':'text'} 
                                placeholder='Password Confirmation' 
                                autoComplete="off" 
                                onChange={handleChange}
                                value={formValues.password_confirmation}
                            />
                            <div>
                                {
                                    (showPwdCon === false) ? 
                                        <BsFillEyeSlashFill className='icon' onClick={handleClickConPass} />: 
                                        <BsFillEyeFill className='icon' onClick={handleClickConPass}/>
                                }
                            </div>
                        </Form.Group>
                        
                        <Button variant="danger" type="submit">
                            Register
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}