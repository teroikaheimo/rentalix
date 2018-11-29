import React, {Component} from 'react';
import ItemTableRowMenu from './ItemRowMenu';

export class ItemTableRow extends Component {
    render() {
        if (this.props.rentView) { // Admin and user item view row
            return (
                <tr>
                    <ColData data={this.props.rowData.serial}/>
                    <ColData data={this.props.rowData.name}/>
                    <ColData data={this.props.rowData.brand}/>
                    <ColData data={this.props.rowData.model}/>
                    <ColData data={this.props.rowData.address}/>
                    <ColData data={this.props.rowData.owner}/>
                    <ItemTableRowMenu rowData={this.props.rowData} admin={this.props.admin} onItemChangeRemote={this.props.onItemChangeRemote}
                                      toggleModalRemote={this.props.toggleModalRemote} id={this.props.rowData.serial}/>
                </tr>
            )
        } else{// Admin / User rents and reservations row
                return (
                    <tr>
                        <ColData data={this.props.type}/>
                        <ColData data={this.props.rowData.username}/>
                        <ColData data={this.props.rowData.serial}/>
                        <ColData data={this.props.rowData.name}/>
                        <ColData data={this.props.rowData.owner}/>
                        <ColData data={this.props.start_date}/>
                        <ColData data={this.props.end_date}/>
                        <ItemTableRowMenu type={this.props.type} rowData={this.props.rowData} rentView={true} admin={this.props.admin} onItemChangeRemote={this.props.onItemChangeRemote}
                                          toggleModalRemote={this.props.toggleModalRemote} id={this.props.rowData.serial} rent_id={this.props.rowData.id}/>
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
                    <ColHeaderData data={"Brand"}/>
                    <ColHeaderData data={"Model"}/>
                    <ColHeaderData data={"Location"}/>
                    <ColHeaderData data={"Owner"}/>
                    <ColHeaderData data={""}/>
                </tr>
            )
        } else {
            return (
                <tr>
                    <ColHeaderData data={"Status"}/>
                    <ColHeaderData data={"Username"}/>
                    <ColHeaderData data={"Serial"}/>
                    <ColHeaderData data={"Name"}/>
                    <ColHeaderData data={"Owner"}/>
                    <ColHeaderData data={"Start Date"}/>
                    <ColHeaderData data={"End Date"}/>
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
