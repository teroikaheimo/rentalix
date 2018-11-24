import React, {Component} from 'react';
import {ItemTableRow, ItemTableRowHeader} from "./ItemTableRow";
import dbActions from '../DbAction';

export default class ItemTable extends Component {
    constructor(props) {
        super(props);
        this.state = {data: []};

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
                .then((result) => {
                    this.setState({data: result});
                    console.log("update");
                })
                .catch((err) => {
                    console.log(err)
                })
        }else{
            if(this.props.auth.admin){  // Query ALL rents and reservations.


            }else{ // Query reservations and rents of the user

            }
        }

    }

    render() {

        const result = this.state.data.map((inputRowData, index) =>
            <ItemTableRow rentView={this.props.rentView}
                          onItemChangeRemote={this.props.onItemChangeRemote}
                          admin={this.props.auth.admin}
                          toggleModalRemote={this.props.toggleModalRemote}
                          returnHeader={false} key={index}
                          rowData={inputRowData}/>);

        if(this.props.rentView){
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
                <div>
                    <h3>You have no reservations or rented items!</h3>
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