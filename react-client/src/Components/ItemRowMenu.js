import {Component} from "react";
import React from "react";
import DbAction from "../DbAction";
import ItemModal from "./ItemModal";

export default class ItemsRowMenu extends Component {
    render(){
        return(
            <td className="btn-group dropleft">
                <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                    <img src="./menu.ico" alt=""/>
                </button>
                <div className="dropdown-menu">
                    <ItemsRowMenuItem button={<ItemsRowMenuBtnMod id={this.props.id} modal={"ItemModal"} />}/>
                    <ItemsRowMenuItem button={<ItemsRowMenuBtnDel id={this.props.id} />}/>
                </div>
            </td>
        );
    }
}

class ItemsRowMenuItem extends Component {
    render(){
        return(
            <a className="dropdown-item" href="#">{this.props.button}</a>
        );
    }
}

class ItemsRowMenuBtnMod extends Component {
    render(){
        return(
            <button type="button" onClick={()=>{DbAction.setItemToModify(this.props.id)}} className="btn btn-warning" data-toggle="modal" data-target={""+this.props.modal}>
                Modify
            </button>
        );
    };
}

class ItemsRowMenuBtnDel extends Component {
    render(){
        return(
            <button type="button" onClick={()=>{DbAction.deleteItem(this.props.id)}} className="btn btn-danger" data-toggle="modal" data-target={""+this.props.modal}>
                Delete
            </button>
        );
    }
}