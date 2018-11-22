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
            inputInfo: "",
            inputAddress: "",
            inputOwner: "",
            inputCategory: "",
            inputCategoryDd:[],
            inputAddressDd: [],
            inputOwnerDd: [],
            modal: false,
            backdrop: true,
            addNew:false
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

    toggle(id,addNew) {
        new Promise((resolve)=>{
            this.setState({
                id: id || "",
                modal: !this.state.modal,
                addNew: addNew || false
            });
            resolve();
        }).then(()=>{
            if(this.state.modal){
                this.updateInfo();
            }
        }).then(()=>{
            if(!this.state.addNew && this.state.inputName.length >0){ // Clear the form data IF item details are viewed between add sessions.
                this.setState({
                    inputName: "",
                    inputBrand: "",
                    inputModel: "",
                    inputInfo: "",
                    inputAddress: "",
                    inputOwner: "",
                    inputCategory: ""
                })
            }
        }).catch((err)=>{console.log(err)});
    }

    handleChange = event => { // Writes changes in the input elements to corresponding state.
        this.setState({
            [event.target.id]: event.target.value
        });
    };


    updateInfo() {
        DbAction.getItems(this.state.id)
            .then((result) => {
                console.log(result[0]);
                this.setState({
                    inputName: result[0].name || "",
                    inputBrand: result[0].brand || "",
                    inputModel: result[0].model || "",
                    inputInfo: result[0].info || "",
                    inputAddress: result[0].address || "",
                    inputOwner: result[0].owner || "",
                    inputCategory: result[0].category || "",
                });
                console.log(result)
            }).catch(() => {
            console.log("Failed to get item information for modal")
        });
    }

    saveChanges(){
        DbAction.modifyItem(
            this.state.id,
            this.state.inputName,
            this.state.inputBrand,
            this.state.inputModel,
            this.state.inputInfo,
            this.state.inputAddress,
            this.state.inputOwner,
            this.state.inputCategory)
            .then(()=>{this.toggle(this.state.id)})
            .then(()=>{this.props.onItemChangeRemote()}) // WONT WORK?
    }

    addItem(){
        DbAction.insertItem(
            this.state.inputName,
            this.state.inputBrand,
            this.state.inputModel,
            this.state.inputInfo,
            this.state.inputAddress,
            this.state.inputOwner,
            this.state.inputCategory)
            .then(()=>{this.toggle(this.state.id)})
            .then(()=>{this.props.onItemChangeRemote()}) // WONT WORK?
    }

adminButtons(){
        return(
            <Button color={"success"} onClick={this.saveChanges}>Save changes</Button>
        );
}
addNewBtn(){
    return(
            <Button color={"success"} onClick={this.addItem}>Add new</Button>
        );
}

userButtons(){
        return(
            <Button color={"secondary"} onClick={this.saveChanges}>Close</Button>
        );
}


    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={()=>{this.toggle()}} className={this.props.className}>
                    <ModalHeader toggle={() => {this.toggle()}}>{this.state.addNew?"Add new item":"Editing item: "+this.state.id}</ModalHeader>

                    <ModalBody className="modal-body">
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
                            <div className="form-group">
                                <label htmlFor="inputInfo">Info</label>
                                <textarea className="form-control" id="inputInfo"
                                          placeholder="Short description..." onChange={this.handleChange}
                                          value={this.state.inputInfo}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="inputAddress">Add new address</label>
                                <input type="text" className="form-control" id="inputAddress"
                                       placeholder="Address" onChange={this.handleChange}
                                       value={this.state.inputAddress} required/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="inputAddressDd">OR Choose address</label>
                                <select id="inputAddressDd" className="form-control">
                                    <option>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-5">
                                    <label htmlFor="inputOwner">Add new owner</label>
                                    <input type="text" className="form-control" id="inputOwner"
                                           onChange={this.handleChange} value={this.state.inputOwner} required/>
                                </div>
                                <div className="form-group col-md-2">
                                    <p>OR</p>
                                </div>
                                <div className="form-group col-md-5">
                                    <label htmlFor="inputOwnerDd">Choose owner</label>
                                    <select id="inputOwnerDd" className="form-control">
                                        <option>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-5">
                                    <label htmlFor="inputCategory">Add new category</label>
                                    <input type="text" className="form-control" id="inputCategory"
                                           onChange={this.handleChange} value={this.state.inputCategory}/>
                                </div>
                                <div className="form-group col-md-2">
                                    <p>OR</p>
                                </div>
                                <div className="form-group col-md-5">
                                    <label htmlFor="inputCategoryDd">Choose category</label>
                                    <select id="inputCategoryDd" className="form-control">
                                        <option defaultValue={"Choose..."}>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </ModalBody>
                    {(this.props.auth.admin&&this.state.addNew)? this.addNewBtn() :""}
                    {(this.props.auth.admin&&!this.state.addNew)&& this.adminButtons()}
                    {!this.props.auth.admin&&this.userButtons()}
                </Modal>
            </div>
        )
    }
}


export default ItemModal;

