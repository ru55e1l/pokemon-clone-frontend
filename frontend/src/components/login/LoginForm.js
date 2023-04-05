import React, { useState, useRef, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {apiSlice} from "../../app/api/apiSlice";
import {useLoginMutation} from "../../app/api/authApiSlice";

import { TextField, Button } from '@mui/material';
function LoginForm() {
    const userRef = useRef();
    const errRef = useRef();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [login, { isLoading}] = useLoginMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setError('')
    }, [username, password])

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const msg = await login({username, password}).unwrap();
            navigate('/welcome');
        } catch(err) {
            setError(err.data.message);
            errRef.current.focus();
        }
    };

    const inputStyles = { width: '70%', margin: '8px' };

    return (

        <form className="form" onSubmit={handleSubmit}>
            <p ref={errRef} className={error ? "errmsg" : "offscreen"} aria-live="assertive">{error}</p>
            <TextField
                label="Username"
                variant="outlined"
                ref={userRef}
                value={username}
                onChange={handleUsernameChange}
                sx={inputStyles}
            />
            <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={handlePasswordChange}
                sx={inputStyles}
            />
            <Button sx={{width: '80%', height: '60px', margin: '30px'}} type="submit" variant="contained">
                Login
            </Button>
        </form>
    );
}

export default LoginForm;