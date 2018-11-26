import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input} from 'reactstrap';
import DbActions from '../DbAction';

class UserModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            oldPassword:"",
            userPassword: "",
            userPasswordConf: "",
            wrongPassword:false,
            areCheckedOnce:false
        };

        this.pwdError = this.pwdError.bind(this);
        this.submitChange = this.submitChange.bind(this);
        // Remote triggered functions
        this.toggle = this.toggle.bind(this);
        this.props.toggleUserModalGetSet(this.toggle);
    }

    handleChange = event => { // Writes changes in the input elements to corresponding state.
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    submitChange() {
        if (!this.pwdError()) {
            DbActions.updatePassword(this.props.username,this.state.oldPassword,this.state.userPassword)
                .then((result) => {
                    if(result.success){
                        this.toggle()
                    }else{
                        this.setState({
                            wrongPassword:true
                        })
                    }
                })
                .catch((err) => {
                    console.log(err)
                });
        }
    }

    pwdError() {
        let error = false;
        if (this.state.userPassword !== this.state.userPasswordConf) {
            error = true
        }
        if (this.state.userPassword.length < 4 ) {
            error = true
        }
        return error;
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>User settings</ModalHeader>
                    <ModalBody>
                        {this.state.areCheckedOnce&&this.pwdError()? <div className="alert alert-warning" role="alert">
                            Passwords don't match OR are shorter than four characters.
                        </div>:""}
                        {this.state.wrongPassword && <div className="alert alert-danger" role="alert">
                            Wrong <strong>old</strong> password!
                        </div>}
                        <Form>
                            <FormGroup>
                                <input type="password" id="oldPassword" onChange={this.handleChange}
                                       className="form-control my-1 py-3" placeholder="Old Password"
                                       required
                                       autoFocus/>
                                <input type="password" id="userPassword" onChange={this.handleChange}
                                       className="form-control my-1 py-3" placeholder="New Password"
                                       required/>
                                <input type="password" id="userPasswordConf" onChange={this.handleChange}
                                       className="form-control my-1 py-3" placeholder="New Password Confirmation"
                                       onBlur={()=>this.setState({areCheckedOnce:true})}
                                       required/>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button className={"btn btn-success"} color="Success" onClick={this.submitChange}>Save changes</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default UserModal;