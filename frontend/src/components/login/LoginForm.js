import React, { useState, useRef, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {apiSlice} from "../../app/api/apiSlice";
import {useLoginMutation} from "../../app/api/authApiSlice";

import { TextField, Snackbar, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
function LoginForm() {
    const userRef = useRef();
    const errRef = useRef();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [login, { isLoading}] = useLoginMutation();
    const dispatch = useDispatch();
    const [errorOpen, setErrorOpen] = React.useState(false);
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
            setErrorOpen(true);
            setError(err.data.message);
            errRef.current.focus();
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setErrorOpen(false);
    };

    const inputStyles = { width: '70%', margin: '8px' };

    return (


        <form className="form" onSubmit={handleSubmit}>
            <TextField
                error={error}
                label="Username"
                variant="outlined"
                ref={userRef}
                value={username}
                onChange={handleUsernameChange}
                sx={inputStyles}
            />
            <TextField
                error={error}
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={handlePasswordChange}
                sx={inputStyles}
            />
            <LoadingButton sx={{width: '80%', height: '60px', margin: '30px'}} loading={isLoading} type="submit" variant="contained">
                Login
            </LoadingButton>
            <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </form>
    );
}

export default LoginForm;