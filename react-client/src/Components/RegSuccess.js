import React, {Component} from 'react';

export class RegSuccess extends Component {
    render() {

        return (
            <div className="RegSuccess">
                <div className="alert alert-success alert-dismissible fade in">
                    <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                    <strong>Success!</strong> Registering a new account was a success! Please login.
                </div>
            </div>
        );

    }
}