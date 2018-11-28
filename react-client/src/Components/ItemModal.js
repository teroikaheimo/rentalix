import React, {Component} from "react";
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
            inputReservationStartDate: "",
            inputReservationEndDate: "",
            inputReservationStartTime: "",
            inputReservationEndTime: "",
            inputRentStartDate: "",
            inputRentStartTime: "",
            inputRentEndDate: "",
            inputRentEndTime: "",
            modal: false,
            backdrop: true,
            addMode: false,
            modalHeader: "",
            justView: false,
            hideDate: false,
            reserved: false,
            failText: "",
            reservationId: "",
            reservationFail: false,
            reservationModifyFail: false,
            reservationDeleteFail: false,
            rented: false,
            rentFail: false,
            startDate: "",
            newItemFail: false,
            rowData: {},
            dateNow: this.dateNow(),
            timeNow: this.timeNow()

        };

        this.onChangeState();

        this.dateNow = this.dateNow.bind(this);
        this.timeNow = this.timeNow.bind(this);
        this.rentItem = this.rentItem.bind(this);

        this.reservationModify = this.reservationModify.bind(this);
        this.reserveItem = this.reserveItem.bind(this);
        this.toggle = this.toggle.bind(this);
        this.updateInfo = this.updateInfo.bind(this);
        this.addItem = this.addItem.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
    }

    onChangeState() {
        this.props.toggleModal(this.toggle.bind(this));
    }

    resetModal() {
        this.setState({
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
            inputReservationStartDate: "",
            inputReservationEndDate: "",
            inputReservationStartTime: "",
            inputReservationEndTime: "",
            inputRentStartDate: "",
            inputRentStartTime: "",
            inputRentEndDate: "",
            inputRentEndTime: "",
            modal: false,
            backdrop: true,
            addMode: false,
            modalHeader: "",
            justView: false,
            hideDate: false,
            reserved: false,
            reservationId: "",
            reservationFail: false,
            rentFail: false,
            reservationDeleteFail: false,
            rented: false,
            startDate: "",
            newItemFail: false,
            rowData: {},
            isHistory: false

        });
    }

    dateOrTime(want, data) {
        if (want === "date") {
            return data.split('T')[0];
        } else {
            return data.split('T')[1].split('.')[0].slice(0, 5);
        }
    }

    toggle(obj) {
        console.log(obj);
        new Promise((resolve) => {
            let header = "";
            if (typeof obj !== "undefined") {
                if (obj.addMode) {
                    header = "Add new item: ";
                } else if (obj.rentView) {
                    header = "Rent / Reservation info for serial: ";
                } else if (obj.reserveView) {
                    header = "Reserve item: ";
                }
                else if (obj.justView) {
                    header = "Viewing item: "
                }
                else {
                    header = "Editing item: "
                }
            }

            if (typeof obj.rowData !== "undefined") {
                if (obj.rowData.start_date !== null) {
                    let endDate = new Date(obj.rowData.end_date);
                    endDate = endDate.setHours(endDate.getHours() + (endDate.getTimezoneOffset() / 60)); // -2h
                    this.setState({
                        isHistory: new Date(Date.now()) > endDate && true,
                        rented: true,
                        inputRentStartDate: obj.rowData.start_date.split('T')[0],
                        inputRentEndDate: obj.rowData.end_date.split('T')[0],
                        inputRentStartTime: obj.rowData.start_date.split('T')[1].split('.')[0].slice(0, 5),
                        inputRentEndTime: obj.rowData.end_date.split('T')[1].split('.')[0].slice(0, 5),
                        inputReservationStartDate: this.dateOrTime("date", obj.rowData.reservation_start),
                        inputReservationEndDate: this.dateOrTime("date", obj.rowData.reservation_end),
                        inputReservationStartTime: this.dateOrTime("", obj.rowData.reservation_start),
                        inputReservationEndTime: this.dateOrTime("", obj.rowData.reservation_end)
                    },()=>{this.updateInfo()})
                }else{
                    let endDate = new Date(obj.rowData.reservation_end);
                    endDate = endDate.setHours(endDate.getHours() + (endDate.getTimezoneOffset() / 60)); // -2h
                    this.setState({
                        isHistory: new Date(Date.now()) > endDate && true,
                        inputReservationStartDate: this.dateOrTime("date", obj.rowData.reservation_start),
                        inputReservationEndDate: this.dateOrTime("date", obj.rowData.reservation_end),
                        inputReservationStartTime: this.dateOrTime("", obj.rowData.reservation_start),
                        inputReservationEndTime: this.dateOrTime("", obj.rowData.reservation_end)
                    },()=>{this.updateInfo()})
                }


                console.log(obj.rowData);
            } else {
                this.setState({
                    isHistory: false,
                    rented: false,
                    inputReservationStartDate: "",
                    inputReservationEndDate: "",
                    inputReservationStartTime: "",
                    inputReservationEndTime: "",
                    inputRentStartDate: "",
                    inputRentStartTime: "",
                    inputRentEndDate: "",
                    inputRentEndTime: "",
                    failText: "",
                    reservationFail: false,
                    reservationDeleteFail: false,
                    newItemFail: false,
                    rentFail: false,
                },()=>{this.updateInfo()});
            }

            if (typeof obj !== "undefined") {
                console.log(obj.id);
                this.setState({
                    id: obj.id || "-",
                    modal: !this.state.modal,
                    addMode: (typeof obj.addMode !== "undefined") && obj.addMode || false,
                    justView: obj.justView || false,
                    modalHeader: header,
                    rentView: obj.rentView || false,
                    reserveView: obj.reserveView || false,
                    rent_id: obj.rent_id || "",
                    rowData: obj.rowData || {},
                    dateNow: this.dateNow()


                },()=>{this.updateInfo()});
            }
            resolve();
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
                    inputCategoryDd: "",
                    newItemFail: false
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
            console.log("Gettin item data for id: "+this.state.id);
            DbAction.getItem(this.state.id)
                .then((result) => {
                    console.log(result);
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
                })
                .catch((err) => {
                console.log("Failed to get item information for modal: "+err)
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
                        this.toggle({})
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
                this.toggle({})
            })
            .then(() => {
                this.props.onItemChangeRemote()
            })
            .catch(() => {
                console.log("Something failed in saveChangesRentView()");
            })

    }

    validateInput() {
        let noErrors = true;
        if (this.state.inputName === "") {
            noErrors = false
        }
        if (this.state.inputOwner === "" && this.state.inputOwnerDd === "") {
            noErrors = false
        }
        if (this.state.inputAddress === "" && this.state.inputAddressDd === "") {
            noErrors = false
        }
        return noErrors;
    }

    addItem() {
        if (this.validateInput()) {
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
                            this.setState({newItemFail: false});
                            this.toggle({})
                        })
                        .then(() => {
                            this.props.onItemChangeRemote()
                        })
                        .catch((err) => {
                            this.setState({newItemFail: true});
                            console.log("Something failed in addItem() " + err);
                        })
                });
        } else {
            this.setState({newItemFail: true});
        }
    }

    reserveItem() {
        if (this.compareDate(this.state.inputReservationStartDate, this.state.inputReservationEndDate, this.state.inputReservationStartTime, this.state.inputReservationEndTime) > -1 && this.state.inputReservationStartDate !== "" && this.state.inputReservationEndDate !== "" && this.state.inputReservationStartTime !== "" && this.state.inputReservationEndTime !== "") {
            DbAction.reservationInsert(
                this.props.auth.userId,
                this.state.id,
                this.state.inputReservationStartDate + " " + this.state.inputReservationStartTime + ":00",
                this.state.inputReservationEndDate + " " + this.state.inputReservationEndTime + ":00")
                .then((response) => {
                    if (response.success) {
                        this.setState({reservationFail: false});
                        this.toggle({})
                    } else {
                        if (typeof response.row[0] !== "undefined") {
                            this.setState({
                                reservationFail: true,
                                failText: response.message + "          " + this.formatDate(response.row[0].reservation_start) + " <-> " + this.formatDate(response.row[0].reservation_end)
                            });
                        } else {
                            this.setState({
                                reservationFail: true,
                                failText: response.message
                            });
                        }
                    }
                })
                .then(() => {
                    this.props.onItemChangeRemote();
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            this.setState({reservationFail: true});
        }
    }

    reservationModify() {
        if (typeof this.state.rowData.id !== "undefined" && this.state.inputReservationStartDate !== "" && this.state.inputReservationEndDate !== "" && this.state.inputReservationStartTime !== "" && this.state.inputReservationEndTime !== "" && this.compareDate(this.state.inputReservationStartDate, this.state.inputReservationEndDate, this.state.inputReservationStartTime, this.state.inputReservationEndTime) > -1) {
            DbAction.reservationModify(
                this.state.rowData.id,
                this.props.auth.userId,
                this.state.id,
                this.state.inputReservationStartDate + " " + this.state.inputReservationStartTime + ":00",
                this.state.inputReservationEndDate + " " + this.state.inputReservationEndTime + ":00")
                .then((response) => {
                    if (response.success) {
                        this.setState({reservationFail: false});
                        this.toggle({})
                    } else {
                        if (typeof response.row[0] !== "undefined") {
                            this.setState({
                                reservationFail: true,
                                failText: response.message + "          " + this.formatDate(response.row[0].reservation_start) + " <-> " + this.formatDate(response.row[0].reservation_end)
                            });
                        } else {
                            this.setState({
                                reservationFail: true,
                                failText: response.message
                            });
                        }
                    }
                })
                .then(() => {
                    this.props.onItemChangeRemote();
                })
                .catch((err) => {
                    this.setState({reservationFail: true});
                    console.log(err);
                })
        } else {
            this.setState({reservationFail: true});
        }
    }


    rentItem() {
        if (typeof this.state.rowData.id !== "undefined" && this.state.inputRentStartDate !== "" && this.state.inputRentEndDate !== "" && this.state.inputRentStartTime !== "" && this.state.inputRentEndTime !== "" && this.compareDate(this.state.inputRentStartDate, this.state.inputRentEndDate, this.state.inputRentStartTime, this.state.inputRentEndTime) > -1) {
            DbAction.rentInsert(
                this.state.rowData.id,
                this.state.id,
                this.state.inputRentStartDate + " " + this.state.inputRentStartTime + ":00",
                this.state.inputRentEndDate + " " + this.state.inputRentEndTime + ":00")
                .then((response) => {
                    if (response.success) {
                        this.setState({rentFail: false});
                        this.toggle({})
                    } else {
                        if (typeof response.row[0] !== "undefined") {
                            this.setState({
                                rentFail: true,
                                failText: response.message + "          " + this.formatDate(response.row[0].reservation_start) + " <-> " + this.formatDate(response.row[0].reservation_end)
                            });
                        } else {
                            this.setState({
                                rentFail: true,
                                failText: response.message
                            });
                        }

                        console.log(response);
                    }
                }).then(() => {
                this.props.onItemChangeRemote();
            })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            this.setState({rentFail: true});
        }
    }

    formatDate(str) { // Format from 2018-11-27T18:01:00.000Z -> 27-11-2018 18:01
        return (str.slice(8, 10) + str.slice(4, 8) + str.slice(0, 4) + " | " + str.slice(11, 16));
    }

    formatDateReverse(date, time) { // Format from 2018-11-27 + 18:01 -> 2018-11-27T18:01:00
        return (date + 'T' + time + ':00');
    }

    dateNow() {
        return new Date(Date.now()).toISOString().slice(0, 10);
    }

    timeNow() { //
        Date.prototype.addTimeOffset = function () { // UTC + Difference
            this.setHours(this.getHours() + (new Date().getTimezoneOffset() / 60 * -1));
            return this;
        };
        return new Date(Date.now()).addTimeOffset().toISOString().slice(11, 14) + "00";
    }

    compareDate(start, end, startTime, endTime) {
        let startDate = new Date(this.formatDateReverse(start, startTime));
        let endDate = new Date(this.formatDateReverse(end, endTime));


        if (startDate < endDate) {
            return 1;
        } else if (startDate === endDate) {
            return 0;
        } else if (startDate > endDate) {
            return -1;
        } else {
            return -1
        }
    }

    checkInput() { // IF user has typed a value in ANY of the Add New fields. It will override the dropdown value.
        return new Promise((resolve) => {
            const inputOrDd = {};

            if (this.state.inputAddress !== "") {
                inputOrDd.address = this.state.inputAddress;
            } else if (this.state.inputAddressDd !== "") {
                inputOrDd.address = this.state.inputAddressDd;
            } else {
                inputOrDd.address = null;
            }

            if (this.state.inputCategory !== "") {
                inputOrDd.category = this.state.inputCategory;
            } else if (this.state.inputCategoryDd !== "") {
                inputOrDd.category = this.state.inputCategoryDd;
            } else {
                inputOrDd.category = null;
            }

            if (this.state.inputOwner !== "") {
                inputOrDd.owner = this.state.inputOwner;
            } else if (this.state.inputOwnerDd !== "") {
                inputOrDd.owner = this.state.inputOwnerDd;
            } else {
                inputOrDd.owner = null;
            }

            resolve(inputOrDd);
        });
    }

    adminButtons() {
        if(this.state.justView){
            return null
        }else {
            if (this.state.rentView) { // ADMIN Rent view modal buttons
                return (
                    <div>
                        <div className={"form-row"}>
                            <div className={"col-md-12"}>
                                <Button color={"warning btn-block m-0"} onClick={this.reservationModify}>Save
                                    reservation
                                    changes</Button>
                            </div>
                        </div>
                        <div className={"form-row"}>
                            <div className={"col-md-12"}>
                                <Button color={"success btn-block m-0"} onClick={this.rentItem}>Rent item</Button>
                            </div>
                        </div>
                    </div>

                );
            } else { // ADMIN Reserve view modal buttons
                return (
                    <div className={"form-row"}>
                        <div className={"col-md-12"}>
                            <Button className={"btn-block m-0"} color={"warning"}
                                    onClick={this.reserveItem}>Reserve for Maintenance</Button>
                        </div>
                        <div className={"col-md-12"}>
                            <Button color={"success btn-block m-0"} onClick={this.saveChanges}>Save changes</Button>
                        </div>
                    </div>
                );
            }
        }
    }

    userButtons() {
        if(this.state.justView && !this.state.reserveView){
            return null;
        }else{
            if (this.state.rentView) { // USER Rent view modal buttons
                return (
                    <div className={"form-row"}>
                        <div className={"col-md-12"}>
                            <Button color={"success btn-block m-0"} onClick={this.reservationModify}>Save changes</Button>
                        </div>
                    </div>
                );
            } else { // USER Reserve view modal buttons
                return (
                    <div className={"form-row"}>
                        <div className={"col-md-12"}>
                            <Button className={"btn-block m-0"} color={"success"}
                                    onClick={this.reserveItem}>Reserve</Button>
                        </div>
                    </div>
                );
            }
        }
    }

    addModeBtn() {
        return (
            <div className={"form-row"}>
                <div className={"col-md-12"}>
                    <Button color={"success btn-block m-0"} onClick={this.addItem}>Add new</Button>
                </div>
            </div>

        );
    }

    disableItemInput(){
        if(this.state.justView || this.props.auth.admin !== '0'){
            return true;
        }else{
            return false;
        }
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

                        <WarningComponent content={this.state.failText}
                                          hidden={!this.state.reservationDeleteFail}
                                          cn={"alert alert-danger"}/>
                        <WarningComponent
                            content={this.state.failText.length < 16 ? "Rent failure! Check that your data correct and is in a right format(DD/MM/YYYY HH.MM)" : this.state.failText}
                            hidden={!this.state.rentFail}
                            cn={"alert alert-danger"}/>

                        <WarningComponent
                            content={this.state.failText.length < 16 ? "Reservation failure! Check that your data correct and is in a right format(DD/MM/YYYY HH.MM)" : this.state.failText}
                            hidden={!this.state.reservationFail}
                            cn={"alert alert-danger"}/>

                        <WarningComponent content={"Item add failure"} hidden={!this.state.newItemFail}
                                          cn={"alert alert-danger"}/>

                        <form>
                            <div hidden={this.state.addMode || (this.state.justView && !this.state.reserveView)}>
                                <div >
                                    <div className="form-row"
                                         hidden={!(this.state.reserveView || this.state.rentView)}>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputReservationStartDate">Reservation Start Date</label>
                                            <input type="date" className="form-control" id="inputReservationStartDate"
                                                   onChange={this.handleChange} min={this.state.dateNow}
                                                   value={this.state.inputReservationStartDate}
                                                   disabled={this.state.rented || this.state.dateNow > this.state.rowData.reservation_start || this.state.justView}/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputReservationStartTime">Reservation Start Time</label>
                                            <input type="time" className="form-control" id="inputReservationStartTime"
                                                   onChange={this.handleChange}
                                                   min={this.state.rentView ? "" : this.state.timeNow}
                                                   value={this.state.inputReservationStartTime}
                                                   disabled={this.state.rented || this.state.dateNow > this.state.rowData.reservation_start || this.state.justView}/>
                                        </div>
                                    </div>
                                    <div className="form-row"
                                         hidden={!(this.state.reserveView || this.state.rentView)}>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputReservationEndDate">Reservation End Date</label>
                                            <input type="date" className="form-control" id="inputReservationEndDate"
                                                   onChange={this.handleChange}
                                                   min={this.state.inputReservationStartDate}
                                                   value={this.state.inputReservationEndDate}
                                                   disabled={this.state.rented || this.state.dateNow > this.state.rowData.reservation_end || this.state.justView}/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputReservationEndTime">Reservation End Time</label>
                                            <input type="time" className="form-control" id="inputReservationEndTime"
                                                   onChange={this.handleChange}
                                                   value={this.state.inputReservationEndTime}
                                                   disabled={this.state.rented || this.state.dateNow > this.state.rowData.reservation_end || this.state.justView}/>
                                        </div>
                                    </div>
                                    <hr/>
                                </div>

                                <div hidden={(this.state.inputRentStartDate === "" && !this.props.auth.admin) || this.state.addMode || this.state.reserveView}>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputRentStartDate">Rent Start Date</label>
                                            <input type="date" className="form-control" id="inputRentStartDate"
                                                   onChange={this.handleChange} min={this.state.dateNow}
                                                   value={this.state.inputRentStartDate}
                                                   disabled={this.state.rented ||(this.state.rented && !this.props.auth.admin) || this.state.isHistory || this.state.justView}/>
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputRentStartTime">Rent Start Time</label>
                                            <input type="time" className="form-control" id="inputRentStartTime"
                                                   onChange={this.handleChange} min={this.state.timeNow}
                                                   value={this.state.inputRentStartTime}
                                                   disabled={this.state.rented ||(this.state.rented && !this.props.auth.admin) || this.state.isHistory || this.state.justView}/>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputRentEndDate">Rent End Date</label>
                                            <input type="date" className="form-control" id="inputRentEndDate"
                                                   onChange={this.handleChange} min={this.state.inputRentStartDate}
                                                   value={this.state.inputRentEndDate}
                                                   disabled={(this.state.rented && !this.props.auth.admin) || this.state.isHistory  || this.state.justView}/>
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputRentEndTime">Rent End Time</label>
                                            <input type="time" className="form-control" id="inputRentEndTime"
                                                   onChange={this.handleChange}
                                                   value={this.state.inputRentEndTime}
                                                   disabled={(this.state.rented && !this.props.auth.admin) || this.state.isHistory || this.state.justView}/>
                                        </div>

                                    </div>
                                </div>
                            </div>


                            <div>
                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputName">Name</label>
                                        <input type="text" className="form-control" id="inputName"
                                               placeholder="Name" onChange={this.handleChange}
                                               value={this.state.inputName} disabled={this.disableItemInput()}/>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputBrand">Brand</label>
                                        <input type="text" className="form-control" id="inputBrand"
                                               placeholder="Brand" onChange={this.handleChange}
                                               value={this.state.inputBrand} disabled={this.disableItemInput()}/>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputModel">Model</label>
                                        <input type="text" className="form-control" id="inputModel"
                                               placeholder="Model" onChange={this.handleChange}
                                               value={this.state.inputModel} disabled={this.disableItemInput()}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputInfo">Info</label>
                                    <textarea className="form-control" id="inputInfo"
                                              placeholder="Short description..." onChange={this.handleChange}
                                              value={this.state.inputInfo} disabled={this.disableItemInput()}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="inputAddress">Add new address</label>
                                    <input value={this.state.inputAddress} type="text" className="form-control"
                                           id="inputAddress"
                                           placeholder="Address" onChange={this.handleChange}
                                           disabled={this.disableItemInput()}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="inputAddressDd">OR Choose address</label>
                                    <select value={!this.props.addMode && this.state.inputAddressDd}
                                            onChange={this.handleChange}
                                            id="inputAddressDd" className="form-control" disabled={this.disableItemInput()}>
                                        <option value="">Address</option>
                                        {this.props.dropdownData.address}
                                    </select>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-5">
                                        <label htmlFor="inputOwner">Add new owner</label>
                                        <input value={this.state.inputOwner} type="text" className="form-control"
                                               id="inputOwner"
                                               onChange={this.handleChange} disabled={this.disableItemInput()}/>
                                    </div>
                                    <div className="form-group col-md-2">
                                        <p>OR</p>
                                    </div>
                                    <div className="form-group col-md-5">
                                        <label htmlFor="inputOwnerDd">Choose owner</label>
                                        <select value={!this.props.addMode ? this.state.inputOwnerDd : ""}
                                                onChange={this.handleChange}
                                                id="inputOwnerDd" className="form-control"
                                                disabled={this.disableItemInput()}>
                                            <option value="">Owner</option>
                                            {this.props.dropdownData.owner}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-5">
                                        <label htmlFor="inputCategory">Add new category</label>
                                        <input value={this.state.inputCategory} type="text" className="form-control"
                                               id="inputCategory"
                                               onChange={this.handleChange} disabled={this.disableItemInput()}/>
                                    </div>
                                    <div className="form-group col-md-2">
                                        <p>OR</p>
                                    </div>
                                    <div className="form-group col-md-5">
                                        <label htmlFor="inputCategoryDd">Choose category</label>
                                        <select value={!this.props.addMode && this.state.inputCategoryDd}
                                                onChange={this.handleChange}
                                                id="inputCategoryDd" className="form-control"
                                                disabled={this.disableItemInput()}>
                                            <option value="">Category</option>
                                            {this.props.dropdownData.category}
                                        </select>
                                    </div>
                                </div>
                            </div>


                            {(this.props.auth.admin && this.state.addMode) ? this.addModeBtn() : ""}
                            {(this.props.auth.admin && !this.state.addMode) && !this.state.isHistory && this.adminButtons()}
                            {!this.props.auth.admin && !this.state.rented && !this.state.isHistory ? this.userButtons() : ""}
                        </form>
                    </ModalBody>

                </Modal>
            </div>
        )
    }
}

const WarningComponent = (props) => {
    return (

        <div hidden={props.hidden} className={props.cn} role="alert">
            {props.content}
        </div>
    );
};


export default ItemModal;

