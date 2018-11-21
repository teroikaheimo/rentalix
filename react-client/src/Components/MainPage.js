import React, {Component} from 'react';

// Components
import ItemTable from './ItemTable';
import ItemModal from './ItemModal';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            toggleModalFunc: ()=>{}
        };
        this.Auth = this.props.Auth;
        this.Logout = this.Logout.bind(this);
    }

    onChangeModal(toggleModalFunc){ // Passed to modal component. Modal calls this function in its constructor and passes the Toggle func as parameter.
        this.setState({
            toggleModalFunc: toggleModalFunc
        })
    }

    OnChangeModalRemote(id,addMode) { // Passed to children that want to toggle modal.
        this.state.toggleModalFunc(id,addMode);
    };

    Logout(){
            this.props.Logout();
    }
    //<p>Welcome {this.Auth.getUsername()}</p>
    render() {
        console.log(this.props.test);
            return (
                <div className="MainPage">

                    <button className={"btn btn-primary"} onClick={()=>{this.OnChangeModalRemote("-",true)}}>Add item</button>
                    <button type="button" onClick={this.Logout}>Logout
                    </button>
                    <ItemTable toggleModalRemote={this.OnChangeModalRemote.bind(this)} />
                    <ItemModal toggleModal={this.onChangeModal.bind(this)}/>
                </div>
            );
        }
}

export default MainPage;