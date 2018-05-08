import React, { Component } from "react";
import {Card, Content, Container, Section, SubTitle} from 'reactbulma'


class Posts extends Component {

    constructor(props) {
        super(props)
        
    }


    render() {
        return (

            this.props.results.map((recipeposted,key) => {
                                    return (
                                        <div>
                                          <a href={recipeposted.link}> <SubTitle><strong>{recipeposted.title}</strong></SubTitle></a>
                                           <ul>
                                           {this.props.results[key].ingredients.map(ingred => {
                                                return(
                                                        <div>
                                                       <li>{ingred.ingredient}</li>
                                                       </div> 
                                                   )
                                            })}

                                           </ul>
                                           <strong><p>How to Make?</p></strong><p> {recipeposted.instructions}</p>
                                           <br></br>
                                           <br></br>
                                        </div>
                                    )
                                })
            )
    }
};
export default Posts;