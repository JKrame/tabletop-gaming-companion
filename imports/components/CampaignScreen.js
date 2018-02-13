import React from 'react';
import { NavLink } from 'react-router-dom';
import {Random} from 'meteor/random';
import ToggleButton from 'react-toggle-button'

import CharacterCard from '../objects/CharacterCardMini';
import CampaignCard from '../objects/CampaignCardMini';

var characters;
var charactersArray;

export default class CampaignScreen extends React.Component{

    componentWillMount(){
        var id = this.props.match.params._id
        var UID = Meteor.userId();
        this.charactersCampaignScreenTracker = Tracker.autorun(() => {
            const sub = Meteor.subscribe('characters');
            console.log(sub.ready());
            if(sub.ready())
            {
                var campaignID = id.toString();
                console.log(campaignID);
                console.log(UID);
                //this.charactersArray = Characters.find({campaignID: campaignID}).fetch();
                this.charactersArray = Characters.find({UID: UID}).fetch();
                if(charactersArray != undefined)
                {
                    this.characters = charactersArray;
                    display = true;
                    console.log(display);
                }              
            }
            this.forceUpdate();
        });
    }

    componentWillUnmount(){
        this.charactersCampaignScreenTracker.stop();
    }

    renderRightSideCharacterForm(){
        if(this.characters == undefined)
        {
            console.log("calling nothing");
            return;
        }
        else
        {
            console.log("calling render character card");
            return this.renderCharacterCard();
        }
    }

    renderCharacterCard() {
        //console.log(Meteor.userId());
        //console.log(Characters._collection._docs._map);
        //myCharacters = Characters.find({_id : "qqL8fF2Yim2GeHTeo"}).fetch();
        //console.log(myCharacters);
        //console.log(Characters.find().fetch());
        //console.log(myCharacters);

        var cards = [];
        var numcharacters = this.characters.length;
        console.log(numcharacters);
        for (var i = 0; i < numcharacters; i++)
        {
            cards.push(
                <CharacterCard key={i} characterImageURL={this.characters[i].characterImageURL} id={this.characters[i]._id} somehistory={this.props.history} func={this.loadCharacter} characterName={this.characters[i].characterName} characterClass={this.characters[i].characterClass} level={this.characters[i].level} race={this.characters[i].race}/>
            );
        }
        return <div>{cards}</div>;
    }
    render() {
        Meteor.subscribe("characters");
        return(
            <div className="page-wrapper">
                <div className="col-md-12">
                    <div className=" game-screen">

                            <div className="sub-content-top">
                                <div className="col-md-3 col-xs-12 content-container-left">
                                        <h3>Initiative</h3>
                                        <hr/>
                                        <div className="scrolling-container-content-top">
                                            {this.renderRightSideCharacterForm()}
                                        </div>

                                        <div className=" col-md-12 bottom-button">
                                            <p className="button-text"><strong>END TURN</strong></p>
                                        </div>
                                </div>

                                <div className="col-md-6 col-xs-12 content-container-mid add-background" >
                                    
                                </div>

                                <div className="col-md-3 col-xs-12 content-container-right">
                                    <h3>Characters</h3>
                                    <hr/>
                                    <div className="scrolling-container">
                                        {this.renderRightSideCharacterForm()}
                                    </div>
                                </div>
                            </div>

                            <div className="sub-content-bottom">

                                <div className="col-md-3 col-xs-12 content-container-left">

                                    </div>

                                    <div className="col-md-6 col-xs-12 content-container-mid" >
                                        <div className="col-md-7  col-xs-12">
                                            <div className="dice-display scrolling-container center">
                                                <div className="dice-panel">
                                                    <img src={'/images/d4.png'} className=""/>
                                                    <input className="rollbox" ref="d4-roller" placeholder="Qty:"/>
                                                </div>
                                                <div className="dice-panel">
                                                    <img src={'/images/d6.png'} className=""/>
                                                    <input className="rollbox" ref="d6-roller" placeholder="Qty:"/>
                                                </div>
                                                <div className="dice-panel">
                                                    <img src={'/images/d8.png'} className=""/>
                                                    <input className="rollbox" ref="d8-roller" placeholder="Qty:"/>    
                                                </div>
                                                <div className="dice-panel">
                                                    <img src={'/images/d10.png'} className=""/>
                                                    <input className="rollbox" ref="d10-roller" placeholder="Qty:"/>
                                                </div>
                                                <div className="dice-panel">
                                                    <img src={'/images/d12.png'} className=""/>
                                                    <input className="rollbox" ref="d12-roller" placeholder="Qty:"/>
                                                </div>
                                                <div className="dice-panel">
                                                    <img src={'/images/d20.png'} className=""/>
                                                    <input className="rollbox" ref="d20-roller" placeholder="Qty:"/>
                                                </div>
                                                <div className="dice-panel">
                                                    <img src={'/images/d100.png'} className=""/>
                                                    <input className="rollbox" ref="d100-roller" placeholder="Qty:"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3  col-xs-12">
                                            <div className="mod-block">
                                                <h4>ADD MODS</h4>
                                                <hr/>
                                                <div>
                                                    <input type="checkbox"/> STR
                                                </div>
                                                <div>
                                                    <input type="checkbox"/> DEX
                                                </div>
                                                <div>
                                                    <input type="checkbox"/> CON
                                                </div>
                                                <div>
                                                    <input type="checkbox"/> INT
                                                </div>
                                                <div>
                                                    <input type="checkbox"/> WIS
                                                </div>
                                                <div>
                                                    <input type="checkbox"/> CHA
                                                </div>
                                                <div>
                                                    <input type="checkbox"/> PROF
                                                </div>
                                            </div>
                                        </div>


                                        <div className="col-md-2  col-xs-12 ">
                                            <div className="bottom-button bottom-align">
                                                <p className="button-text"><strong>ROLL</strong></p>
                                            </div>
                                        </div>
                                    
                                    </div>

                                    <div className="col-md-3 col-xs-12 content-container-right">

                                    </div>
                                </div>
                        </div>
                </div>
            </div>
    );
  }
}  