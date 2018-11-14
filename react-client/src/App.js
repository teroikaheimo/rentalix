import React, {Component} from 'react';
import './App.css';

class App extends Component {

    render() {
        return (
            <div>
                <Login/>
            </div>
        );
    }
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputUsernameLog: "",
            inputPasswordLog: "",
            inputUsernameReg: "",
            inputPasswordReg: "",
            inputPasswordConfReg: "",
            pwdMatch: true,
            usernameAvailable: true,
            usernameLengthOk: true,
            regOk: false
        };

        this.checkAvailable = this.checkAvailable.bind(this);
        this.checkPwdMatch = this.checkPwdMatch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }


    checkAvailable() {
        console.log("checking");
        if (this.state.inputUsernameReg.length > 3) {
            this.setState({usernameLengthOk: true});
            fetch("/register/available", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.inputUsernameReg
                }),
            }).then(result => {
                    if (result.ok) {
                        this.setState({usernameAvailable: true})
                    } else {
                        this.setState({usernameAvailable: false})
                    }
                })
                .catch(err => console.log(err));
        } else {this.setState({usernameLengthOk: false})}
    }

    checkPwdMatch() {
        this.setState({pwdCheckedOnce: true});
        if (this.state.inputPasswordReg === this.state.inputPasswordConfReg && this.state.inputPasswordReg.length > 3 && this.state.inputPasswordReg.length < 30) {
            this.setState({pwdMatch: true})
        } else {
            this.setState({pwdMatch: false})
        }
    };

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    registerUser() {
        if (this.state.usernameAvailable && this.state.usernameLengthOk && this.state.pwdMatch) {
            console.log("REgistering : "+this.state.inputUsernameReg+" pwd: "+this.state.inputPasswordReg);
            fetch("/register/", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.inputUsernameReg,
                    password: this.state.inputPasswordReg
                }),
            })
                .then(result => {
                    if (result.ok) {
                        this.setState({regOk: true})
                    } else {
                        this.setState({regOk: false})
                    }
                })
                .catch(err => console.log(err));
        }
    }

    render() {
        const pwdMatch = this.state.pwdMatch;
        const pwdCheckedOnce = this.state.pwdCheckedOnce;
        const usernameAvailable = this.state.usernameAvailable;
        const usernameLengthOk = this.state.usernameLengthOk;
        const usernameCheckedOnce = this.state.usernameCheckedOnce;
        return (
            <div className="Login">
                <div className="login text-center">
                    <div className="loginOther">
                        <form className="form-signin ">
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
                            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>

                            <button type="button" className="btn btn-link" data-toggle="modal"
                                    data-target="#register">
                                Register
                            </button>
                        </form>


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
                                               onBlur={this.checkAvailable} className="form-control my-1 py-3"
                                               placeholder="Username"
                                               required
                                               autoFocus/>
                                        {usernameLengthOk && usernameAvailable ? "" :
                                            <UsernameTip available={usernameAvailable} lok={usernameLengthOk}/>}
                                        <label htmlFor="inputPasswordReg" className="sr-only">Password</label>
                                        <input type="password" id="inputPasswordReg" onChange={this.handleChange}
                                               onBlur={pwdCheckedOnce ? this.checkPwdMatch : () => {
                                               }} className="form-control my-1 py-3" placeholder="Password"
                                               required/>
                                        <label htmlFor="inputPasswordConfReg" className="sr-only">Password
                                            confirmation</label>
                                        <input type="password" id="inputPasswordConfReg"
                                               onChange={this.handleChange} onBlur={this.checkPwdMatch}
                                               className="form-control my-1 py-3"
                                               placeholder="Password confirmation"
                                               required/>
                                        {pwdMatch ? "" : <PwdTip/>}
                                    </div>
                                    <div className="modal-footer px-5 pb-5">
                                        <button type="button" className="btn btn-secondary"
                                                data-dismiss="modal">Close
                                        </button>
                                        <button type="button" onClick={this.registerUser}
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


class UsernameTip extends Component {
    constructor(props) {
        super(props);
        this.state = {available: props.available, lok: props.lok}
    }

    render() {
        const available = this.state.available;
        const lok = this.state.lok;
        console.log(available + " & " + lok);
        if (!available && !lok) {
            return (
                <div id="usernameTip" className="">
                    <small id="usernameHelp" className="text-danger">
                        Username is all ready taken and is too short(>3)!
                    </small>
                </div>
            );
        } else if (!available) {
            return (
                <div id="usernameTip" className="">
                    <small id="usernameHelp" className="text-danger">
                        Username is all ready taken!
                    </small>
                </div>
            );
        } else if (!lok) {
            return (
                <div id="usernameTip" className="">
                    <small id="usernameHelp" className="text-danger">
                        Username is too short(>3)!
                    </small>
                </div>
            );
        } else {
            return (null);
        }
    };
}

class PwdTip extends Component {

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

class Registeration extends Component {

    render() {
        return (
            <div className={Registeration}>

            </div>
        );
    };
}

export default App;
