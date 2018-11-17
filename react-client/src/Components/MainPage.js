import React, {Component} from 'react';
import auth from '../Auth'
import {Redirect} from "react-router-dom";

// Components
import ItemTable from './ItemTable';
import ItemModal from './ItemModal';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state={authenticated:false,showModal:false};

        this.showModal = this.showModal.bind(this);
    }

    componentWillUnmount(){
        auth.logout();
    }

    showModal() {
        this.setState({showModal: !this.state.showModal});
    }

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
                    <ItemTable/>
                    {this.state.showModal?<ItemModal title={"Modify"} />:""}
                </div>
            );
        }
    }
}

export default MainPage;