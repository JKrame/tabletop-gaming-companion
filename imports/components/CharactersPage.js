import React from 'react';
import CharacterCardVertical from '../objects/CharacterCardVertical';
import { NavLink } from 'react-router-dom';

var characters;
var charactersArray;

export default class CharactersPage extends React.Component{

    componentWillMount(){
        console.log("cs > componentDidMount");
        this.charactersTracker = Tracker.autorun(() => {
            const sub = Meteor.subscribe('characters');
            console.log("cs > componentDidMount > tracker");
            console.log(sub.ready());
            if(sub.ready())
            {
                var UID = Meteor.userId();
                charactersArray = Characters.find({UID: UID}).fetch();
                if(charactersArray != undefined)
                {
                    this.characters = charactersArray;
                    display = true;
                    console.log("characters not undefined anymroe");
                }
                console.log("componentDidMount cs");                
            }
            this.forceUpdate();
        });
    }

    componentWillUnmount(){
        this.charactersTracker.stop();
    }

    renderForm(){
        if(this.characters == undefined)
        {
            console.log("calling nothing");
            return;
        }
        else
        {
            console.log("calling renderCharacterCard");
            return this.renderCharacterCard();
        }
    }

    renderCharacterCard() {
        var cards = [];
        var UID = Meteor.userId();
        for (var i = 0; i < this.characters.length; i++)
        {
            cards.push(
                <CharacterCardVertical key={i} id={this.characters[i]._id} somehistory={this.props.history} func={this.loadCharacter} characterName={this.characters[i].characterName} characterClass={this.characters[i].characterClass} level={this.characters[i].level} race={this.characters[i].race}/>
            );
        }
        return <div>{cards}</div>;
    }

    loadCharacter(cid, somehistory){
        console.log("loadcharacter");
        somehistory.push('/character/edit/' + cid);
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
                            {this.renderForm()}
                        </div>
                    </div>
                </div>
            </div>
        );  
    }
}  