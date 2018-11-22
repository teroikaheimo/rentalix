import React, {Component} from 'react';
import ItemTableRowMenu from './ItemRowMenu';

export class ItemTableRow extends Component {
    render() {
        return (
                <tr>
                    <ColData data={this.props.rowData.serial} />
                    <ColData data={this.props.rowData.name} />
                    <ColData data={this.props.rowData.model} />
                    <ColData data={this.props.rowData.brand} />
                    <ColData data={this.props.rowData.address} />
                    <ColData data={this.props.rowData.owner} />
                    <ItemTableRowMenu onItemChangeRemote={this.props.onItemChangeRemote} toggleModalRemote={this.props.toggleModalRemote} id={this.props.rowData.serial}/>
                </tr>
        )
    }
}

export class ItemTableRowHeader extends Component {
    render(){
        return (
            <tr>
                <ColHeaderData data={"Serial"} />
                <ColHeaderData data={"Name"} />
                <ColHeaderData data={"Model"} />
                <ColHeaderData data={"Brand"} />
                <ColHeaderData data={"Location"} />
                <ColHeaderData data={"Owner"} />
                <ColHeaderData data={""} />
            </tr>
        )
    }
}

class ColData extends Component {
    render(){
        return(
            <td>{this.props.data}</td>
        );
    }
}

class ColHeaderData extends Component {
    render(){
        return(
            <th scope="col">{this.props.data}</th>
        );
    }
}
