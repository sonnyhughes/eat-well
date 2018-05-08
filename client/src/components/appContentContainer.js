import React from "react";
import Dashboard from "./pages/dashboard.js";
import { Route } from "react-router-dom";
import { Level, SubTitle, Icon } from 'reactbulma'
import Profile from "./pages/profile.js";
import Login from "./pages/login";
import Findrec from "./pages/findrecipe";
import Findres from "./pages/findrestaurant";
import Postrec from "./pages/postrecipe";
import 'font-awesome/css/font-awesome.min.css';



class appContainer extends React.Component {

    constructor({match, ...props}){
        super(props)
        this.username = window.localStorage.getItem("the user");

    }

    componentDidMount() {
    document.title = "Eat Well";
  }

    render() {
        const match = this.props.match;
        return(

            <div>
                <Level style={{marginBottom: "1.5%", padding: "1.5%", backgroundColor: "hsl(171, 100%, 41%)", color: "white"}}>
                    <Level.Left>
                        <Level.Item>
                            <SubTitle is='5'>
                                <a> <strong style={{fontSize: "25px", color: "white"}} onClick={this.goHome} >Eat Well</strong></a>
                            </SubTitle>
                        </Level.Item>
                    </Level.Left>

                    <Level.Right>
                        <Level.Item>

                            <a><Icon onClick={this.myProfile}>
                                <i style={{fontSize: "28px"}} className="fa fa-user fa-3"/>
                            </Icon></a>
                            <SubTitle style={{color:"white"}}>
                                Welcome, {this.username}!
                            </SubTitle>
                        </Level.Item>
                    </Level.Right>
                </Level>

                {/* When in the app, default to show the dashboard */}
                <Route exact path={`${match.url}`} component={Dashboard} />


                {/* defining sub-routes */}
                <Route path={`${match.url}/profile`} component={Profile} />
                {/*<Route path={`${match.url}/login`} component={Login} />*/}
                <Route path={`${match.url}/find-recipes`} component={Findrec} />
                <Route path={`${match.url}/find-restaurants`} component={Findres} />
                <Route path={`${match.url}/post-recipes`} component={Postrec} />

            </div>
        )
    }

    myProfile = (e) => {
        e.preventDefault();
        const push = this.props.history.push;
        push(`${this.props.match.url}/profile`);

    }


    goHome = (e) => {
        e.preventDefault();
        const push = this.props.history.push;
        push(`${this.props.match.url}`);

    }
}

export default appContainer;