import {Component} from "react";
import React from "react";
import DbAction from "../DbAction";


export default class ItemModal extends Component {
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
            inputAddressDd: [],
            inputOwnerDd: []
        }
    }

    handleChange = event => { // Writes changes in the input elements to corresponding state.
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    componentWillMount() {
        DbAction.getItemToModify()
            .then((result)=>{this.setState({id:result})})
            .then(()=>{
                DbAction.getItems(this.state.id)
                    .then((result) => {
                        this.setState({
                            id: result.id || "",
                            inputName: result.name || "",
                            inputBrand: result.brand || "",
                            inputModel: result.model || "",
                            inputInfo: result.itemInfo || "",
                            inputAddress: result.address || "",
                            inputOwner: result.owner || "",
                            inputCategory: result.category || "",
                        });
                        console.log(result)
                    }).catch(() => {
                    console.log("Failed to get item information for modal")
                });
            })
            .catch((err)=>{console.log(err)});
    }

    render() {
        return (
            <div className="modal fade" id="ItemModal" tabIndex="-1" role="dialog"
                 aria-labelledby="ItemModalTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ItemModalTitle">{this.props.title+": "+this.state.id}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>


                        <div className="modal-body">
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
                                        <option >Choose...</option>
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
                                            <option >Choose...</option>
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
                        </div>


                        <div className="modal-footer">
                            <button type="button" onClick={() => {
                                DbAction.modifyItem(this.state.inputName, this.state.inputBrand, this.state.inputModel, this.state.inputInfo, this.state.inputAddress, this.state.inputOwner, this.state.inputCategory)
                            }} className="btn btn-primary">Save changes
                            </button>
                            <button type="button" onClick={() => {
                                DbAction.insertItem(this.state.inputName, this.state.inputBrand, this.state.inputModel, this.state.inputInfo, this.state.inputAddress, this.state.inputOwner, this.state.inputCategory)
                            }} className="btn btn-success">Add new item
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

