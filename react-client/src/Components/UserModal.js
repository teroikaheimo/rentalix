import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input} from 'reactstrap';
import DbActions from '../DbAction';

class UserModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            userPassword: "",
            userPasswordConf: ""
        };

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
            DbActions.updatePassword()
                .then(() => {
                    this.toggle()
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
        return error;
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>User settings</ModalHeader>
                    <ModalBody>
                        {this.pwdError() && <div className="alert alert-success" role="alert">
                            Registering was <strong>successful!</strong>
                        </div>}
                        <Form>
                            <FormGroup>
                                <Input type="password" name="password" id="userPassword" placeholder="Password"/>
                                <Input type="password" name="password" id="userPasswordConf"
                                       placeholder="Password confirmation"/>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="Success" onClick={this.submitChange}>Save changes</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default UserModal;