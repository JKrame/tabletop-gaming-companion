import React from 'react';
import { NavLink } from 'react-router-dom';
import {Random} from 'meteor/random';
import ToggleButton from 'react-toggle-button'
//import { Random } from 'meteor/random'

import CharacterCard from '../objects/CharacterCardMini';
import CampaignCard from '../objects/CampaignCardMini';
import ChatWindow from '../objects/ChatWindow';

var characters;
var charactersArray;

export default class CampaignScreen extends React.Component{

    componentWillMount(){
        var id = this.props.match.params._id
        var UID = Meteor.userId();

        this.charactersCampaignScreenTracker = Tracker.autorun(() => {
            const sub = Meteor.subscribe('characters');
            if(sub.ready())
            {
                var campaignID = id.toString();
                this.charactersArray = Characters.find({UID: UID}).fetch();
                if(charactersArray != undefined)
                {
                    this.characters = charactersArray;
                    display = true;
                }              
            }

            const sub2 = Meteor.subscribe('campaigns');
            if(sub2.ready())
            {
                this.campaign = Campaigns.findOne({_id: id});
                console.log(this.campaign);
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
        for (var i = 0; i < numcharacters; i++)
        {
            cards.push(
                <CharacterCard key={i} characterImageURL={this.characters[i].characterImageURL} id={this.characters[i]._id} somehistory={this.props.history} func={this.loadCharacter} characterName={this.characters[i].characterName} characterClass={this.characters[i].characterClass} level={this.characters[i].level} race={this.characters[i].race}/>
            );
        }
        return <div>{cards}</div>;
    }

    renderPanel(){
        console.log(this.campaign);
        if(this.campaign != null)
        {
            
            if(Meteor.userId() == this.campaign.gm){
                console.log("you're the fucking man!");
                return(
                    <div>
                        <div className="spacer col-sm-12"/>
                        <h3>NPCS</h3>
                        <hr/>
    
                        <div className="spacer col-sm-12"/>
                        <h3>Text Assets</h3>
                        <hr/>
    
                        <div className="spacer col-sm-12"/>
                        <h3>Image Assets</h3>
                        <hr/>
                    </div>
                ) ;                                 
            }
            else{
                console.log(this.campaign.gm + " | " + Meteor.userId());
                return(
                    <div> 
                        <h3>Spell Slots</h3>
                        <hr/>
                        <div className="spell-slots scrolling-container" >
                            <div className="spell-slot-panel ">
                                <h5><strong>Level 1</strong></h5>
                                <div className="toggle-box" />
                                <div className="toggle-box" />
                                <div className="toggle-box" />
                                <div className="toggle-box" />
                            </div>
                            <div className="spell-slot-panel ">
                                <h5><strong>Level 2</strong></h5>
                                <div className="toggle-box" />
                                <div className="toggle-box" />
                                <div className="toggle-box" />
                                <div className="toggle-box" />
                            </div>
                            <div className="spell-slot-panel ">
                                <h5><strong>Level 3</strong></h5>
                                <div className="toggle-box" />
                                <div className="toggle-box" />
                                <div className="toggle-box" />
                                <div className="toggle-box" />
                            </div>
                            <div className="spell-slot-panel ">
                                <h5><strong>Level 4</strong></h5>
                                <div className="toggle-box" />
                                <div className="toggle-box" />
                                <div className="toggle-box" />
                                <div className="toggle-box" />
                            </div>
                            <div className="spell-slot-panel ">
                                <h5><strong>Level 5</strong></h5>
                                <div className="toggle-box" />
                                <div className="toggle-box" />
                                <div className="toggle-box" />
                                <div className="toggle-box" />
                            </div>
                            <div className="spell-slot-panel ">
                                <h5><strong>Level 6</strong></h5>
                                <div className="toggle-box" />
                                <div className="toggle-box" />
                                <div className="toggle-box" />
                                <div className="toggle-box" />
                            </div>
                            <div className="spell-slot-panel ">
                                <h5><strong>Level 7</strong></h5>
                                <div className="toggle-box" />
                                <div className="toggle-box" />
                                <div className="toggle-box" />
                                <div className="toggle-box" />
                            </div>
                            <div className="spell-slot-panel ">
                                <h5><strong>Level 8</strong></h5>
                                <div className="toggle-box" />
                                <div className="toggle-box" />
                                <div className="toggle-box" />
                                <div className="toggle-box" />
                            </div>
                            <div className="spell-slot-panel ">
                                <h5><strong>Level 9</strong></h5>
                                <div className="toggle-box" />
                                <div className="toggle-box" />
                                <div className="toggle-box" />
                                <div className="toggle-box" />
                            </div>
                        </div>
                    </div>
                );
            }
        }
        else{return;}
        
    }

    toggleButton_Click(event){
        var clicked = event.target;
        clicked.backgroundColor = red;
    }

    randomDice(max){
       return( Math.floor(Math.random() * max) + 1)
    }

    rollDice(){
        d=null
        dice=0
        if(this.refs.d4roller.value){
            dice=4
            d=this.refs.d4roller.value
        }
        if(this.refs.d6roller.value){
            dice=6
            d=this.refs.d6roller.value
        }
        if(this.refs.d8roller.value){
            dice=8
            d=this.refs.d8roller.value
        }
        if(this.refs.d10roller.value){
            dice=10
            d=this.refs.d10roller.value
        }
        if(this.refs.d12roller.value){
            dice=12
            d=this.refs.d12roller.value
        }
        if(this.refs.d20roller.value){
            dice=20
            d=this.refs.d20roller.value
        }
        result=0
        for(i=0;i<d;i++){
            result = result + this.randomDice(dice)
        }
        console.log(result)
        this.refs.d4roller.value=""
        this.refs.d6roller.value=""
        this.refs.d8roller.value=""
        this.refs.d10roller.value=""
        this.refs.d12roller.value=""
        this.refs.d20roller.value=""

    }

    render() {
        Meteor.subscribe("characters");

        return(
            <div className="page-wrapper">
                <div className="col-md-12">
                    <div className=" game-screen">

                            <div className="sub-content-top">
                                <div className="col-md-3 col-xs-12 content-container-left">
                                        <div className="spacer col-sm-12"/>

                                        <h3>Initiative</h3>
                                        <hr/>
                                        <div className="scrolling-container-content-top">
                                            {this.renderRightSideCharacterForm()}
                                        </div>

                         
                                        
                                        <div className="col-sm-12">
                                            <button className="full-width submit-button ">END TURN</button>
                                        </div>
                                </div>

                                <div className="col-md-6 col-xs-12 content-container-mid add-background" >

                                </div>

                                <div className="col-md-3 col-xs-12 content-container-right">
                                    <div className="spacer col-sm-12"/>
                                    <h3>Characters</h3>
                                    <hr/>
                                    <div className="scrolling-container">
                                        {this.renderRightSideCharacterForm()}
                                    </div>
                                </div>
                            </div>

                            <div className="sub-content-bottom">

                                <div className="col-md-3 col-xs-12 content-container-left  no-padding">
                                    <div className="col-sm-4 in-game-chat-btn-container scrolling-container">
                                        <div className="spacer col-sm-12"/>
                                        
                                        <button className="in-game-chat-btn blue-button">USERNAME 1</button>
                                        <button className="in-game-chat-btn blue-button">USERNAME 1</button>
                                        <button className="in-game-chat-btn blue-button">USERNAME 1</button>
                                        <button className="in-game-chat-btn blue-button">USERNAME 1</button>
                                        <button className="in-game-chat-btn blue-button">USERNAME 1</button>
                                        <button className="in-game-chat-btn blue-button">USERNAME 1</button>
                                      
                                        <div className="spacer col-sm-12"/>
                                        
                                    </div>
                                    <div className="col-sm-8 no-padding">
                                        <div className="scrolling-container chat-box in-game-chat-window">
                                            <ChatWindow/>

                                        </div>
                                        <div className="col-sm-12 negate-margins" style={{"height":"50px", "marginTop":"10px"}}>
                                            <div className="col-sm-8">
                                                    <textarea rows={4} className="full-width"  style={{"height":"50px"}}/>
                                                </div>
                                                <div className="col-sm-4 negate-margins">
                                                        <button className="full-width blue-button" style={{"height":"50px"}}>SEND</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                   

                                    <div className="col-md-6 col-xs-12 content-container-mid" >
                                        <div className="col-md-7  col-xs-12">
                                            <div className="dice-display scrolling-container center">
                                               <div className="spacer col-sm-12"/>

                                                <div className="dice-panel">
                                                    <img src={'/images/d4.png'} className=""/>
                                                    <input className="rollbox" ref="d4roller" placeholder="Qty:"/>
                                                </div>
                                                <div className="dice-panel">
                                                    <img src={'/images/d6.png'} className=""/>
                                                    <input className="rollbox" ref="d6roller" placeholder="Qty:"/>
                                                </div>
                                                <div className="dice-panel">
                                                    <img src={'/images/d8.png'} className=""/>
                                                    <input className="rollbox" ref="d8roller" placeholder="Qty:"/>    
                                                </div>
                                                <div className="dice-panel">
                                                    <img src={'/images/d10.png'} className=""/>
                                                    <input className="rollbox" ref="d10roller" placeholder="Qty:"/>
                                                </div>
                                                <div className="dice-panel">
                                                    <img src={'/images/d12.png'} className=""/>
                                                    <input className="rollbox" ref="d12roller" placeholder="Qty:"/>
                                                </div>
                                                <div className="dice-panel">
                                                    <img src={'/images/d20.png'} className=""/>
                                                    <input className="rollbox" ref="d20roller" placeholder="Qty:"/>
                                                </div>
                                                <div className="dice-panel">
                                                    <img src={'/images/d100.png'} className=""/>
                                                    <input className="rollbox" ref="d100roller" placeholder="Qty:"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3  col-xs-12">
                                            <div className="spacer col-sm-12"/>
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
                                            <div className="col-sm-12">
                                                <button className="full-width submit-button blue-button" style={{"height":"80px", "marginTop":"20px"}} onClick={this.rollDice.bind(this)}>ROLL</button>
                                            </div>
                                        </div>
                                    
                                    </div>

                                    <div className="col-md-3 col-xs-12 content-container-right scrolling-container">
                                        
                                        {this.renderPanel()}


                                    </div>
                                </div>
                        </div>
                </div>
            </div>
    );
  }
}  