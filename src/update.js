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





class Update extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      show: true,
      myname : window.localStorage['myname'],
      email: '',
      username: '',
      password: ''
    }
    this.savetoken = this.savetoken.bind(this);
  }
  
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  buttonfunction = () => {
    this.hideModal();
    this.handleSubmit();
  }
  savetoken = (token) => {
    window.localStorage['jwttoken'] = token;
  }
  handleSubmit = async ()=> {
    const data = {
      myname : this.state.myname,
      email : this.state.email,
      username : this.state.username,
      password : this.state.password
    }
    await fetch('http://agile-forest-20572.herokuapp.com/mypage/update', {
      method : 'Post',
      headers : { 'Content-Type' : 'application/JSON' },
      body : JSON.stringify(data)
    }).then((res)=>res.text())
      .then((res)=>JSON.parse(res))
      .then(res=>{
        console.log(res.token);
        this.savetoken(res.token);
      })
      .catch(err=>console.error('error:',err));
  }
  render(){
    return(
          <main>
            <h1>Your updating begins from here... </h1>
            <Link to='/mypage'>Back</Link>
            <Modal show={this.state.show} handleClose={this.hideModal}>
              <ModalTitle>Update<Link to='/'>Cancel</Link></ModalTitle>
              <ModalBody >
                <p>@email address:<input type='text'  onChange={e => this.setState({ email: e.target.value })} /></p>
                <p>Username:<input type='text'  placeholder={this.state.myname} onChange={e => this.setState({ username: e.target.value })} /></p>
                <p>Password:<input type='password'  onChange={e => this.setState({ password: e.target.value })} /></p>
                <Button type="button" onClick={this.buttonfunction}>
                  OK
              </Button>
              </ModalBody>
            </Modal>
          </main>                                                                                           
   
    );
  }
}


export default Update;