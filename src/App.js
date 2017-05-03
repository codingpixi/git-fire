import React, { Component } from 'react';
import base from './rebase';
import logo from './logo.svg';
import './App.css';

// able to use rebase from web developer console
window.base = base;

class App extends Component {

  constructor () {
    super();
    this.state = {
      user: {}
    }
  }

  login () {
    var authHandler = (error, data) => {
      console.log('error', error)
      console.log('user', data.user)
      this.setState({
        user: data.user
      })
    }
    //basic
    base.authWithOAuthPopup('google', authHandler);
  }

  logout () {
    base.unauth()
    this.setState({
      user: {}
    })
  }

  loginOrLogoutButton() {
    if (this.state.user.uid) {
      return <button onClick={this.logout.bind(this)}>Logout</button>
    } else {
      return <button onClick={this.login.bind(this)}>Login</button>
    }
  }

  addProjectToFirebase (event) {
    event.preventDefault();
    const project = this.projectName.value;
    console.log(project);
    base.push(`/users/${this.state.user.uid}/projects`, { data: project })
  }

  formIfLoggedIn () {
    if (this.state.user.uid) {
      return (
        <form onSubmit={ this.addProjectToFirebase.bind(this)}>
          <input
            placeholder='Favorit GitHub Projects'
            ref={ element => this.projectName = element} />
          <button>Add to Firebase</button>
          <input
          placeholder='GitHub users'
          ref={ element => this.user = element} />
          <button>Add User</button>
        </form>
      )
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          {this.loginOrLogoutButton()}
        </p>
        {this.formIfLoggedIn()}
      </div>
    );
  }
}

export default App;
