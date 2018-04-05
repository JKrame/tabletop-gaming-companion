import React from 'react';
import CharacterCardVertical from '../objects/CharacterCardVertical';
import { NavLink } from 'react-router-dom';
import Header from './Header';


var characters;
var charactersArray;

var SortParameters = Object.freeze({
    DATE_CREATED : 1,
    ALPHABETICAL_A_Z : 2,
    ALPHABETICAL_Z_A : 3,
    LEVEL_HI_LO : 4,
    LEVEL_LO_HI : 5
});

export default class CharactersPage extends React.Component{

    componentWillMount(){
        this.charactersTracker = Tracker.autorun(() => {
            const sub = Meteor.subscribe('characters');
            if(sub.ready())
            {
                var UID = Meteor.userId();
                charactersArray = Characters.find({UID: UID}).fetch();
                if(charactersArray != undefined)
                {
                    this.characters = charactersArray;
                    display = true;
                }         
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
            return;
        }
        else
        {
            sort = SortParameters.DATE_CREATED;
            return this.renderCharacterCard(sort);
        }
    }

    renderCharacterCard(sort) {
        var cards = [];
        var UID = Meteor.userId();
        if(sort == SortParameters.DATE_CREATED)
        {
            //nothing changes
        }
        else if(sort == SortParameters.ALPHABETICAL_A_Z)
        {
            this.characters.sort(function(a, b) {
                var x = a.characterName.toLowerCase();
                var y = b.characterName.toLowerCase();
                if(x < y)
                {
                    return -1;
                }
                if(x > y)
                {
                    return 1;
                }
                return 0;
            });
        }
        else if(sort == SortParameters.ALPHABETICAL_Z_A)
        {
            this.characters.sort(function(a, b) {
                var x = a.characterName.toLowerCase();
                var y = b.characterName.toLowerCase();
                if(x < y)
                {
                    return 1;
                }
                if(x > y)
                {
                    return -1;
                }
                return 0;
            });
        }
        else if(sort == SortParameters.LEVEL_HI_LO)
        {
            this.characters.sort(function(a, b) {
                return b.level - a.level;
            });
        }
        else if(sort == SortParameters.LEVEL_LO_HI)
        {
            this.characters.sort(function(a, b) {
                return a.level - b.level;
            });
        }
        for (var i = 0; i < this.characters.length; i++)
        {
            cards.push(
                <CharacterCardVertical key={i} id={this.characters[i]._id} characterImageURL={this.characters[i].characterImageURL} somehistory={this.props.history} func={this.loadCharacter} characterName={this.characters[i].characterName} characterClass={this.characters[i].characterClass} level={this.characters[i].level} race={this.characters[i].race}/>
            );
        }
        return <div>{cards}</div>;
    }

    loadCharacter(cid, somehistory){
        somehistory.push('/character/edit/' + cid);
    }

    render() {
        Meteor.subscribe('characters');
        return(
            <div className="page-wrapper">
                <div className="col-lg-8 col-lg-offset-2">
                    <div className="page-content col-xs-12 fill-height scrolling-container">
                        <h3>Characters</h3>
                        <hr/>
                        <div className="scrolling-container-80">
                            {this.renderForm()}
                            <NavLink to='#' onClick={() => this.props.func(this.props.id, this.props.somehistory)} className='nav-item nav-link'>
                                <div className="vertical-card col-lg-3 col-md-4 col-sm-6 col-xs-12 highlight-container ">
                                    <div className="vertical-card-contents grow">
                                        <img src={this.props.characterImageURL!=null && this.props.characterImageURL!="" ? this.props.characterImageURL : '/images/add-image-card-icon.png'} className="stretch-image"/>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        );  
    }
}  