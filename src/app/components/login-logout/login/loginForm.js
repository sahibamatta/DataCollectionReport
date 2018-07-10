import React from 'react';
import "../../../html/assets/css/login.css";
import { browserHistory } from 'react-router'

import PropTypes from 'prop-types';
const urlForUserLogin = "http://localhost:8080/WalletService/user/login";

export class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: "",
      password: "",
      createDiv: "",
      errorDiv: "",
      userDiv: "",
      passwordDiv: ""
    }

    this.clearAllFields = this.clearAllFields.bind(this);
    this.checkUserData = this.checkUserData.bind(this);
    this.isNotEmptyFieldCheck = this.isNotEmptyFieldCheck.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.routingBasedOnUserProfile = this.routingBasedOnUserProfile.bind(this);


  }


  checkUserData() {
    console.log("in check user data");

    var data = {
      "user": this.state.user,
      "password": this.state.password,
    }

    var headers = {
      "Content-Type": "application/json"
    }

    fetch(urlForUserLogin, {
      method: "POST",
      headers: new Headers({
        'Content-Type': 'application/json'
      })
      ,
      body: JSON.stringify(data)

    })
      .then(function (response) {
        var d = response.json()
        console.log("response is:" + d)
        return d;
      })

      .then(data => {
        console.log("then data::" + JSON.stringify(data))

        if (data.status == 1) {
          this.setState({
            createDiv: data.message
          })
          this.clearAllFields();

          this.routingBasedOnUserProfile(data.profile);
        }
        else {
          this.setState({
            errorDiv: data.message
          })
        }

        console.log("this.state.createDiv is::" + this.state.createDiv);
        console.log("this.state.errorDiv is::" + this.state.errorDiv);

      })
  }

  routingBasedOnUserProfile(profile) {
    console.log("in routingbasedonuserprofile::" + profile)
    localStorage.setItem('user', profile);

    if (profile == "Administrator")
      browserHistory.push("/CreateUser");
    else if (profile == "Seller")
      browserHistory.push("/WalletSeller");

  }


  clearAllFields() {

    this.setState({

      user: "",
      password: "",
      userDiv: "",
      passwordDiv: "",
      errorDiv: ""
    })
  }

  isNotEmptyFieldCheck(event) {
    console.log("auth::" + this.props.token)
    event.preventDefault();

    this.setState({
      userDiv: "",
      passwordDiv: ""
    })

    console.log("in notempty::" + this.state.user + "::password is::" + this.state.password)

    if (this.state.user == null || this.state.user == '') {
      this.setState({
        userDiv: "Please enter a User Id"
      })
      return false;
    }

    else if (this.state.password == null || this.state.password == '') {
      this.setState({
        passwordDiv: "Please enter Password"
      })
      return false;
    }

    return true;
  }

  handleChange(event) {
    console.log("in handlechange::" + event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    });
  }


  render() {

    return (

      <div className="login-page">
        <div className="form">

          <form className="login-form">
            <div className="form-wrap">
              <input type="text" placeholder="username" name="user" id="userId" maxLength="200"
                value={this.state.user} onChange={this.handleChange} />
              <div className="error" id="userDivId" data-value=
                {this.state.userDiv}>{this.state.userDiv}</div>
            </div>
            <input type="password" placeholder="password" name="password" id="passwordId" maxLength="200"
              value={this.state.password} onChange={this.handleChange} />
            <div className="error" id="passwordDivId" data-value=
              {this.state.passwordDiv}>{this.state.passwordDiv}</div>

            <button onClick={(event) => {
              if (this.isNotEmptyFieldCheck(event)) {
                this.checkUserData();
              }
            }}>login</button>

            <div className="success" id="createDivId" value={this.state.createDiv}>
              {this.state.createDiv}</div>
            <div className="error" id="errorDivId" value={this.state.errorDiv}>
              {this.state.errorDiv}</div>

          </form>
        </div>
      </div>

    )
  }
}

// LoginForm.defaultProps = {
//   onLoginSubmit() {},
//   isFormSubmitting: false,
// };

LoginForm.propTypes = {
  isFormSubmitting: PropTypes.bool
};

