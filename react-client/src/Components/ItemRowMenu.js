import {Component} from "react";
import React from "react";
import DbAction from "../DbAction";

export default class ItemsRowMenu extends Component {

    deleteRow(){
        DbAction.deleteItem(this.props.id)
            .then(()=>{this.props.onItemChangeRemote()})
    }

    render(){
        if(this.props.admin){
            return(
                <td className="dropleft">
                    <img src="./menu32.png" alt="Item menu"  data-toggle="dropdown"/>
                    <div className="dropdown-menu">
                        <button className={"dropdown-item"} type="button" onClick={()=>{this.props.toggleModalRemote(this.props.id)}} >Modify</button>
                        <button className={"dropdown-item"} type="button" onClick={()=>{this.deleteRow()}} >
                            Delete
                        </button>
                    </div>
                </td>
            );
        }else{
            return(
                    <img src="./eye32.ico" alt="Item menu" onClick={()=>{this.props.toggleModalRemote(this.props.id,false,true)}} />
            );
        }

    }
}