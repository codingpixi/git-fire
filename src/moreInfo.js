import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class MoreInfo extends Component {

  constructor() {
    super()
    this.state = {
      project: {},
      owner: {}
    }
  }

  componentDidMount(){
     axios.get(`https://api.github.com/repositories/${this.props.match.params.id}`)
     .then(response => {this.setState({project: response.data, owner:response.data.owner})})
   }

   getInfo() {
     console.log(this.state.project);
     console.log(this.state.owner);
   }

  render () {

    return (
      <div>
        <div>
          {this.getInfo()}
          <p><img src={this.state.owner.avatar_url}/></p>
          <p><strong>GitHub User</strong>: {this.state.owner.login}</p>
          <p>{this.state.owner.id}</p>
          <div>
            <a href={this.state.owner.html_url}>Visit GitHub</a>
          </div>
          <p>Project Creation Date: {this.state.project.created_at}</p>
          <p>Updated Date:{this.state.project.updated_at}</p>
          <p><a href={this.state.project.homepage}>Homepage</a></p>
          <p>Language(s): {this.state.project.language}</p>
          <p></p>
        </div>

        {/* <p>Hello</p> */}
      </div>
    )
  }
}

export default MoreInfo;
