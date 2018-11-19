import {Component} from "react";
import React from "react";
import DbAction from "../DbAction";

export default class ItemsRowMenu extends Component {
    render(){
        return(
            <td className="btn-group dropleft">
                <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                    <img src="./menu.ico" alt=""/>
                </button>
                <div className="dropdown-menu">
                    <button className={"dropdown-item"} type="button" onClick={()=>{this.props.toggleModalRemote(this.props.id)}} >Modify</button>
                    <button className={"dropdown-item"} type="button" onClick={()=>{DbAction.deleteItem(this.props.id)}} >
                        Delete
                    </button>
                </div>
            </td>
        );
    }
}