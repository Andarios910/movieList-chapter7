import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { BsPerson, BsEnvelope } from 'react-icons/bs'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'

import { useDispatch } from 'react-redux';
import { handleRegister } from '../features/login/loginSlice';

export default function Register({ setToken }) {
    const initialValues = { name:"",  email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        try {
            dispatch(handleRegister(formValues))
            setFormValues({name: "",  email: "", password: "", password_confirmation: ""})
            handleClose();
        }catch(error) {
            console.error(error)
        }
    }

    const token = localStorage.getItem('token')
    useEffect(() => {
        if(token) {
            setToken(true);
        } else {
            setToken(false);
        }
    }, [token, setToken]);

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
            <Button onClick={handleShow} className='nav__button' variant='danger' style={{ borderRadius: '2rem' }} >Register</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='form__register' onSubmit={handleSubmit}>
                        <Form.Group className="mb-3 position-relative" controlId="name" >
                            <Form.Control
                                name='name'
                                type="text"
                                placeholder="Name"
                                onChange={handleChange}
                                value={formValues.name} 
                            />
                            <BsPerson className='icon' />
                            <p className='text-danger'>{formErrors.name}</p>
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
                            <p className='text-danger'>{formErrors.email}</p>
                        </Form.Group>

                        <Form.Group className="mb-3 position-relative" controlId="password">
                            <Form.Control
                                name='password'
                                type={(showPassword === false) ? 'password' : 'text'}
                                placeholder='Password'
                                autoComplete="off"
                                onChange={handleChange}
                                value={formValues.password}
                            />
                            <div>
                                {
                                    (showPassword === false) ?
                                        <BsFillEyeSlashFill className='icon' onClick={handleClickShowPassword} /> :
                                        <BsFillEyeFill className='icon' onClick={handleClickShowPassword} />
                                }
                            </div>
                            <p className='text-danger'>{formErrors.password}</p>
                        </Form.Group>

                        <Button className='modal__button' variant="danger" type="submit" style={{ borderRadius: '2.5rem' }}>
                            Register
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}