import React, {Component} from 'react';
import {
    Collapse,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
// Components
import ItemTable from './ItemTable';
import ItemModal from './ItemModal';
import DbAction from "../DbAction";

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
            inputAddressDd:"",
            inputOwnerDd:"",
            inputCategoryDd:"",
            dropdownData: {},
            searchData:{
                name: "",
                brand: "",
                model: "",
                address:"",
                owner:"",
                category:""
            }
        };

        this.onChangeModalRemote = this.onChangeModalRemote.bind(this);
        this.onChangeModal = this.onChangeModal.bind(this);
        this.onItemChange = this.onItemChange.bind(this);
        this.onItemChangeRemote = this.onItemChangeRemote.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.updateDropdowns = this.updateDropdowns.bind(this);
    }

    componentWillMount() {
        this.updateDropdowns();
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
        this.updateDropdowns();
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
        this.setState( {
            [event.target.id]: event.target.value
        });
    };



    updateDropdowns() {
        const savedResult = {};
        DbAction.getDropdownInfo()
            .then((result) => {
                savedResult.owner = result.owner.map((inputRowData, index) =>
                    <OptionRow key={index} rowData={inputRowData.owner}/>);

                savedResult.address = result.address.map((inputRowData, index) =>
                    <OptionRow key={index} rowData={inputRowData.address}/>);

                savedResult.category = result.category.map((inputRowData, index) =>
                    <OptionRow key={index} rowData={inputRowData.category}/>);
            }).then(()=>{
                this.setState({
                    dropdownData: savedResult
                })
        })
            .catch();


    }

    render() {
        return (
            <div className="MainPage">

                <div>
                    <Navbar color="" dark>
                        <NavbarBrand href="/" className="mr-auto">Welcome to
                            RENTALIX {this.props.auth.username}</NavbarBrand>
                        <img src="./search.png" alt="" onClick={this.toggleNavbar}/>
                        <UncontrolledButtonDropdown>
                            <DropdownToggle>
                                <img src="./menu32.png" alt="Menu"/>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem header>Menu</DropdownItem>
                                <DropdownItem onClick={() => {this.onChangeModalRemote("-", true)}}>Add item</DropdownItem>
                                <DropdownItem onClick={() => this.logout()}>Logout</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                        <Collapse isOpen={!this.state.collapsed} navbar>


                            <Nav navbar>
                                <NavItem>

                                    <form>
                                        <div className="form-row">

                                            <div className="form-group col-md-4">
                                                <input type="text" className="form-control" id="inputName"
                                                       placeholder="Name" onChange={this.handleChange}
                                                       value={this.state.inputName} required/>
                                            </div>

                                            <div className="form-group col-md-4">
                                                <input type="text" className="form-control" id="inputBrand"
                                                       placeholder="Brand" onChange={this.handleChange}
                                                       value={this.state.inputBrand}/>
                                            </div>

                                            <div className="form-group col-md-4">
                                                <input type="text" className="form-control" id="inputModel"
                                                       placeholder="Model" onChange={this.handleChange}
                                                       value={this.state.inputModel}/>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group col-md-4">
                                                <select onChange={this.handleChange} value={this.state.inputAddressDd} id="inputAddressDd" className="form-control">
                                                    <option value="">Location</option>
                                                    {this.state.dropdownData.address}
                                                </select>
                                            </div>

                                            <div className="form-group col-md-4">
                                                <select onChange={this.handleChange} value={this.state.inputOwnerDd} id="inputOwnerDd" className="form-control">
                                                    <option value="">Owner</option>
                                                    {this.state.dropdownData.owner}
                                                </select>
                                            </div>

                                            <div className="form-group col-md-4">
                                                <select onChange={this.handleChange} value={this.state.inputCategoryDd} id="inputCategoryDd" className="form-control">
                                                    <option value="">Category</option>
                                                    {this.state.dropdownData.category}
                                                </select>
                                            </div>
                                        </div>
                                    </form>

                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>

                <ItemTable searchName={this.state.inputName}
                           searchBrand={this.state.inputBrand}
                           searchModel={this.state.inputModel}
                           searchAddress={this.state.inputAddressDd}
                           searchOwner={this.state.inputOwnerDd}
                           searchCategory={this.state.inputCategoryDd}
                           toggleModalRemote={this.onChangeModalRemote}
                           onItemChange={this.onItemChange}
                           onItemChangeRemote={this.onItemChangeRemote}/>
                <ItemModal updateDropdowns={this.updateDropdowns} dropdownData={this.state.dropdownData} toggleModal={this.onChangeModal} auth={this.props.auth}
                           onItemChangeRemote={this.onItemChangeRemote}/>
            </div>
        );
    }
}


export class OptionRow extends Component {
    render() {
        return (
            <option value={this.props.rowData}>{this.props.rowData}</option>
        )
    }
}

export default MainPage;