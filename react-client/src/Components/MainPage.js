import React, {Component} from 'react';
import auth from '../Auth'
import {Redirect} from "react-router-dom";

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state={authenticated:false}

    }

    render() {
        console.log(auth.isAuthenticatedBool());
        if (!auth.isAuthenticatedBool()) {
            return (
                <Redirect
                    to={{
                        pathname: "/",
                        state: {
                            from: this.props.location
                        }
                    }}
                />
            );
        }else {
            return (
                <div className="MainPage">
                    <p>Welcome {auth.getUsername()}</p>
                    <button type="button" onClick={() => {
                        auth.logout()
                            .then(() => {
                                    if (auth.isAuthenticated()) {
                                        this.props.history.push("/");
                                    }
                                }
                            )
                    }
                    }>Logout
                    </button>
                </div>
            );
        }
    }
}

export default MainPage;