import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import './App.css';
import {ProtectedRoute} from './Components/protectedRoute'
// Components
import {LoginRegister} from './Components/LoginRegister'
import MainPage from './Components/MainPage'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ""
        };
    }

    render() {
        return (
            <div className="App">
            <Switch>
                <Route exact path="/" component={LoginRegister} />
                 <ProtectedRoute exact path="/main" component={MainPage} />
                <Route path="*" component={() => "404 NOT FOUND"} />
            </Switch>
            </div>

        );
    }
}

export default App;
