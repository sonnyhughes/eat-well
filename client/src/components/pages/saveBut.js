import React, { Component } from "react";
import API from "../../api/API.js";
import { Section, Container, Title, SubTitle, Input, Button, Hero, Card, Content, Icon} from 'reactbulma'



class SaveButton extends Component {

    constructor(props) {
        super(props)
        this.state={
            clicked: 'false',
            text: 'Save',
            value:'not saved',
            saved:[],
            unsaved:[]
        }
    }

    //get id props from parent

    render() {
        let id = this.props.id
        return (
          <div>
          <br></br>
          <br></br>
            <button className={this.state.clicked} id = {id} value= {this.state.value} onClick={this.onClick}>{this.state.text}</button>
            </div>

        )
    }


    onClick = event => {
        let id = this.props.id
    	  if(this.state.clicked == 'true'){
      	    this.setState({ 
      		      clicked: 'false',
                text: 'Save',
                value: 'not saved'
      	    });
            console.log(this.props.uid)
            API.savingRecipes('unsave',this.props.uid,this.props.id,this.props.url, this.props.image).then(response=>(console.log(response)))
        }
        else if (this.state.clicked =='false'){
      	    this.setState({
        	      clicked: 'true',
                text: 'Unsave',
                value:'saved'
      	    });
            console.log(this.props.uid)
            API.savingRecipes('save',this.props.uid,this.props.id, this.props.url, this.props.image).then(response=>(console.log(response)))
        }
        else undefined;
    }
};
export default SaveButton;
