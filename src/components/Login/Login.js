import React, { Component } from 'react';
import { PostData } from '../../services/PostData';
import { Redirect } from 'react-router-dom';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirect: false,
    };
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  login() {
    if (this.state.username && this.state.password) {
      PostData('login', this.state).then((result) => {
        let responseJSON = result;
        if (responseJSON.userData) {
          sessionStorage.setItem('userData', responseJSON);
          this.setState({ redirect: true });
        } else {
          console.log('Login error');
        }
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={'/home'} />;
    }
    if (sessionStorage.getItem('userData')) {
      return <Redirect to={'/home'} />;
    }

    return (
      <div className="row small-up-2 medium-up-3 larg-up-4">
        <div className="column bodyPart">
          <h2>Login Page</h2>
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={this.onChange}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="Login"
            className="button"
            onClick={this.login}
          />
          <a href="/signup">Registrar</a>
        </div>
      </div>
    );
  }
}

export default Login;
