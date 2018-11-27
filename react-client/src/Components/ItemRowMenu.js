import {Component} from "react";
import React from "react";
import DbAction from "../DbAction";

export default class ItemsRowMenu extends Component {

    deleteRow() {
        DbAction.deleteItem(this.props.id)
            .then(() => {
                this.props.onItemChangeRemote()
            })
    }

    render() {
        if (this.props.admin) { // ADMIN menus
            if (this.props.rentView) {
                return (
                    <td className="dropleft">
                        <img src="./menu32.png" alt="Item menu" data-toggle="dropdown"/>
                        <div className="dropdown-menu">
                            <button className={"dropdown-item"} type="button" onClick={() => {
                                this.props.toggleModalRemote({
                                    id:this.props.id,
                                    addMode:false,
                                    justView:true,
                                    rentView:true,
                                    rowData:this.props.rowData,
                                    rent_id:this.props.rent_id});
                            }}>Modify
                            </button>
                            <button className={"dropdown-item"} type="button" onClick={() => {
                                this.deleteRow()
                            }}>
                                Delete
                            </button>
                        </div>
                    </td>
                );
            } else {
                return (
                    <td className="dropleft">
                        <img src="./menu32.png" alt="Item menu" data-toggle="dropdown"/>
                        <div className="dropdown-menu">
                            <button className={"dropdown-item"} type="button" onClick={() => {
                                this.props.toggleModalRemote({id:this.props.id});
                            }}>Modify
                            </button>
                            <button className={"dropdown-item"} type="button" onClick={() => {
                                this.deleteRow()
                            }}>
                                Delete
                            </button>
                        </div>
                    </td>
                );
            }
        } else { // USER menus
            if (this.props.rentView) {
                return (
                    <td className="dropleft">
                        <img src="./menu32.png" alt="Item menu" data-toggle="dropdown"/>
                        <div className="dropdown-menu">
                            <button className={"dropdown-item"} type="button" onClick={() => {
                                this.props.toggleModalRemote({
                                    id: this.props.id,
                                    addMode: false,
                                    justView: true,
                                    rentView: true,
                                    reserveView: false,
                                    rowData:this.props.rowData,
                                    rent_id: this.props.rent_id})
                            }}>Change
                            </button>
                        </div>
                    </td>
                );
            } else {
                return (
                    <td className="dropleft">
                        <img src="./menu32.png" alt="Item menu" data-toggle="dropdown"/>
                        <div className="dropdown-menu">
                            <button className={"dropdown-item"} type="button" onClick={() => {
                                    this.props.toggleModalRemote({
                                        id:this.props.id,
                                        addMode:false,
                                        justView:true
                                    });
                            }}>View
                            </button>
                            <button className={"dropdown-item"} type="button" onClick={() => {
                                this.props.toggleModalRemote({
                                    id:this.props.id,
                                    addMode:false,
                                    justView:true,
                                    reserveView: true
                                });
                            }}>Reserve
                            </button>
                        </div>
                    </td>
                );
            }
        }

    }
}