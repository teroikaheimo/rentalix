import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
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
    }

    render() {
        return (
            <div className={"App"}>
                <Switch>
                    <Route exact path="/" render={ props => <LoginRegister {...props} Auth={this.state.Auth} />} />}/>
                    <Route exact path="/main" render={ props => <MainPage {...props} Auth={this.state.Auth} />} />}/>
                    <Route path="*" component={() => "404 NOT FOUND"} />
                </Switch>
            </div>
        );
    }
}


export default App;