import React, {Component} from 'react';
import {ItemTableRow, ItemTableRowHeader} from "./ItemTableRow";
import dbActions from '../DbAction';

export default class ItemTable extends Component {
    constructor(props) {
        super(props);
        this.state = {data: []};

        this.formatDate = this.formatDate.bind(this);
        // Remote triggered functions
        this.updateRows = this.updateRows.bind(this);
        this.props.updateTableRowsGetSet(this.updateRows);
    }

    componentDidMount() {
        this.updateRows();
    }

    updateRows(id, name, brand,model, info, address, owner, category) {
        if(this.props.rentView){
            dbActions.getItems(id, name, brand,model, info, address, owner, category)
                .then((result) => {this.setState({data: result});})
                .catch((err) => {console.log(err)})
        }else{
            if(this.props.auth.admin){  // Query ALL rents and reservations.
                dbActions.fetchAllRents()
                    .then((result)=>{this.setState({data:result})})
                    .catch((err)=>{console.log(err)})

            }else{ // Query reservations and rents of the user
                dbActions.fetchUserRents(this.props.auth.username)
                    .then((result)=>{this.setState({data:result})})
                    .catch((err)=>{console.log(err)})
            }
        }
    }


    formatDate(rowData,startDate){
        let formatedDate ="";
        if(rowData.reservation_start !== null && typeof rowData.reservation_start !== "undefined"){
            if(startDate){
                if( rowData.start_date !== null){
                    formatedDate = new Date(rowData.start_date).toISOString().slice(0, 19).replace('T', ' ');
                }else{
                    formatedDate = new Date(rowData.reservation_start).toISOString().slice(0, 19).replace('T', ' ');
                }
            } else{
                if( rowData.end_date !== null){
                    formatedDate = new Date(rowData.end_date).toISOString().slice(0, 19).replace('T', ' ');
                }else{
                    formatedDate = new Date(rowData.reservation_end).toISOString().slice(0, 19).replace('T', ' ');
                }
            }
        }
        return formatedDate;
    }

    render() {
        const result = this.state.data.map((inputRowData, index) =>

            <ItemTableRow type={inputRowData.start_date === null?<p className={"text-warning"}>Reserved</p> :<p className={"text-success"}>Rented</p>}
                          start_date={this.formatDate(inputRowData,true)}
                          end_date={this.formatDate(inputRowData,false)}
                          rentView={this.props.rentView}
                          onItemChangeRemote={this.props.onItemChangeRemote}
                          admin={this.props.auth.admin}
                          toggleModalRemote={this.props.toggleModalRemote}
                          returnHeader={false} key={index}
                          rowData={inputRowData}/>);

        if(typeof this.state.data[0] !== "undefined" && this.props.rentView){
            return (
                <div className="ItemTable">
                    <table className="table table-responsive-sm table-striped table-dark">
                        <thead>
                        <ItemTableRowHeader rentView={this.props.rentView}/>
                        </thead>
                        <tbody>
                        {result}
                        </tbody>
                    </table>
                </div>
            )
        }else if(typeof this.state.data[0] === "undefined"){
            return(
                <div className="ItemTable">
                <div>
                    <span className={"h3 text-white"}>No items found!</span>
                </div>
                </div>
            );
        }else{
            return(
                <div className="ItemTable">
                    <table className="table table-responsive-sm table-striped table-dark">
                        <thead>
                        <ItemTableRowHeader rentView={this.props.rentView}/>
                        </thead>
                        <tbody>
                        {result}
                        </tbody>
                    </table>
                </div>
            );
        }


    }
}