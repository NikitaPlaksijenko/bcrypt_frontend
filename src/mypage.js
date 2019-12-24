import React from 'react';
import Button from 'react-bootstrap/Button';
import { Modal, ModalTitle, ModalBody, ModalFooter } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



class Secret extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      id: '',
      email: '',
      password: '',
      token : ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.take = this.take.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
  }
  
  take = (res) => {
    this.setState({
        username : res.result.jsonuser[0].username,
        id: res.result.jsonuser[0].id,
        email: res.result.jsonuser[0].email,
        password: res.result.jsonuser[0].password
    });
    window.localStorage['myname'] = res.result.jsonuser[0].username;
  }
  
  componentDidMount() {
     setInterval( this.refreshToken,  500);
  }
  
  refreshToken = () => {
    this.setState({ token:window.localStorage['jwttoken'] });

  }

  handleSubmit = async () => {
  
    await fetch('http://agile-forest-20572.herokuapp.com/mypage', {
      method: 'GET',
      headers: { 'authorization': `bearer ${this.state.token}` }
    }).then(res => res.text())
      .then(body => JSON.parse(body))
      .then(body=> this.take(body))
      .catch((err) => alert('error:', err));
  }
  render() {
    return (
      <div>
        <Link to='/'>Home</Link><br />
        <Link to='/Signup'>SignUp</Link><br />
        <Link to='/login'>Log In</Link><br />
        <Link to='/mypage/update'>Update</Link>
        <table>
          <tr>user_id:   <h5>{this.state.id}</h5></tr>
          <tr>username:  <h5>{this.state.username}</h5></tr>
          <tr>password:  <h5>{this.state.password}</h5></tr>
          <tr>email:     <h5>{this.state.email}</h5></tr>
          <tr><Button  class='btn btn-success' onClick={this.handleSubmit} >Private View</Button></tr>
        </table>
      </div>
    );
  }
}



export default Secret;