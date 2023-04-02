import React from 'react';
import './LoginPage.css';

const LoginPage = () => {
    return (
        <div className="login-page">
            <div className="login-form">
                <h1>Battles</h1>
                <h2>Login</h2>
                <form>
                    <label>
                        Username:
                        <input type="text" name="username" />
                    </label><br />
                    <label>
                        Password:
                        <input type="password" name="password" />
                    </label><br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
}

export default LoginPage;