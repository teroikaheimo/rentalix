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

    deleteReservation() {
        if (typeof this.props.rowData.id !== "undefined") {
            DbAction.reservationDelete(this.props.rowData.id)
                .then(() => {
                    this.props.onItemChangeRemote()
                })
        }
    }

    returnRent() {
        if (typeof this.props.rowData.id !== "undefined") {
            DbAction.rentReturn(this.props.rowData.id)
                .then(() => {
                    this.props.onItemChangeRemote()
                })
        }
    }

    returnRentReserved() {
        if (typeof this.props.rowData.id !== "undefined") {
            DbAction.rentReturnReserved(this.props.rowData.id)
                .then(() => {
                    this.props.onItemChangeRemote()
                })
        }
    }

    isInHistory(data) {
        let endDate;
        if (data.end_date === null) {
            endDate = new Date(data.reservation_end);
            endDate = endDate.setHours(endDate.getHours() + (endDate.getTimezoneOffset() / 60)); // -2h
            if (endDate < new Date(Date.now())) {
                return true;
            } else {
                return false;
            }
        } else {
            endDate = new Date(data.end_date);
            endDate = endDate.setHours(endDate.getHours() + (endDate.getTimezoneOffset() / 60)); // -2h
            if (endDate < new Date(Date.now())) {
                return true;
            } else {
                return false;
            }
        }
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
                                    id: this.props.id,
                                    justView: true,
                                    rentView: true,
                                    rowData: this.props.rowData,
                                    rent_id: this.props.rent_id
                                });
                            }}>View
                            </button>
                            <div hidden={this.isInHistory(this.props.rowData)}>
                                <button className={"dropdown-item"} type="button" onClick={() => {
                                    this.props.toggleModalRemote({
                                        id: this.props.id,
                                        addMode: false,
                                        rentView: true,
                                        rowData: this.props.rowData,
                                        rent_id: this.props.rent_id
                                    });
                                }}>Modify / Rent
                                </button>

                                {this.props.rowData.start_date !== null ?
                                    <button className={"dropdown-item"} type="button" onClick={() => {
                                        this.returnRentReserved()
                                    }}>Return to Reserved</button> : ""}

                                {this.props.rowData.start_date !== null ?
                                    <button className={"dropdown-item"} type="button" onClick={() => {
                                        this.returnRent()
                                    }}>Return to Stock</button> : ""}

                                {this.props.rowData.start_date === null ?
                                    <button className={"dropdown-item"} type="button" onClick={() => {
                                        this.deleteReservation()
                                    }}>Return to Stock</button> : ""}
                            </div>
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
                                    id: this.props.id,
                                    addMode: false,
                                    justView: true,
                                    reserveView: true,
                                    rowData: this.props.rowData
                                });
                            }}>View
                            </button>

                            <button className={"dropdown-item"} type="button" onClick={() => {
                                this.props.toggleModalRemote({id: this.props.id, reserveView: true});
                            }}>Modify / Reserve
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
                            <div hidden={!this.isInHistory(this.props.rowData)}>
                                <button className={"dropdown-item"} type="button" onClick={() => {
                                    this.props.toggleModalRemote({
                                        id: this.props.id,
                                        rentView: true,
                                        rowData: this.props.rowData,
                                        rent_id: this.props.rent_id,
                                    });
                                }}>View
                                </button>
                            </div>
                            <div hidden={this.isInHistory(this.props.rowData)}>
                                <button className={"dropdown-item"} type="button" onClick={() => {
                                    this.props.toggleModalRemote({
                                        id: this.props.id,
                                        rentView: true,
                                        rowData: this.props.rowData,
                                        rent_id: this.props.rent_id
                                    })
                                }}>Change
                                </button>
                                <button className={"dropdown-item"} type="button" onClick={() => {
                                    this.deleteReservation()
                                }}>Remove Reservation
                                </button>
                            </div>
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
                                    id: this.props.id,
                                    justView: true,
                                    rowData: this.props.rowData
                                });
                            }}>View
                            </button>
                            <button className={"dropdown-item"} type="button" onClick={() => {
                                this.props.toggleModalRemote({
                                    id: this.props.id,
                                    reserveView: true,
                                    rowData: this.props.rowData
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