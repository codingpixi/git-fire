import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProjectSearchResult extends Component {

  handleClick (project) {
    // console.log(project);
    if (this.props.alreadyInFirebase) {
      this.props.removeProject(project)
    } else {
      this.props.addProject(project)
    }
  }

  addOrRemoveButton (project) {
    // console.log(project);
    if (this.props.alreadyInFirebase) {
      return <button onClick={this.handleClick.bind(this, project)}>Remove from Firebase</button>
    } else {
      return <button onClick={this.handleClick.bind(this, project)}>Add to Firebase</button>
    }
  }
  render () {
    const project = this.props.project;
    // console.log(project);
    return (
      <li>
        <a href={project.html_url} target="_blank"><strong style={{cursor: 'pointer'}}>{project.name}</strong></a>
        <Link to={`/MoreInfo/${project.id}`}>
        <div>
          <a href="{project.id}">More Info</a>
        </div>
        </Link>
        <p>{project.stargazers_count}</p>
        <p>{project.description}</p>
        {this.addOrRemoveButton(project)}
      </li>
    )
  }
}

export default ProjectSearchResult;
