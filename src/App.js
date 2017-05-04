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
      user: {},
      projects: [],
      users: []
    }
  }

  componentDidMount () {
    // this.getGitHubInfo()
    base.auth().onAuthStateChanged(user => {
      if (user) {
        this.getGitHubInfo()
      }
    })
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
    base.push(`/users/${this.state.user.displayName}/projects`, { data: project })
  }

  addUserNameToFirebase (event) {
    event.preventDefault();
    const name = this.userName.value;
    console.log(name);
    base.push(`/users/${this.state.user.displayName}/userName`, {data: name})
  }

  formIfLoggedIn () {
    if (this.state.user.uid) {
      return (
        <div>
        <form onSubmit={ this.addProjectToFirebase.bind(this)}>
          <input
            placeholder='Favorite GitHub Projects'
            ref={ element => this.projectName = element} />
          <button>Add to Firebase</button>
        </form>

        <form onSubmit={ this.addUserNameToFirebase.bind(this)}>
          <input
          placeholder='Add GitHub User'
          ref={ element => this.userName = element } />
          <button>Add User</button>
        </form>
        </div>
      )
    }
  }

  displayMyShit () {
    // console.log(this.state.projects);
    if (this.state.user.uid)
      return (
        <div>
          <div>
            <h3>Projects</h3>
            {this.state.projects.map((project, index) => {
              return (
                <li key={index}>{project}</li>
              )}
            )}
          </div>

          <div>
            <h3>Users</h3>
            {this.state.users.map((arr, index) => {
              return (
                <li key={index}>{arr}</li>
              )}
            )}
          </div>
        </div>
      )
  }

  getGitHubInfo(){
    // console.log('moto');
    base.fetch(`/users/${this.state.user.displayName}/projects`, {
      context: this,
      asArray: true
    }).then(data => {
      // console.log(data);
      this.setState({
        projects:data
      })
    })
    base.fetch(`/users/${this.state.user.displayName}/userName`, {
      context: this,
      asArray: true
    }).then(data => {
      // console.log(data);
      this.setState({
        users:data
      })
    })
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
        <hr />
        {this.displayMyShit()}
        {/* {this.getGitHubInfo()} */}
      </div>
    );
  }
}

export default App;
