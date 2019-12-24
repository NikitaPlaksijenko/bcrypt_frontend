import React from 'react';
import ReactDOM from 'react-dom';
import range from 'lodash/range';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Modal, ModalTitle, ModalBody, ModalFooter } from 'react-bootstrap';



class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      username: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.savetoken = this.savetoken.bind(this);
  }
  savetoken = (token) => { window.localStorage['jwttoken'] = token; }
 
  handleSubmit = async function handleSubmit() {
    const data = {
      username: this.state.username,
      password: this.state.password
    };
    if (this.state.username === '' || this.state.password === '') {
      alert('Insert correctly.');
    }
    else {
      await fetch('http://agile-forest-20572.herokuapp.com/login', {
        method: 'Post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(( res )=> res.text())
        .then((res)=> JSON.parse(res))
        .then(body => {
          console.log(body);
          this.savetoken(body.token);
        })
        .catch(err => console.error('error:', err));
    }
  }
  componentDidUpdate() {
    console.log(this.state);
  }
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  }
  clickfunction = () => {
    
    this.hideModal();
    this.handleSubmit();
  }
  render() {
    return (
      <main>
       <table>
          <tr>
            <td align='left' class='mypage'><h1 id='title'>LogIn Page</h1></td>
         </tr>
        <tr align='left'><Link to='/'>Home</Link></tr>
        <tr align='left'><Link to='/Signup'>SignUp</Link></tr>
        <tr align='left'><Link to='/login'>Log In</Link></tr>
        <tr align='left'><Link to='/mypage'>Private Show</Link></tr>
        </table>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <ModalTitle align='right'>Log In<Link to='/'>Cancel</Link></ModalTitle>
          <ModalFooter>
            <p>Username:<input type='text' placeholder='Input your name.' onChange={(e) => this.setState({ username: e.target.value })} /></p>
            <p>Password:<input type='password' placeholder='Input your password.' onChange={(e) => this.setState({ password: e.target.value })} /></p>
            <Button type="button" onClick={this.clickfunction}>
              OK
          </Button>
          </ModalFooter>
        </Modal>
      </main>
    );
  }
}


export default Login;