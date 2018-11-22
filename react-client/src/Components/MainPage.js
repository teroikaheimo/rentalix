import React, {Component} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Form,
    FormGroup,
    UncontrolledDropdown,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem, Button, Dropdown
} from 'reactstrap';
import Auth from '../Auth'
// Components
import ItemTable from './ItemTable';
import ItemModal from './ItemModal';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            toggleModalFunc: () => {
            },
            updateRowsFunc: () => {
            },
            isOpen: false,
            collapsed: true,
            inputName: "",
            inputBrand: "",
            inputModel: "",
            inputInfo: "",
            inputAddressDd: [],
            inputOwnerDd: [],
            inputCategoryDd:[]
        };

        this.onChangeModalRemote = this.onChangeModalRemote.bind(this);
        this.onChangeModal = this.onChangeModal.bind(this);
        this.onItemChange = this.onItemChange.bind(this);
        this.onItemChangeRemote = this.onItemChangeRemote.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggleNavbar = this.toggleNavbar.bind(this);
    }

    onChangeModalRemote(id, addMode) { // Passed to children that want to toggle modal.
        this.state.toggleModalFunc(id, addMode);
    };

    onChangeModal(toggleModalFunc) { // Passed to modal component. Modal calls this function in its constructor and passes the Toggle func as parameter.
        this.setState({
            toggleModalFunc: toggleModalFunc
        })
    }

    onItemChangeRemote() {
        console.log("Item change remote");
        this.state.updateRowsFunc();
    }

    onItemChange(updateRowsFunc) {
        this.setState({
            updateRowsFunc: updateRowsFunc
        })
    }

    logout() {
        this.props.logout();
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    handleChange = event => { // Writes changes in the input elements to corresponding state.
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    render() {
        return (
            <div className="MainPage">

                <div>
                    <Navbar color="" dark>
                        <NavbarBrand href="/" className="mr-auto">Welcome to RENTALIX {this.props.auth.username}</NavbarBrand>
                        <img src="./search.png" alt="" onClick={this.toggleNavbar}/>
                        <UncontrolledButtonDropdown>
                            <DropdownToggle>
                                <img src="./menu32.png" alt="Menu"/>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem header>Menu</DropdownItem>
                                <DropdownItem><Button color={"primary"} onClick={() => {
                                    this.onChangeModalRemote("-", true)
                                }}>Add item
                                </Button></DropdownItem>
                                <DropdownItem><Button color={"success"} type="button" onClick={() => this.logout()}>Logout</Button></DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                        <Collapse isOpen={!this.state.collapsed} navbar>


                            <Nav navbar>
                                <NavItem>

                                    <form>
                                        <div className="form-row">
                                            <div className="form-group col-md-4">
                                                <label htmlFor="inputName">Name</label>
                                                <input type="text" className="form-control" id="inputName"
                                                       placeholder="Name" onChange={this.handleChange}
                                                       value={this.state.inputName} required/>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="inputBrand">Brand</label>
                                                <input type="text" className="form-control" id="inputBrand"
                                                       placeholder="Brand" onChange={this.handleChange}
                                                       value={this.state.inputBrand}/>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="inputModel">Model</label>
                                                <input type="text" className="form-control" id="inputModel"
                                                       placeholder="Model" onChange={this.handleChange}
                                                       value={this.state.inputModel}/>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                        <div className="form-group col-md-4">
                                                <label htmlFor="inputAddressDd">Choose location</label>
                                                <select id="inputAddressDd" className="form-control">
                                                    <option value={"-1"}>Location</option>
                                                    <option>...</option>
                                                </select>
                                            </div>


                                            <div className="form-group col-md-4">
                                                <label htmlFor="inputOwnerDd">Choose owner</label>
                                                <select id="inputOwnerDd" className="form-control">
                                                    <option value={"-1"}>Owner</option>
                                                    <option>...</option>
                                                </select>
                                            </div>

                                            <div className="form-group col-md-4">
                                                <label htmlFor="inputCategoryDd">Choose category</label>
                                                <select id="inputCategoryDd" className="form-control">
                                                    <option value={"-1"}>Category</option>
                                                    <option>...</option>
                                                </select>
                                            </div>
                                        </div>
                                    </form>

                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>

                <ItemTable toggleModalRemote={this.onChangeModalRemote} onItemChange={this.onItemChange}
                           onItemChangeRemote={this.onItemChangeRemote}/>
                <ItemModal toggleModal={this.onChangeModal} auth={this.props.auth}
                           onItemChangeRemote={this.onItemChangeRemote}/>
            </div>
        );
    }
}

export default MainPage;