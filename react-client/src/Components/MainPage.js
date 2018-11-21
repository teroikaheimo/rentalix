import React, {Component} from 'react';
import Auth from '../Auth'
// Components
import ItemTable from './ItemTable';
import ItemModal from './ItemModal';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            toggleModalFunc: () => {},
            updateRowsFunc:()=>{}
        };

        this.onChangeModalRemote=this.onChangeModalRemote.bind(this);
        this.onChangeModal=this.onChangeModal.bind(this);
        this.onItemChange=this.onItemChange.bind(this);
        this.onItemChangeRemote =this.onItemChangeRemote.bind(this);
    }

    onChangeModalRemote(id, addMode) { // Passed to children that want to toggle modal.
        this.state.toggleModalFunc(id, addMode);
    };

    onChangeModal(toggleModalFunc) { // Passed to modal component. Modal calls this function in its constructor and passes the Toggle func as parameter.
        this.setState({
            toggleModalFunc: toggleModalFunc
        })
    }

    onItemChangeRemote(){
        this.state.updateRowsFunc();
    }

    onItemChange(updateRowsFunc){
        this.setState({
            updateRowsFunc: updateRowsFunc
        })
    }

    logout() {
        this.props.logout();
    }

    render() {
        return (
            <div className="MainPage">
                <p>Welcome {this.props.auth.username}</p>
                <button className={"btn btn-primary"} onClick={() => {
                    this.onChangeModalRemote("-", true)
                }}>Add item
                </button>
                <button type="button" onClick={() => this.logout()}>Logout
                </button>
                <ItemTable toggleModalRemote={this.onChangeModalRemote} onItemChange={this.onItemChange} />
                <ItemModal toggleModal={this.onChangeModal} auth={this.props.auth} onItemChangeRemote={this.onItemChangeRemote}/>
            </div>
        );
    }
}

export default MainPage;