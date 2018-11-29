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
    DropdownItem,
} from 'reactstrap';
// Components
import ItemTable from './ItemTable';
import ItemModal from './ItemModal';
import DbAction from "../DbAction";
import UserModal from './UserModal'

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
            inputIdNameBrandModel: "",
            inputAddressDd: "",
            inputOwnerDd: "",
            inputCategoryDd: "",
            dropdownData: {},
            updateTableRows: () => {
            },
            toggleUserModal: () => {
            },
            rentView: true
        };

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.updateDropdowns = this.updateDropdowns.bind(this);
        this.toggleRentView = this.toggleRentView.bind(this);

        // Remote triggered functions
        this.onChangeModalGetSet = this.onChangeModalGetSet.bind(this);
        this.onChangeModalRemote = this.onChangeModalRemote.bind(this);
        this.updateTableRowsGetSet = this.updateTableRowsGetSet.bind(this);
        this.onItemChangeRemote = this.onItemChangeRemote.bind(this);
        this.toggleUserModalGetSet = this.toggleUserModalGetSet.bind(this);
        this.toggleUserModalRemote = this.toggleUserModalRemote.bind(this);
    }


    componentWillMount() {
        this.updateDropdowns();
    }

    handleChange = event => { // Writes changes in the input elements to corresponding state.
        this.setState({ // Callback version. Fixes normal setState "lag" that is's basic behaviour!
            [event.target.id]: event.target.value
        }, () => {
            this.updateTableRowsRemoteSearch()
        });
    };

    onChangeModalRemote(obj) { // Passed to children that need to toggle modal.
        this.state.toggleModalFunc(obj);
    };

    onChangeModalGetSet(toggleModalFunc) { // GET/SET toggleModal function from ItemModal. Passed to modal component. Modal calls this function in its constructor and passes the Toggle func as parameter.
        this.setState({
            toggleModalFunc: toggleModalFunc
        })
    }

    onItemChangeRemote() { // Passed to children that need to Update dropdowns and table rows.
        this.updateDropdowns();
        this.state.updateTableRows();
    }


    logout() {
        this.props.logout();
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed,
            inputIdNameBrandModel: "",
            inputAddressDd: "",
            inputOwnerDd: "",
            inputCategoryDd: ""
        }, () => {
            this.updateTableRowsRemote()
        });
    }

    updateTableRowsGetSet(updateTableRowsFunc) { // GET/SET updateTableRowsRemote from ItemTable
        this.setState({updateTableRows: updateTableRowsFunc});
    }

    updateTableRowsRemote() { // Update table rows remotely.
        this.state.updateTableRows("", "", "", "", "", "", "", "");
    }

    updateTableRowsRemoteSearch() { // Update table rows remotely, according to latest search parameters.
        this.state.updateTableRows(this.state.inputIdNameBrandModel, this.state.inputIdNameBrandModel, this.state.inputIdNameBrandModel, this.state.inputIdNameBrandModel, "", this.state.inputAddressDd, this.state.inputOwnerDd, this.state.inputCategoryDd);
    }

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
            }).then(() => {
            this.setState({
                dropdownData: savedResult
            })
        })
            .catch();
    }

    toggleUserModalGetSet(func) {
        this.setState({
            toggleUserModal: func
        });
    }

    toggleUserModalRemote() {
        this.state.toggleUserModal();
    }

    toggleRentView(value) {
        this.setState({
            inputIdNameBrandModel: "",
            inputAddressDd: "",
            inputOwnerDd: "",
            inputCategoryDd: "",
            rentView: value,
            collapsed: true
        }, () => {
            this.updateTableRowsRemote()
        });

    }


    render() {
        return (
            <div className="MainPage">

                <div>
                    <Navbar color="" dark className={"m-0 p-0"}>
                            <div className={"row container-fluid mx-auto"}>
                                <span className="h1 font-weight-bold text-white float-md-left"><img className={"App-logo mx-0 p-0"}
                                                                                      src="./gear64.ico" alt=""/>RENTALIX</span>
                                <div className={" menuItems"}>
                                    <img src="./search.png" alt="" onClick={this.toggleNavbar}/>
                                    <div className="btn-group btn-group-toggle px-1" data-toggle="buttons">
                                        <label className="btn btn-secondary active">
                                            <input type="radio" name="options" id="option1" autoComplete="off"/> <img
                                            src="./rent32.ico" alt="Rent" onClick={() => {
                                            this.toggleRentView(true)
                                        }}/>
                                        </label>
                                        <label className="btn btn-secondary">
                                            <input type="radio" name="options" id="option2" autoComplete="off"/> <img
                                            src="./personalView32.ico" alt="Personal" onClick={() => {
                                            this.toggleRentView(false)
                                        }}/>
                                        </label>
                                    </div>

                                    <UncontrolledButtonDropdown>
                                        <DropdownToggle>
                                            <img src="./menu32.png" alt="Menu"/>
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem header>Menu</DropdownItem>
                                            {this.props.auth.admin ? <DropdownItem onClick={() => {
                                                this.onChangeModalRemote({id: "-", addMode: true})
                                            }}>Add item</DropdownItem> : ""}
                                            <DropdownItem onClick={this.toggleUserModalRemote}>Settings</DropdownItem>
                                            <DropdownItem onClick={() => this.logout()}>Logout</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledButtonDropdown>
                                </div>
                            </div>

                        <Collapse isOpen={!this.state.collapsed} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <form>
                                        <div className="form-row">
                                            <div className="form-group col-md-12">
                                                <input type="text" className="form-control" id="inputIdNameBrandModel"
                                                       placeholder="Search by serial, name, model, brand."
                                                       onChange={this.handleChange}
                                                       value={this.state.inputIdNameBrandModel}/>
                                            </div>
                                        </div>


                                        <div className="form-row">
                                            <div className="form-group col-md-4">
                                                <select onChange={this.handleChange}
                                                        value={this.state.inputAddressDd}
                                                        id="inputAddressDd"
                                                        className="form-control">
                                                    <option value="">Location</option>
                                                    {this.state.dropdownData.address}
                                                </select>
                                            </div>

                                            <div className="form-group col-md-4">
                                                <select onChange={this.handleChange}
                                                        value={this.state.inputOwnerDd}
                                                        id="inputOwnerDd"
                                                        className="form-control">
                                                    <option value="">Owner</option>
                                                    {this.state.dropdownData.owner}
                                                </select>
                                            </div>

                                            <div className="form-group col-md-4">
                                                <select onChange={this.handleChange}
                                                        value={this.state.inputCategoryDd}
                                                        id="inputCategoryDd"
                                                        className="form-control">
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


                <ItemTable search={{
                    text: this.state.inputIdNameBrandModel,
                    address: this.state.inputAddressDd,
                    owner: this.state.inputOwnerDd,
                    category: this.state.inputCategoryDd
                }}
                           rentView={this.state.rentView}
                           updateTableRowsGetSet={this.updateTableRowsGetSet}
                           toggleModalRemote={this.onChangeModalRemote}
                           onItemChangeRemote={this.onItemChangeRemote}
                           auth={this.props.auth}
                />


                <ItemModal updateDropdowns={this.updateDropdowns}
                           dropdownData={this.state.dropdownData}
                           toggleModal={this.onChangeModalGetSet}
                           auth={this.props.auth}
                           onItemChangeRemote={this.onItemChangeRemote}
                />
                <UserModal toggleUserModalGetSet={this.toggleUserModalGetSet}
                           username={this.props.auth.username}
                />
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