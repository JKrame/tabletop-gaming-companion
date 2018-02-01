import React from 'react';
import CharacterCardVertical from '../objects/CharacterCardVertical';
import { NavLink } from 'react-router-dom';

export default class Characters extends React.Component{
    renderCharacterCard() {
        var cards = [];
        var UID = Meteor.userId();
        var characters = CharactersCollection.find({UID: UID}).fetch();
        var numcharacters = characters.length;
        for (var i = 0; i < numcharacters; i++)
        {
            cards.push(
                <NavLink to='#' onClick={() => this.loadCharacter(characters[i])} className='nav-item nav-link'>
                    <CharacterCardVertical key={i} characterName={characters[i].characterName} characterClass={characters[i].characterClass} level={characters[i].level} race={characters[i].race}/>
                </NavLink>
            );
        }
        return <div>{cards}</div>;
    }
    render() {
        Meteor.subscribe('characters');
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