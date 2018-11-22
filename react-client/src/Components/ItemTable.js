import React, {Component} from 'react';
import {ItemTableRow, ItemTableRowHeader} from "./ItemTableRow";
import dbActions from '../DbAction';

export default class ItemTable extends Component {
    constructor(props) {
        super(props);
        this.state = {data: []};
        this.onItemUpdate = this.onItemUpdate.bind(this);
        this.onItemUpdate();
    }

    componentDidMount() {
        this.updateRows();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.updateRows();
    }

    onItemUpdate() {
        console.log("OnItemUpdate()");
        this.props.onItemChange(this.updateRows.bind(this));
    }

    updateRows() {
        console.log(this.props.searchOwner+" "+this.props.searchAddress+" "+this.props.searchCategory);
        dbActions.getItems("", this.props.searchName, this.props.searchBrand, this.props.searchModel, "", this.props.searchAddress, this.props.searchOwner, this.props.searchCategory)
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
                          toggleModalRemote={this.props.toggleModalRemote} returnHeader={false} key={index}
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