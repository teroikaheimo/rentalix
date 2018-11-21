import React, {Component} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import './App.css';
// Components
import {LoginRegister} from './Components/LoginRegister'
import MainPage from './Components/MainPage'
import Auth from './Auth';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            Auth:Auth
        };
        this.onLogout = this.onLogout.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }

    onLogin(username,password){
        return new Promise((resolve,reject)=>{
            this.state.Auth.login(username,password)
                .then(()=>{
                    this.setState({Auth:{authenticated:true}});
                }).then(()=>resolve())
                .catch(()=>reject())
        });

    }

    onLogout(){
        return new Promise((resolve,reject)=>{
            this.state.Auth.logout()
                .then(()=>{
                    this.setState({Auth:{authenticated:false}});
                }).then(()=>resolve())
                .catch(()=>reject())
        });
    }

    render() {
        return (
            <div className={"App"}>
                <Switch>
                    <Route exact path="/" render={ props => <LoginRegister {...props} Login={this.onLogin} Auth={this.state.Auth} />} />

                    {this.state.Auth.authenticated?
                        <Route exact path="/main" render={ props => <MainPage {...props} Logout={this.onLogout} Auth={this.state.Auth} test={"HALOO"} />} />
                        :
                        <Redirect to={{pathname: "/", state: { from: this.props.location }}}/>}

                    <Route path="*" component={() => "404 NOT FOUND"} />
                </Switch>
            </div>
        );
    }
}


export default App;