import {Component} from "react";
import React from "react";
import DbAction from "../DbAction";
import {Button, Modal, ModalHeader, ModalBody} from 'reactstrap';

class ItemModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            inputName: "",
            inputBrand: "",
            inputModel: "",
            inputAddress: "",
            inputCategory: "",
            inputOwner: "",
            inputCategoryDd: "",
            inputAddressDd: "",
            inputOwnerDd: "",
            modal: false,
            backdrop: true,
            addMode: false,
            modalHeader:"",
            justView:false.valueOf(),
            hideDate:false,
            reserved:false,
            inputReservationStartDate:'',
            inputReservationEndDate:'',
            inputRentStartDate:'',
            inputRentEndDate:'',
            rented:false
        };
        this.onChangeState();
        this.toggle = this.toggle.bind(this);
        this.updateInfo = this.updateInfo.bind(this);
        this.addItem = this.addItem.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
    }

    onChangeState() {
        this.props.toggleModal(this.toggle.bind(this));
    }

    toggle(obj) {
        new Promise((resolve) => {
            let header = "";
            if(typeof obj !== "undefined" && obj.addMode){
                header="Add new item: ";
            }else if(typeof obj !== "undefined" && obj.rentView){
                header="Rent info for item: ";
            }else if(typeof obj !== "undefined" && obj.reserveView){
                header="Reserve item: ";
            }
            else if(typeof obj !== "undefined" && obj.justView){
                header="Viewing item: "
            }
            else{
                header= "Editing item: "
            }
            if(typeof obj !== "undefined"){
                this.setState({
                    id: obj.id || "",
                    modal: !this.state.modal,
                    addMode: (typeof obj.addMode !== "undefined") && obj.addMode || false,
                    justView:obj.justView || false,
                    modalHeader:header,
                    rentView: obj.rentView || false,
                    reserveView: obj.reserveView || false,
                    rent_id:obj.rent_id ||""
                });
            }
            resolve();
        }).then(() => {
            if (this.state.modal) {
                this.updateInfo();
            }
        }).then(() => {
            if (!this.state.addMode && this.state.inputName.length > 0) { // Clear the form data IF item details are viewed between add sessions.
                this.setState({
                    inputName: "",
                    inputBrand: "",
                    inputModel: "",
                    inputInfo: "",
                    inputAddress: "",
                    inputOwner: "",
                    inputCategory: "",
                    inputAddressDd: "",
                    inputOwnerDd: "",
                    inputCategoryDd: ""
                })
            }
        }).catch((err) => {
            console.log(err)
        });
    }

    handleChange = event => { // Writes changes in the input elements to corresponding state.
        this.setState({
            [event.target.id]: event.target.value
        });
    };


    updateInfo() {
        if (this.state.id !== "-") {
            DbAction.getItems(this.state.id)
                .then((result) => {
                    this.setState({
                        inputName: result[0].name || "",
                        inputBrand: result[0].brand || "",
                        inputModel: result[0].model || "",
                        inputInfo: result[0].info || "",
                        inputAddress: "",
                        inputOwner: "",
                        inputCategory: "",
                        inputAddressDd: result[0].address || "",
                        inputOwnerDd: result[0].owner || "",
                        inputCategoryDd: result[0].category || "",
                    });
                    console.log(result)
                }).catch(() => {
                console.log("Failed to get item information for modal")
            });
        }

    }

    saveChanges() {
        this.checkInput()
            .then((inputOrDd) => {
                DbAction.modifyItem(
                    this.state.id,
                    this.state.inputName,
                    this.state.inputBrand,
                    this.state.inputModel,
                    this.state.inputInfo,
                    inputOrDd.address,
                    inputOrDd.owner,
                    inputOrDd.category)
                    .then(() => {
                        this.toggle({id:this.state.id})
                    })
                    .then(() => {
                        this.props.onItemChangeRemote()
                    })
                    .catch(() => {
                        console.log("Something failed in saveChanges()");
                    })
            });
    }

    saveChangesRentView() {
                DbAction.rentItem(
                    this.state.id,
                    this.state.inputRentStartDate,
                    this.state.inputRentEndDate)
                    .then(() => {
                        this.toggle({id:this.state.id})
                    })
                    .then(() => {
                        this.props.onItemChangeRemote()
                    })
                    .catch(() => {
                        console.log("Something failed in saveChangesRentView()");
                    })

    }

    validateInput(){
        let noErrors = true;
        if(this.state.inputName === ""){noErrors=false}
        if(this.state.inputOwner === "" && this.state.inputOwnerDd === ""){noErrors=false}
        if(this.state.inputAddress === "" && this.state.inputAddressDd === ""){noErrors=false}
        return noErrors;
    }

    addItem() {
        if(this.validateInput()){
            this.checkInput()
                .then((inputOrDd) => {
                    DbAction.insertItem(
                        this.state.inputName,
                        this.state.inputBrand,
                        this.state.inputModel,
                        this.state.inputInfo,
                        inputOrDd.address,
                        inputOrDd.owner,
                        inputOrDd.category)
                        .then(() => {
                            this.toggle({id:this.state.id})
                        })
                        .then(() => {
                            this.props.onItemChangeRemote()
                        })
                        .catch((err) => {
                            console.log("Something failed in addItem() "+err);
                        })
                });
        }
    }

    checkInput() { // IF user has typed a value in ANY of the Add New fields. It will override the dropdown value.
        return new Promise((resolve) => {
            const inputOrDd = {};

            if(this.state.inputAddress !== ""){
                inputOrDd.address = this.state.inputAddress;
            }else if(this.state.inputAddressDd !== ""){
                inputOrDd.address = this.state.inputAddressDd;
            }else{
                inputOrDd.address = null;
            }

            if(this.state.inputCategory !== ""){
                inputOrDd.category = this.state.inputCategory;
            }else if(this.state.inputCategoryDd !== ""){
                inputOrDd.category = this.state.inputCategoryDd;
            }else{
                inputOrDd.category = null;
            }

            if(this.state.inputOwner !== ""){
                inputOrDd.owner = this.state.inputOwner;
            }else if(this.state.inputOwnerDd !== ""){
                inputOrDd.owner = this.state.inputOwnerDd;
            }else{
                inputOrDd.owner = null;
            }

            resolve(inputOrDd);
        });
    }

    adminButtons() {

        if(this.state.rentView){
            return(
                <Button color={"success"} onClick={this.saveChangesRentView}>Rent item</Button>
            );
        }else{
            return (
                <Button color={"success"} onClick={this.saveChanges}>Save changes</Button>
            );
        }
    }

    addModeBtn() {
        return (
            <Button color={"success"} onClick={this.addItem}>Add new</Button>
        );
    }

    userButtons() {
        return (
            <Button color={"secondary"} onClick={this.saveChanges}>Close</Button>
        );
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={() => {
                    this.toggle({})
                }} className={this.props.className}>
                    <ModalHeader toggle={() => {
                        this.toggle({})
                    }}>{this.state.modalHeader}{this.state.id}</ModalHeader>

                    <ModalBody className="modal-body">
                        <form>
                            <div className="form-row" hidden={!this.state.reserveView && !this.state.rentView}>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputReservationStartDate">Reservation Start Date</label>
                                    <input type="date" className="form-control" id="inputReservationStartDate"
                                           onChange={this.handleChange}
                                           value={this.state.inputReservationStartDate} disabled={this.state.rented} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputReservationEndDate">Reservation End Date</label>
                                    <input type="date" className="form-control" id="inputReservationEndDate"
                                           onChange={this.handleChange}
                                           value={this.state.inputReservationEndDate} disabled={this.state.rented}/>
                                </div>
                            </div>
                            <div className="form-row" hidden={!this.state.rentView}>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputRentStartDate">Rent Start Date</label>
                                    <input type="date" className="form-control" id="inputRentStartDate"
                                           onChange={this.handleChange}
                                           value={this.state.inputRentStartDate} disabled={ !this.props.auth.admin} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputRentEndDate">Rent End Date</label>
                                    <input type="date" className="form-control" id="inputRentEndDate"
                                           onChange={this.handleChange}
                                           value={this.state.inputRentEndDate} disabled={!this.props.auth.admin}/>
                                </div>
                            </div>


                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="inputName">Name</label>
                                    <input type="text" className="form-control" id="inputName"
                                           placeholder="Name" onChange={this.handleChange}
                                           value={this.state.inputName} disabled={this.state.justView} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="inputBrand">Brand</label>
                                    <input type="text" className="form-control" id="inputBrand"
                                           placeholder="Brand" onChange={this.handleChange}
                                           value={this.state.inputBrand} disabled={this.state.justView}/>
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="inputModel">Model</label>
                                    <input type="text" className="form-control" id="inputModel"
                                           placeholder="Model" onChange={this.handleChange}
                                           value={this.state.inputModel} disabled={this.state.justView}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputInfo">Info</label>
                                <textarea className="form-control" id="inputInfo"
                                          placeholder="Short description..." onChange={this.handleChange}
                                          value={this.state.inputInfo} disabled={this.state.justView}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="inputAddress">Add new address</label>
                                <input value={this.state.inputAddress} type="text" className="form-control" id="inputAddress"
                                       placeholder="Address" onChange={this.handleChange}
                                        disabled={this.state.justView}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="inputAddressDd">OR Choose address</label>
                                <select value={!this.props.addMode&&this.state.inputAddressDd} onChange={this.handleChange}
                                        id="inputAddressDd" className="form-control" disabled={this.state.justView}>
                                    <option value="">Address</option>
                                    {this.props.dropdownData.address}
                                </select>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-5">
                                    <label htmlFor="inputOwner">Add new owner</label>
                                    <input value={this.state.inputOwner} type="text" className="form-control" id="inputOwner"
                                           onChange={this.handleChange}  disabled={this.state.justView}/>
                                </div>
                                <div className="form-group col-md-2">
                                    <p>OR</p>
                                </div>
                                <div className="form-group col-md-5">
                                    <label htmlFor="inputOwnerDd">Choose owner</label>
                                    <select value={!this.props.addMode?this.state.inputOwnerDd:""} onChange={this.handleChange}
                                            id="inputOwnerDd" className="form-control" disabled={this.state.justView}>
                                        <option value="">Owner</option>
                                        {this.props.dropdownData.owner}
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-5">
                                    <label htmlFor="inputCategory">Add new category</label>
                                    <input value={this.state.inputCategory} type="text" className="form-control" id="inputCategory"
                                           onChange={this.handleChange} disabled={this.state.justView}/>
                                </div>
                                <div className="form-group col-md-2">
                                    <p>OR</p>
                                </div>
                                <div className="form-group col-md-5">
                                    <label htmlFor="inputCategoryDd">Choose category</label>
                                    <select value={!this.props.addMode&&this.state.inputCategoryDd} onChange={this.handleChange}
                                            id="inputCategoryDd" className="form-control" disabled={this.state.justView}>
                                        <option value="">Category</option>
                                        {this.props.dropdownData.category}
                                    </select>
                                </div>
                            </div>
                            {(this.props.auth.admin && this.state.addMode) ? this.addModeBtn() : ""}
                            {(this.props.auth.admin && !this.state.addMode) && this.adminButtons()}
                            {!this.props.auth.admin && this.userButtons()}
                        </form>
                    </ModalBody>

                </Modal>
            </div>
        )
    }
}



export default ItemModal;

