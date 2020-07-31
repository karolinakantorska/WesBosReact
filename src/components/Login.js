import React from 'react';
import PropTypes from "prop-types";

const Login = (props) => (
    <nav class="login">
        <h2>Inventory Login</h2>
        <p>Sign in to manage your stores inventory</p>
        <button 
            className= "gitHub"
            onClick={() => props.authenticate('GitHub')}
        >Login with GitHub</button>
    </nav>
)
Login.propTypes = {
    authenticate: PropTypes.func.isRequired
}
export default Login;