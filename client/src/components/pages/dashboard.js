import React from "react";
import { Link, Route } from "react-router-dom";
import { Container, Card, Content, Section, Image, Title, SubTitle} from 'reactbulma';
import $ from "jquery";
import API from "../../api/API.js"


//A better way to add style for cleaner code.
const containerStyle = {
    display:"flex",
    justifyContent:"space-evenly"
};


const Dashboard = ({match}) => {



const findrest = () =>{
    API.getrecentRest().then(function(res){
        console.log(JSON.parse(res.data.restaurantinfo))
        let restaurant = JSON.parse(res.data.restaurantinfo)
        console.log(restaurant)

        return restaurant

    })

}

const findrec = () =>{
    API.getrecentRecs().then(function(res){
        console.log(res.data)

        let recipe = res.data
        return recipe

    })

}

findrest()
findrec()



    return (


    <div>

        {/* page content */}
        <Container style={containerStyle}>
            <Card style={{width:"30%"}} className="restaurantCard">


                <Card.Image src='https://www.abeautifulplate.com/wp-content/uploads/2017/03/roated-beet-salad-orange-avocado-1-12.jpg' square='128by128'  />
                <Card.Content>
                    <Content>
                        <Link to={`${match.url}/find-restaurants`}>Find Restaurants</Link>
                    </Content>
                </Card.Content>

            </Card>

            <Card style={{width:"30%"}} className="restaurantCard">

                <Card.Image src='https://minimalistbaker.com/wp-content/uploads/2015/09/AMAZING-10-Ingredient-Butternut-Squash-and-Vegetable-Pizza-vegan-recipe-pizza-fall-butternutsquash-healthy-dinner.jpg' square='128by128'  />
                <Card.Content>
                    <Content>
                        <Link to={`${match.url}/find-recipes`}>Find Recipes</Link>
                    </Content>
                </Card.Content>

            </Card>

            <Card style={{width:"30%"}} className="restaurantCard">

                <Card.Image src='https://www.abeautifulplate.com/wp-content/uploads/2016/04/vegan-garam-masala-carrot-soup-1-20-600x900.jpg' square='128by128'  />
                <Card.Content>
                    <Content>
                        <Link to={`${match.url}/post-recipes`}>Post Recipes</Link>
                    </Content>
                </Card.Content>

            </Card>
        </Container>

        <Section style={{backgroundColor: "hsl(101,51%,60%)", marginTop:"1.5%"}}>

            <Card style={{display: "flex", justifyContent: "space-evenly", width: "65%",
                margin: "0 auto"}}>

                <Image style = {{width:"75%", margin:"0px"}} src="https://www.vibrantplate.com/wp-content/uploads/2017/05/Soba-noodles-salad-05.jpg" />

                <Container style = {{marginLeft:"5%", marginTop:"4%"}} >
                    <Title>Just added</Title>
                    <SubTitle>
                        Delicious <strong>Springtime Soba Noodles</strong> with mushrooms, carrots, and spinach.
                    </SubTitle>
                </Container>

            </Card>

            <Card style={{display: "flex", justifyContent: "space-evenly", width: "65%",
                margin: "0 auto", marginTop:"1%"}}>

                <Image style = {{width:"75%", margin:"0px"}} src="https://farmpickedforyou.com/wp-content/uploads/2017/08/Veggie-Tacos-Recipe-6.jpg" />

                <Container style = {{marginLeft:"5%", marginTop:"4%"}} >
                    <Title>Recently searched</Title>
                    <SubTitle>
                        Savory <strong>Chickpea Masala</strong> makes for the perfect weeknight dinner.
                    </SubTitle>
                </Container>

            </Card>

        </Section>

        {/*<ul className="nav nav-tabs">*/}
            {/*<li className="home">*/}
                {/*<Link to={`${match.url}`}>Home</Link>*/}
            {/*</li>*/}
            {/*<li className="Login">*/}
                {/*<Link to={`${match.url}/login`}>Login</Link>*/}
            {/*</li>*/}

            {/*<li className="logout">*/}
                {/*<Link to={`${match.url}/logout`}>Logout</Link>*/}
            {/*</li>*/}
        {/*</ul>;*/}
    </div>

    )

}



export default Dashboard;