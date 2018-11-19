import React, {Component} from 'react';
import auth from '../Auth'
import {Redirect} from "react-router-dom";

// Components
import ItemTable from './ItemTable';
import ItemModal from './ItemModal';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            toggleModalFunc: ()=>{}
        }
    }

    componentWillUnmount() {
        auth.logout();
    }

    onChangeModal(toggleModalFunc){ // Passed to modal component. Modal calls this function in its constructor and passes the Toggle func as parameter.
        this.setState({
            toggleModalFunc: toggleModalFunc
        })
    }

    OnChangeModalRemote(id,addMode) { // Passed to children that want to toggle modal.
        this.state.toggleModalFunc(id,addMode);
    };


    render() {
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
        } else {
            return (
                <div className="MainPage">
                    <p>Welcome {auth.getUsername()}</p>
                    <button className={"btn btn-primary"} onClick={()=>{this.OnChangeModalRemote("-",true)}}>Add item</button>
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
                    <ItemTable toggleModalRemote={this.OnChangeModalRemote.bind(this)} />
                    <ItemModal toggleModal={this.onChangeModal.bind(this)}/>
                </div>
            );
        }
    }
}

export default MainPage;