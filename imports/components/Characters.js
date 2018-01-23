import React from 'react'
import CharacterCardVertical from '../objects/CharacterCardVertical';

export default class Characters extends React.Component{
    renderCharacterCard() {
        var cards = [];
        var numcharacters = 7;
        for (var i = 0; i < numcharacters; i++)
        {
            cards.push(<CharacterCardVertical key={i}/>);
        }
        return <div>{cards}</div>;
    }
    render() {
        return(
        <div className="page-wrapper">
                <div className="col-lg-8 col-lg-offset-2">
                    <div className="page-content col-xs-12 fill-height">
                        <h3>Characters</h3>
                        <hr/>
                        <div className="scrolling-container">
                        {this.renderCharacterCard()}
                        </div>
                        

                        


                    </div>
                </div>
            </div>
        );  
    }
}  