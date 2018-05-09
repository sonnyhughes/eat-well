import React from "react";
import $ from "jquery";
import API from "../../api/API.js"
import * as firebase from "firebase";

//bulma ui
import { Section, Container, Title, SubTitle, Input, Button, Hero} from 'reactbulma'


class LandingPage extends React.Component {
    // Set the components initial state..

componentDidMount() {
    document.title = "Eat Well";
  }
    render() {

        return (

            <div style={{display:"flex", height:"100%"}}>

                <Section style={{height:"100vh", width:"50%", backgroundImage:"url(https://www.theroastedroot.net/wp-content/uploads/2017/02/Vegetarian-Mason-Jar-Burrito-6424.jpg)", backgroundPosition:"center", backgroundRepeat:"None", backgroundSize:"cover", position:"relative"}}>

                    <Hero style={{position:"absolute", bottom:"40%", background:"rgba(255,255,255,0.9)", width:"75%"}}>
                        <Hero.Body >
                            <Container style={{width:"100%", textAlign:"center"}}>
                            <Title >
                                Eat Well
                            </Title>
                            <SubTitle>
                                A Faster Route to Kinder Food.
                            </SubTitle>
                            </Container>
                        </Hero.Body>
                    </Hero>

                </Section>

                <Section style={{width:"55%"}}>

                    <Container style={{width:"70%",bottom:"-30%", textAlign:"center"}}>
                        <form  onSubmit={this.handleSubmit}>

                            <div>
                                <h2>Enter your name, email & password to create an account</h2>
                                <Input style={{marginBottom:"2%"}} warning medium id="userName" placeholder="name"/>
                            </div>

                            <div>
                            <Input style={{marginTop:"2%", marginBottom:"2%"}} warning medium id="userEmail" placeholder="email address"/>
                            </div>

                            <div>

                            <Input style={{marginBottom:"2%"}} warning medium id="userPassword" placeholder="password" type="password" />
                            </div>
                            <div>
                                <Button  type="submit" primary>Next</Button>
                            </div>

                        </form>
                    </Container>
                </Section>
            </div>
        )
    }

    // Using an arrow function, our outer scope is maintained.
    // Used in the context of react, we maintain our outer scope which is our LandingPage component.

    handleSubmit = (e) => {
        e.preventDefault();
        //On click of submit button, grab user data and push to firebase.
        const userEmail = $("#userEmail").val().trim();
        const userPassword = $("#userPassword").val().trim();
        const userName = $("#userName").val().trim();
        const push = this.props.history.push;
        const mongoUsers = [];

        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword)
            .then(function(user) {
                console.log("User created!!!");
                if (user) {

                    //push to firebase
                    firebase.database().ref('users/' + user.uid).set({
                        userFirstName: userName,
                        userEmail: userEmail,
                    });

                    //save username to local storage
                    window.localStorage.setItem("the user", userName);

                    console.log("User has successfully signed in!!!" + JSON.stringify(user));
                    console.log(user.uid, user.email )
                    mongoUsers.push({
                    id: user.uid, 
                    email: user.email
                    })
                    console.log(mongoUsers)
                    localStorage.setItem('id', user.uid )


                     API.postMongoUser(mongoUsers)
                        .then(res => {
                        console.log(res)
                        }).catch(err => console.log(err))

                    push('/home', { user: 'Kendrick'}); // 2nd parameter is the state
                } else {
                    console.log("No user signed in...");
                }
            }).catch(function(error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("An error occurred creating the user: " + error.message);
        });
    }

}

export default LandingPage;