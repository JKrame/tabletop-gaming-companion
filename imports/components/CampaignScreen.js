import React from 'react';
import { NavLink } from 'react-router-dom';
import {Random} from 'meteor/random';
import ToggleButton from 'react-toggle-button'
//import { Random } from 'meteor/random'

import CharacterCard from '../objects/CampaignCharacterTile';
import CampaignCard from '../objects/CampaignCardMini';
import ChatWindow from '../objects/ChatWindow';
import TextAssetcard from '../objects/TextAssetCard';
import ImageAssetCard from '../objects/ImageAssetCard';
import NPCCard from '../objects/NPCcard';


var characters;
var NPCs;

export default class CampaignScreen extends React.Component{

    componentWillMount(){
        var id = this.props.match.params._id
        var UID = Meteor.userId();

        this.charactersCampaignScreenTracker = Tracker.autorun(() => {
            const sub = Meteor.subscribe('characters');
            if(sub.ready())
            {
                var campaignID = id.toString();
                //this.characters = Characters.find({campaignID: campaignID}).fetch();
                this.characters = Characters.find({ $and: [ { campaignID: { $eq: campaignID } }, { UID: { $ne: "npc" } } ] }).fetch();
                this.NPCs = Characters.find({ $and: [ { campaignID: { $eq: campaignID } }, { UID: { $eq: "npc" } } ] }).fetch();
            }
            const sub2 = Meteor.subscribe('campaigns');
            if(sub2.ready())
            {
                this.campaign = Campaigns.findOne({_id: id});
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
            return;
        }
        else
        {
            return this.renderCharacterCard();
        }
    }

    renderNPCs() {
        var cards = [];
        for (var i = 0; i < this.NPCs.length; i++)
        {
            cards.push(<NPCCard
                key={i}
                func={this.setBroadcastAssetNPC.bind(this)}
                NPC={this.NPCs[i]}
                somehistory={this.props.history}
                />
            );
        }
        return <div>{cards}</div>;
    }

    renderTextAssets() {
        var cards = [];
        for (var i = 0; i < this.campaign.notes.length; i++)
        {
            cards.push(<TextAssetcard
                key={i}
                func={this.setBroadcastAssetText.bind(this)}
                noteTitle={this.campaign.notes[i][0]}
                noteDescription={this.campaign.notes[i][1]}
                id={this.campaign._id}
                isCampaignScreen={true}
                />
            );
        }
        return <div>{cards}</div>;
    }

    setBroadcastAssetImage(url)
    {
        this.campaign.currentBroadcastItem = url;
        this.campaign.currentBroadcastType = "image";
        Meteor.call('campaigns.broadcastUpdate', this.campaign._id, url, "image");
    }
    
    setBroadcastAssetText(noteTitle, noteDescription)
    {
        this.campaign.currentBroadcastItem = {noteTitle, noteDescription};
        this.campaign.currentBroadcastType = "text";
        Meteor.call('campaigns.broadcastUpdate', this.campaign._id, {noteTitle, noteDescription}, "text");
    }

    setBroadcastAssetNPC(NPC)
    {
        this.campaign.currentBroadcastItem = NPC;
        this.campaign.currentBroadcastType = "npc";
        Meteor.call('campaigns.broadcastUpdate', this.campaign._id, NPC, "npc");
    }

    clearBroadcast()
    {
        this.campaign.currentBroadcastItem = "";        
        this.campaign.currentBroadcastType = "";
        Meteor.call('campaigns.broadcastUpdate', this.campaign._id, "", "");
    }

    broadcastCurrentAsset()
    {
        if(!this.campaign || this.campaign.currentBroadcastItem == "" || this.campaign.currentBroadcastItem == null)
        {
            return null;
        }

        if(this.campaign.currentBroadcastType == "text")
        {           
            return (
                <div>
                    <p className="p-override no-margin-override small-text full-width"> {this.campaign.currentBroadcastItem.noteTitle}  {this.campaign.currentBroadcastItem.noteDescription}</p>
                </div>
            );
        }

        if(this.campaign.currentBroadcastType == "image")
        {
            return (
                <div>
                    <div>
                        <img src={this.campaign.currentBroadcastItem == null || this.campaign.currentBroadcastItem == "" ? '/images/addIcon.png' : this.campaign.currentBroadcastItem} className="image-asset-img" />
                    </div>
                </div>
            );
        }

        if(this.campaign.currentBroadcastType == "npc")
        {
            return (
                <div>
                    <img src={this.campaign.currentBroadcastItem.characterImageURL} />
                </div>
            );
        }
    }

    renderImageAssets() {
        var cards = [];
        for (var i = 0; i < this.campaign.URLs.length; i++)
        {
            cards.push(<ImageAssetCard
                key={i}
                URL={this.campaign.URLs[i]}
                func={this.setBroadcastAssetImage.bind(this)}
                _id={this.id}
                campaignID={this.campaign._id}
                isCampaignScreen={true}
                />
            );
        }
        return <div>{cards}</div>;
    }

    renderCharacterCard() {
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
        if(this.campaign != null)
        {
            
            if(Meteor.userId() == this.campaign.gm){
                return(
                    <div>
                        <div className="spacer col-sm-12"/>
                        <h3>NPCS</h3>
                        <hr/>
                        {this.renderNPCs()}

                        <div className="spacer col-sm-12"/>
                        <h3>Text Assets</h3>
                        <hr/>
                        {this.renderTextAssets()}

                        <div className="spacer col-sm-12"/>
                        <h3>Image Assets</h3>
                        <hr/>
                        {this.renderImageAssets()}
                        <button onClick={this.clearBroadcast.bind(this)}>Clear Broadcast</button>
                    </div>
                ) ;                                 
            }
            else{
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
                                    {this.broadcastCurrentAsset()}
                                </div>

                                <div className="col-md-3 col-xs-12 content-container-right">
                                    <div className="spacer col-sm-12"/>
                                    <h3>Characters</h3>
                                    <hr/>
                                    <div className="scrolling-container-content-top">
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