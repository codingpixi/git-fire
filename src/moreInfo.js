import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class MoreInfo extends Component {

  constructor() {
    super()
    this.state = {
      owner: {}
      project: {}
    }
  }

  componentDidMount(){
     axios.get(`https://api.github.com/repositories/${this.props.match.params.id}`)
     .then(response => {this.setState({project: response.data, owner:response.data.owner})})
   }

   getInfo() {
     console.log(this.state.project);
   }

  render () {

    return (
      <div>
        <div>
          {this.getInfo()}
        </div>
      <p>Hello</p>
      </div>
    )
  }
}

export default MoreInfo;
