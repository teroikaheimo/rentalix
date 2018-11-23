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
        console.log(name);
        dbActions.getItems(id, name, brand,model, info, address, owner, category)
            .then((result) => {
                this.setState({data: result});
                console.log("update");
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {

        const result = this.state.data.map((inputRowData, index) =>
            <ItemTableRow onItemChangeRemote={this.props.onItemChangeRemote}
                          admin={this.props.auth.admin}
                          toggleModalRemote={this.props.toggleModalRemote}
                          returnHeader={false} key={index}
                          rowData={inputRowData}/>);

        return (
            <div className="ItemTable">
                <table className="table table-responsive-sm table-striped table-dark">
                    <thead>
                    <ItemTableRowHeader/>
                    </thead>
                    <tbody>
                    {result}
                    </tbody>
                </table>
            </div>
        )
    }
}