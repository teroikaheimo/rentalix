import React, {Component} from 'react';
import ItemTableRowMenu from './ItemRowMenu';

export class ItemTableRow extends Component {
    render() {
        if (this.props.rentView) { // Admin and user reservation view row
            return (
                <tr>
                    <ColData data={this.props.rowData.serial}/>
                    <ColData data={this.props.rowData.name}/>
                    <ColData data={this.props.rowData.model}/>
                    <ColData data={this.props.rowData.brand}/>
                    <ColData data={this.props.rowData.address}/>
                    <ColData data={this.props.rowData.owner}/>
                    <ItemTableRowMenu admin={this.props.admin} onItemChangeRemote={this.props.onItemChangeRemote}
                                      toggleModalRemote={this.props.toggleModalRemote} id={this.props.rowData.serial}/>
                </tr>
            )
        } else{// Admin / User rents and reservations row
                return (
                    <tr>
                        <ColData data={this.props.rowData.this.props.type}/>
                        <ColData data={this.props.rowData.username}/>
                        <ColData data={this.props.rowData.serial}/>
                        <ColData data={this.props.rowData.name}/>
                        <ColData data={this.props.rowData.owner}/>
                        <ColData data={this.props.rowData.start_date}/>
                        <ColData data={this.props.rowData.end_date}/>
                        <ItemTableRowMenu admin={this.props.admin} onItemChangeRemote={this.props.onItemChangeRemote}
                                          toggleModalRemote={this.props.toggleModalRemote} id={this.props.rowData.serial}/>
                    </tr>
                )
        }

    }
}

export class ItemTableRowHeader extends Component {
    render() {

        if (this.props.rentView) {
            return (
                <tr>
                    <ColHeaderData data={"Serial"}/>
                    <ColHeaderData data={"Name"}/>
                    <ColHeaderData data={"Model"}/>
                    <ColHeaderData data={"Brand"}/>
                    <ColHeaderData data={"Location"}/>
                    <ColHeaderData data={"Owner"}/>
                    <ColHeaderData data={""}/>
                </tr>
            )
        } else {
            return (
                <tr>
                    <ColHeaderData data={"Serial"}/>
                    <ColHeaderData data={"Name"}/>
                    <ColHeaderData data={"Location"}/>
                    <ColHeaderData data={"Owner"}/>
                    <ColHeaderData data={"Start Date"}/>
                    <ColHeaderData data={"End Date"}/>
                    <ColHeaderData data={"Type"}/>
                    <ColHeaderData data={""}/>
                </tr>
            )
        }
    }
}

class ColData extends Component {
    render() {
        return (
            <td>{this.props.data}</td>
        );
    }
}

class ColHeaderData extends Component {
    render() {
        return (
            <th scope="col">{this.props.data}</th>
        );
    }
}
