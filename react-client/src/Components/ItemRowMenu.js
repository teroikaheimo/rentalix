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
        endDate = new Date(data.reservation_end);
        endDate = endDate.setHours(endDate.getHours() + (endDate.getTimezoneOffset() / 60)); // -2h
        if (endDate < new Date(Date.now())) {
            return true;
        } else {
            return false;
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
                                    itemInputView: true,
                                    reservationInput: true,
                                    rentInput: true,
                                    rowData: this.props.rowData,
                                    rent_id: this.props.rent_id,
                                    rentView: true

                                });
                            }}>View
                            </button>
                            <div hidden={this.isInHistory(this.props.rowData)}>
                                <button className={"dropdown-item"} type="button" onClick={() => {
                                    this.props.toggleModalRemote({
                                        id: this.props.id,
                                        reservationInput: true,
                                        rentInput: true,
                                        rowData: this.props.rowData,
                                        rent_id: this.props.rent_id,
                                        rentView: true

                                    });
                                }}>Change reservation / Rent
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
                                    itemInputView: true,
                                    rowData: this.props.rowData,
                                    reserveView: true

                                });
                            }}>View
                            </button>

                            <button className={"dropdown-item"} type="button" onClick={() => {
                                this.props.toggleModalRemote({
                                    id: this.props.id,
                                    itemInput: true,
                                    reservationInput: true,
                                    reserveView: true,
                                    rowData: this.props.rowData

                                });
                            }}>Modify Item / Reserve
                            </button>

                            <button className={"dropdown-item"} type="button" onClick={() => {
                                this.deleteRow()
                            }}>Delete
                            </button>

                        </div>
                    </td>
                );
            }
        } else { // USER RENT VIEW MENU
            if (this.props.rentView) {
                return (
                    <td className="dropleft">
                        <img src="./menu32.png" alt="Item menu" data-toggle="dropdown"/>
                        <div className="dropdown-menu">
                            <button id={"View"}
                                hidden={this.props.rowData.end_date === null && !this.isInHistory(this.props.rowData) } className={"dropdown-item"}
                                    type="button" onClick={() => {
                                this.props.toggleModalRemote({
                                    id: this.props.id,
                                    rentInputView: true,
                                    reservationInput: true,
                                    rowData: this.props.rowData,
                                    rent_id: this.props.rent_id,
                                    rentView: true
                                });
                            }}>View
                            </button>
                            <button id={"Change"}
                                hidden={typeof this.props.rowData.start_date !== 'undefined' && this.props.rowData.start_date !== null || this.isInHistory(this.props.rowData)}
                                className={"dropdown-item"} type="button" onClick={() => {
                                this.props.toggleModalRemote({
                                    id: this.props.id,
                                    rentInputView: true,
                                    reservationInput: true,
                                    rowData: this.props.rowData,
                                    rent_id: this.props.rent_id,
                                    rentView: true
                                })
                            }}>Change
                            </button>

                            <button id={"deleteReservation"}
                                hidden={typeof this.props.rowData.start_date !== 'undefined' && this.props.rowData.start_date !== null || this.isInHistory(this.props.rowData)}
                                className={"dropdown-item"} type="button" onClick={() => {
                                this.deleteReservation()
                            }}>Remove Reservation
                            </button>
                        </div>
                    </td>
                );
            } else { // USER RESERVATION VIEW MENU
                return (
                    <td className="dropleft">
                        <img src="./menu32.png" alt="Item menu" data-toggle="dropdown"/>
                        <div className="dropdown-menu">
                            <button className={"dropdown-item"} type="button" onClick={() => {
                                this.props.toggleModalRemote({
                                    id: this.props.id,
                                    itemInputView: true,
                                    rowData: this.props.rowData,
                                    reserveView: true
                                });
                            }}>View
                            </button>
                            <button className={"dropdown-item"} type="button" onClick={() => {
                                this.props.toggleModalRemote({
                                    id: this.props.id,
                                    reservationInput: true,
                                    rowData: this.props.rowData,
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