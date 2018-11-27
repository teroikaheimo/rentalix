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


    formatDate(rowData,startDate){ // Format from 2018-11-27T18:00:00.000Z -> 27-11-2018 18:00
        let formatedDate ="";
        let format = (str)=>{
            return (str.slice(8,10)+str.slice(4,8)+str.slice(0,4)+" | "+str.slice(11,16))
        };

        if(rowData.reservation_start !== null && typeof rowData.reservation_start !== "undefined"){
            if(startDate){
                if( rowData.start_date !== null){
                    formatedDate = format(rowData.start_date);
                }else{
                    formatedDate = format(rowData.reservation_start);
                }
            } else{
                if( rowData.end_date !== null){
                    formatedDate = format(rowData.end_date);
                }else{
                    formatedDate = format(rowData.reservation_end);
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