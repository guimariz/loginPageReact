import React, { Component } from 'react';
import './Home.css';
import { Redirect } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    if (sessionStorage.getItem('userData')) {
      console.log('Call User Feed');
    } else {
      this.setState({ redirect: true });
    }
  }

  logout() {
    sessionStorage.setItem('userData', '');
    sessionStorage.clear();
    this.setState({ redirect: true });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={'/login'} />;
    }

    return (
      <div className="callout primary">
        <div className="row column">
          <h1>Home Page</h1>

          <button type="button" className="button" onClick={this.logout}>
            Logout
          </button>
        </div>
      </div>
    );
  }
}

export default Home;
