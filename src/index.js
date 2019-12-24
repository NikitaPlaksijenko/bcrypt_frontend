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
import {Modal,ModalTitle, ModalBody , ModalFooter} from 'react-bootstrap';
import Secret from './mypage.js';
import Signup from './signup.js';
import Login from './login.js';
import Update from './update.js';


import 'bootstrap/dist/css/bootstrap.min.css';

function Checkbox({ checked, onChange, id }) {
  return (
  <label>
    <input
      type="checkbox"
      id={`id${id}`}
      checked={checked}
      onChange={onChange}
    />
    check{id % 4}
    <br/>
  </label>
  );
}

class Div extends React.Component {
  renderCheckbox(i) {
      return (
          <Checkbox
      key={this.props.divNumber * 4 + i}
      id={this.props.divNumber * 4 + i}
      checked={this.props.checks[this.props.divNumber * 4 + i]}
              onChange={() => this.props.onChange(this.props.divNumber, i)}
          />
      );
  }

  render() {
      let countChecked = 0;///////////////////////////////////////////////
      for (let i = 0; i < 4; i++) {
    countChecked += this.props.checks[this.props.divNumber * 4 + i];
  }
  
      return (
          <div className="checkbox-wrapper">
              <p>div {this.props.divNumber+1} - number of Checked: {countChecked}</p>
      {range(0, 4).map((i) => 
        this.renderCheckbox(i)
      )}
          </div>
      );
  }
}

class CheckboxWrapper extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          checks: Array(16).fill(false),
      };
  }
  
  handleChange(divNumber, checkNumber) {
  const { checks } = this.state;

  // const check = Object.assign({}, checks);
  checks[divNumber * 4 + checkNumber] = !checks[divNumber * 4 + checkNumber];
  this.setState({
    checks,
  });
  }

  render() {
      return (
  
     <table class='table-striped'>
       <tr>
         <td align='left' class='mypage'><h1 id='title'>My Homepage</h1></td>
       </tr>
     <tr align='left'><Link to='/'>Home</Link></tr>
     <tr align='left'><Link to='/Signup'>SignUp</Link></tr>
     <tr align='left'><Link to='/login'>Log In</Link></tr>
     <tr align='left'><Link to='/mypage'>Private Show</Link></tr>
      {range(0, 4).map((i) =>
        <Div
          key={i}
          checks={this.state.checks}
          divNumber={i}
          onChange={(divNumber, checkNumber) => this.handleChange(divNumber, checkNumber)} 
        />
      )}
    </table>
      );
  }
}



/*
class UserArray extends React.Component {
  constructor(props){
    super(props);
     this.state = {
       length : this.props.length,
       array : this.props.array
     }
  }
  render(){
      const element = this.state.array;
    return(
           <div>
              {
                element.map(e=>{
                  return <input type='text'   value={e}/>;
                })
              }
           </div>  
    );
  }
} */
class MyRoute extends React.Component{
 
  constructor(props){
    super(props);
    this.state={
       array : [], 
    }
    this.getUsers = this.getUsers.bind(this);
  }
  
  getUsers = async () => {
        await fetch('http://agile-forest-20572.herokuapp.com/', 
                    {
                      method : 'GET'
                    })
                    .then(res=>res.text())
                    .then(result=>JSON.parse(result))
                    .then(result => {this.setState({
                      array : result,
                        });
                      console.log(this.state);});
  }
  render(){
  return(
    <Router>
     <div class="jumbotron text-center">
       <Switch>
         <Route exact path='/'>
           <CheckboxWrapper />
         </Route>
         <Route exact path='/login'>
           <Login />
         </Route>
         <Route exact path='/Signup'>
           <Signup />
         </Route>
         <Route exact path='/MyPage'>
           <Secret />
         </Route>
         <Route exact path='/MyPage/UpDate'>
           <Update />
         </Route>
       </Switch>
       <Link  onClick={this.getUsers}>Get existing user names...</Link>
       <table class='table-bordered' >
         {
           this.state.array.map(i=>{return <tr >{i}</tr>})
         }
       </table>
     </div>
    </Router>
  );
}
}


ReactDOM.render(<MyRoute />, document.getElementById('root'));
serviceWorker.unregister();