import React from 'react';
import "../../../html/assets/css/login.css";

import PropTypes from 'prop-types';


export class LogoutForm extends React.Component {
    constructor(props) {
        super(props)
        localStorage.setItem("user", "");
    }


    render() {

        return (

            <div className="login-page">
                <div className="form">
                    <div className="form-wrap">
                        <h1>User Logged Out Successfully</h1>
                    </div>
                </div>
            </div>

        )
    }
}


