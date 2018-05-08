import React, { Component } from "react";
import {Card, Content, Container, Section, SubTitle} from 'reactbulma'
import API from "../../api/API.js";
import Saves from "./savecard.js"
import Posts from "./postedcard.js"


const leftPanelStyle = {
    marginBottom: "1.5%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
};

const cardSpacing = {
    marginBottom: "4%"
};


class Profile extends Component {

    constructor(props) {
        super(props)

        this.state={
            option: "",
            results: [], 
            UserID:"" ,
            recs:[],
            savedrecs:[],
            render:""       
        }
    }


 findUserRecipePost = (id) => {
        API.getPostedRecipes(id)
            .then(res => {  
                //console.log("recipes posted",res.data.postedrec)
                let posted = res.data.postedrec
                this.setState({
                   recs: posted

                })
                console.log('posted recipes',this.state.recs)

             })
            .catch(err => console.log(err));
    }

findUserRecipes = (id) => {
        API.getSavedRecs(id)
            .then(res => {

                 this.setState({
                   savedrecs: res.data.savedrec
                })
                console.log("saved recipes",res.data.savedrec)
            })
            .catch(err => console.log(err));
    }

    renderPostedRecipes = (event) =>{

        //console.log('state',this.state.recs)

     this.setState({
                results: this.state.recs,
                render:'posted'
            })   

    }

    renderSavedRecipes = (event) =>{


     this.setState({
                results: this.state.savedrecs,
                render:'saved'
            })   


    }

    componentWillMount() {
        let userid = localStorage.getItem('id');
        this.findUserRecipes(userid)
        this.findUserRecipePost(userid)

            this.setState({
                UserID: userid
            })
        };


    render() {

        let div = null
        let resultforrender = this.state.results

        if (this.state.render=='posted'){
            div = <Posts results = {resultforrender}></Posts>
        }
        else if (this.state.render=='saved'){
            div = <Saves results = {resultforrender}></Saves>
        }
        return (
            <div style={leftPanelStyle}>

                {/*left panel*/}
                <Section style={{display: "flex", flexDirection: "column", width: "30%"}}>

                    <Card style={cardSpacing}>
                        <Card.Header>
                            <Card.Header.Title>
                                User Profile
                            </Card.Header.Title>
                        </Card.Header>
                        <Card.Content>
                            <Content>
                                Member since: 01/03/2018
                            </Content>
                        </Card.Content>
                    </Card>

                    <Card style={cardSpacing}>
                        <Card.Header>
                            <Card.Header.Title>
                               <a onClick = {this.renderSavedRecipes}> Saved Recipes </a>
                            </Card.Header.Title>
                        </Card.Header>
                        {/*<Card.Content>*/}
                        {/*<Content>*/}
                        {/*Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.*/}
                        {/*</Content>*/}
                        {/*</Card.Content>*/}
                    </Card>

                    <Card style={cardSpacing}>
                        <Card.Header>
                            <Card.Header.Title>
                                <a onClick = {this.renderPostedRecipes}> Posted Recipes </a>
                            </Card.Header.Title >
                        </Card.Header>
                        {/*<Card.Content>*/}
                        {/*<Content>*/}
                        {/*Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.*/}
                        {/*</Content>*/}
                        {/*</Card.Content>*/}
                    </Card>
                </Section>


                {/*right panel*/}
                <Section style={{width: "50%", height: "70%"}}>
                    <Card>
                        <Card.Header>
                            <Card.Header.Title>
                                Latest Activity
                            </Card.Header.Title>
                            <Card.Content>
                            <Content>
                            Select one of the options to the left to view your latest activity
                            </Content>
                            </Card.Content>
                        </Card.Header>
                        <Card.Content>
                            <Content>
                                {div}
                            </Content>
                        </Card.Content>
                    </Card>
                </Section>
            </div>
        )
    }

}


export default Profile;
