import React, {Component} from 'react';
import axios from 'axios';
import ProjectSearchResult from './projectSearchResult';
import base from './rebase';
import MoreInfo from './moreInfo';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

//This allows us to work within the console
window.base = base;

class App extends Component {

  constructor() {
    super();
    this.state = {
      user: {},
      searchResults: {},
      users: [],
      projects: []
    }
  }

  componentDidMount() {
    // whenever user logs in or out, run setUserState
    base.onAuth(this.setUserState.bind(this));
  }

  setUserState(user) {
    this.setState({
      user: user || {}
    });
    if (user) {
      this.offSwitchForProjects = base.syncState(`users/${user.uid}/projects`, {
        context: this,
        asArray: true,
        state: 'projects'
      });
      this.offSwitchForUsers = base.syncState(`users/${user.uid}/users`, {
        context: this,
        asArray: true,
        state: 'users'
      });
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.offSwitchForUsers);
    base.removeBinding(this.offSwitchForProjects);
    // base.removeBinding(this.offSwitchForUrl);
  }

  login() {
    base.authWithOAuthPopup('github', function() {});
  }

  logout() {
    base.unauth()
  }

  loginOrLogoutButton() {
    if (this.state.user.uid) {
      return <button onClick={this.logout.bind(this)}>Logout</button>
    } else {
      return <button onClick={this.login.bind(this)}>Login</button>
    }
  }

  searchGithubProjects(event) {
    event.preventDefault();
    const project = this.projectName.value;
    axios.get(`https://api.github.com/search/repositories?q=${project}`).then(response => {
      this.setState({searchResults: response.data})
      // console.log(response.data)
    });
    this.projectName.value = '';
    //base.push(`/users/${this.state.user.uid}/projects`,
    //{ data: { name: project }})
  }

  formIfLoggedIn() {
    if (this.state.user.uid) {
      return (
        <form onSubmit={this.searchGithubProjects.bind(this)}>
          <input placeholder='Favorite GitHub Projects' ref={element => this.projectName = element}/>
          <button>Search GitHub Repos</button>
        </form>
      )
    }
  }

  displaySearchResults() {
    if (this.state.searchResults.items) {
      const results = this.state.searchResults;
      const projectIds = this.state.projects.map(p => p.id);
      return (
        <div>
          <h3>{results.total_count}
            Results</h3>
          <ul>
            {results.items.map((project, index) => {
              return <ProjectSearchResult key={index} project={project} alreadyInFirebase={projectIds.includes(project.id)} addProject={this.addProject.bind(this)} removeProject={this.removeProject.bind(this)}/>
            })}
          </ul>
        </div>
      )
    }
  }

  addProject(project) {
    // console.log(project);
    const projectData = {
      name: project.name,
      id: project.id
    }
    this.setState({projects: this.state.projects.concat(projectData)});
  }

  removeProject(removedProject) {
    let newArray = this.state.projects.filter(project => {
      return project.id !== removedProject.id
    })
    this.setState({projects: newArray});
  }
  // filter in this method through the objs proj state. Obj id to != proj id - specify what of the object you want to be comparing

  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h2>Welcome to React</h2>
          </div>
          <Route exact path="/" render={(defaultProps) =>
            <div>
          <p className="App-intro">
            {this.loginOrLogoutButton()}
          </p>
          {this.formIfLoggedIn()}
          {this.displaySearchResults()}
          </div>
          } />

          <Route path="/MoreInfo/:id" render={(pickles) => <MoreInfo {...pickles}/>}/>
        </div>
      </Router>
    );
  }
}

export default App;
