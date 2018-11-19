import React, {Component} from 'react';
import {ItemTableRow, ItemTableRowHeader} from "./ItemTableRow";
import dbActions from '../DbAction';

export default class ItemTable extends Component {
    constructor(props) {
        super(props);
        this.state = {data: []};
    }

    componentDidMount() {
        dbActions.getItems()
            .then((result) => {
                this.setState({data: result})
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {

        const result = this.state.data.map((inputRowData, index) =>
            <ItemTableRow toggleModalRemote={this.props.toggleModalRemote} returnHeader={false} key={index} rowData={inputRowData}/>);

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