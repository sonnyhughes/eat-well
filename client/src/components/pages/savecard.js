import React, { Component } from "react";
import { Section, Container, Title, SubTitle, Input, Button, Hero, Card, Content, Icon} from 'reactbulma'


class Saves extends Component {

    constructor(props) {
        super(props)        
    }

    render() {
        return (
            this.props.results.map(recipesaved => {
                return (
                    <div style={{display:"inline-block", width:"40%", margin:"5%" }}>
                        <Card>
                            <Card.Image src={recipesaved.image}  />
                            <Card.Header>
                                <Card.Header.Title>
                                    <a target="_blank" href={recipesaved.url}>
                                    <SubTitle>{recipesaved.name}</SubTitle></a>
                                </Card.Header.Title>
                            </Card.Header>
                        </Card>
                    </div>
                )
            })
        )
    }
};

export default Saves;
