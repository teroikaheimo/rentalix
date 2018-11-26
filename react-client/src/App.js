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
            auth:{
                username: "",
                authenticated:false,
                admin:false
            }

        };
        this.onLogout = this.onLogout.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }

    onLogin(username,password){
        return new Promise((resolve,reject)=>{
            Auth.login(username,password)
                .then((result)=>{
                    this.setState({auth:{authenticated:true,userId:result.id,admin:result.admin,username:result.username}});
                }).then(()=>resolve( ))
                .catch((err)=>reject(console.log(err)))
        });
    }

    onLogout(){
        return new Promise((resolve,reject)=>{
            Auth.logout()
                .then(()=>{
                    this.setState({auth:{authenticated:false,userId:"",admin:false,username:""}});
                }).then(()=>resolve())
                .catch((err)=>reject(console.log(err)))
        });
    }

    render() {
        return (
            <div className={"App"}>
                <Switch>

                    <Route exact path="/" render={ props => <LoginRegister {...props} Login={this.onLogin}/>} />

                    {this.state.auth.authenticated?
                        <Route exact path="/main" render={ props => <MainPage {...props} logout={this.onLogout} auth={this.state.auth} />} />
                        :
                        <Redirect to={{pathname: "/", state: { from: this.props.location }}}/>}

                    <Route path="*" component={() => "404 NOT FOUND"} />
                </Switch>
            </div>
        );
    }
}


export default App;