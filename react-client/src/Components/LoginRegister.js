import {Component} from "react";
import React from "react";

export class LoginRegister extends Component {
    constructor(props) {
        super(props);
        // TODO remove default username and password values
        this.state = {
            inputUsernameLog: "admin",
            inputPasswordLog: "admin",
            inputUsernameReg: "",
            inputPasswordReg: "",
            inputPasswordConfReg: "",
            regOk: "undefined",
            pwdMatch: true,
            pwdCheckedOnce: false,
            usernameAvailable: true,
            usernameLength: true
        };

        this.checkPwdMatch = this.checkPwdMatch.bind(this);
        this.checkUsername = this.checkUsername.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.Auth = this.props.Auth;

    }

    checkPwdMatch() {
        this.setState({pwdCheckedOnce: true});
        if (this.state.inputPasswordReg === this.state.inputPasswordConfReg && this.state.inputPasswordReg.length > 3) {
            this.setState({pwdMatch: true});
        } else {
            this.setState({pwdMatch: false});
        }
    }

    checkUsername() {
        if (this.state.inputUsernameReg.length > 3) {
            this.Auth.usernameAvailable(this.state.inputUsernameReg)
                .then(()=>{this.setState({usernameAvailable: true})})
                .catch(()=>{this.setState({usernameAvailable: false})});
            this.setState({usernameLength: true})
        } else {
            this.setState({usernameLength: false,usernameAvailable: true})
        }
    }

    handleChange = event => { // Writes changes in the input elements to corresponding state.
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    displayRegTip(){
        if(typeof this.state.regOk === "undefined"){
            return "";
        }else if(this.state.regOk === true){
            return (
                <div className="alert alert-success" role="alert">
                    Registering was <strong>successful!</strong>
                </div>)
        }else if(this.state.regOk === false){
            return (
                <div className="alert alert-danger" role="alert">
                    Registering <strong>failed</strong>!
                </div>)
        }
    }

    render() {
        return (
            <div className="Login">
                <div className="login text-center">

                    <div className="loginOther">
                        <div className="form-signin ">
                            <h1>RENTALIX</h1>
                            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                            <label htmlFor="inputUsernameLog" className="sr-only">Username</label>
                            <input type="text" id="inputUsernameLog" onChange={this.handleChange}
                                   className="form-control my-1 py-3" placeholder="Username"
                                   required
                                   autoFocus/>
                            <label htmlFor="inputPasswordLog" className="sr-only">Password</label>
                            <input type="password" id="inputPasswordLog" onChange={this.handleChange}
                                   className="form-control my-1 py-3" placeholder="Password"
                                   required/>
                            <button className="btn btn-lg btn-primary btn-block" type="button"
                                    onClick={() => {
                                        this.Auth.login(this.state.inputUsernameLog, this.state.inputPasswordLog)
                                            .then(() => {this.props.history.push("/main");})
                                            .catch((err)=>console.log(err))}}>Sign in
                            </button>

                            <button type="button" className="btn btn-link" data-toggle="modal"
                                    data-target="#register">
                                Register
                            </button><br/>
                            {this.displayRegTip()}
                        </div>

                        <div className="modal fade" id="register" tabIndex="-1" role="dialog"
                             aria-labelledby="registerCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">

                                    <div className="modal-header">
                                        <h2 className="modal-title" id="registerLongTitle">Register</h2>
                                        <button type="button" className="close" data-dismiss="modal"
                                                aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body px-5">

                                        <label htmlFor="inputUsernameReg" className="sr-only">Username</label>
                                        <input type="text" id="inputUsernameReg" onChange={this.handleChange}
                                               onBlur={this.checkUsername} className="form-control my-1 py-3"
                                               placeholder="Username"
                                               required
                                               autoFocus/>
                                        {this.state.usernameAvailable?"":<UsernameTaken/>}
                                        {this.state.usernameLength ? "" : <UsernameLength/>}

                                        <label htmlFor="inputPasswordReg" className="sr-only">Password</label>
                                        <input type="password" id="inputPasswordReg" onChange={this.handleChange}
                                               onBlur={this.state.pwdCheckedOnce ? this.checkPwdMatch : () => {
                                               }} className="form-control my-1 py-3" placeholder="Password"
                                               required/>
                                        <label htmlFor="inputPasswordConfReg" className="sr-only">Password
                                            confirmation</label>
                                        <input type="password" id="inputPasswordConfReg"
                                               onChange={this.handleChange} onBlur={this.checkPwdMatch}
                                               className="form-control my-1 py-3"
                                               placeholder="Password confirmation"
                                               required/>
                                        {this.state.pwdMatch || !this.state.pwdCheckedOnce ? "" : <PwdTip/>}
                                    </div>
                                    <div className="modal-footer px-5 pb-5">
                                        <button type="button" className="btn btn-secondary"
                                                data-dismiss="modal">Close
                                        </button>
                                        <button type="button"
                                                onClick={()=>this.Auth.register(this.state.inputUsernameReg, this.state.inputPasswordReg, this.state.inputPasswordConfReg)
                                                    .then(()=>{this.setState({regOk:true})})
                                                    .catch(()=>{this.setState({regOk:false})})}
                                                data-dismiss="modal" className="btn btn-success">Register
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const UsernameTaken = () => {
    return (
        <div id="usernameTaken" className="">
            <small id="usernameHelp" className="text-danger">
                Username is all ready taken!
            </small>
        </div>
    );
};

const UsernameLength = () => {
    return (
        <div id="usernameLength" className="">
            <small id="usernameHelp" className="text-danger">
                Username must be longer than three characters!
            </small>
        </div>
    );
};


class PwdTip extends Component { // Is shown IF password does not meet the minimum requirements.
    render() {
        return (
            <div id="pwdTip" className="">
                <small id="passwordHelp" className="text-danger">
                    Passwords must be 4-30 long and they have to match!
                </small>
            </div>
        );
    };
}
