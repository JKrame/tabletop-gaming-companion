import React from 'react';
import { NavLink } from 'react-router-dom';
import {Random} from 'meteor/random';
import ToggleButton from 'react-toggle-button'

import Header from './Header';
//import { Random } from 'meteor/random'

import CharacterCard from '../objects/CampaignCharacterTile';
import CampaignCard from '../objects/CampaignCardMini';
import ChatWindow from '../objects/ChatWindow';
import TextAssetcard from '../objects/TextAssetCard';
import ImageAssetCard from '../objects/ImageAssetCard';
import NPCCard from '../objects/NPCcard';
import InitiativePopup from '../objects/InitiativePopup';
import {ToastContainer, ToastStore} from 'react-toasts';
import UserCard from '../objects/UserCard';

export default class CampaignScreen extends React.Component{
    constructor() {
        super();
        this.state = {
            isGm: false,
            showInitiativePopup: false,
            conversation: null
        };
    }

    toggleInitiativePopup(){
        this.setState({showInitiativePopup: !this.state.showInitiativePopup});
    }

    componentWillMount(){
        console.log("props");
        console.log(this.props);
        var id = this.props.match.params._id;
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
                console.log(id);
                this.campaign = Campaigns.findOne({_id: id});
                console.log(this.campaign);
                if(this.userID == this.campaign.gm)
                {
                    this.setState({
                        isGm: true
                    });
                }
                else{
                    if (this.characters){
                        for (i = 0; i < this.characters.length; i++){
                            if (this.characters[i].campaignID == this.campaign._id && this.characters[i].UID == Meteor.userId()){
                                this.myCharacter = this.characters[i];
                            }
                        }
                    }
                }
            }

            const sub3 = Meteor.subscribe('conversations');
            if(sub3.ready())
            {
                id = Meteor.userId();
                this.conversations = Conversations.find().fetch();
                if (this.state.conversation != null){
                    for(i = 0; i < this.conversations.length; i++){
                        if (this.conversations[i]._id == this.state.conversation._id){
                            this.setState({conversation: this.conversations[i]});
                        }
                    }
                }
            }

            const sub4 = Meteor.subscribe('userData');
            if(sub4.ready()){
                this.user = Meteor.users.findOne({_id : Meteor.userId()});
            }

            this.forceUpdate();
        });
    }

    componentWillUnmount(){
        this.charactersCampaignScreenTracker.stop();
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
                <div className="broadcast-asset">
                    <h1>{this.campaign.currentBroadcastItem.noteTitle}</h1>
                    <h3>{this.campaign.currentBroadcastItem.noteDescription}</h3>
                </div>
            );
        }

        if(this.campaign.currentBroadcastType == "image")
        {
            return (
                <div className="broadcast-asset">
                    <div>
                        <NavLink to={this.campaign.currentBroadcastItem} target="_blank" ><img src={this.campaign.currentBroadcastItem == null || this.campaign.currentBroadcastItem == "" ? '/images/addIcon.png' : this.campaign.currentBroadcastItem} className="broadcast-item" /></NavLink>
                    </div>
                </div>
            );
        }

        if(this.campaign.currentBroadcastType == "npc")
        {
            return (
                <div className="broadcast-asset">
                    <NavLink to={this.campaign.currentBroadcastItem.characterImageURL} target="_blank" ><img src={this.campaign.currentBroadcastItem.characterImageURL} className="broadcast-item" /></NavLink>
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

                        <div className="spacer col-sm-12"/>
                        <button onClick={this.clearBroadcast.bind(this)} className="submit-button col-xs-12">Clear Broadcast</button>
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
       return( Math.floor(Math.random() * max) + 1);
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
            result = result + this.randomDice(dice);
        }
        if(Meteor.userId() == this.campaign.gm){
            console.log("gm rolled")
            ToastStore.warning("The GM rolled a " + result);
        }
        else{
            console.log("character rolled")
            ToastStore.warning(this.myCharacter.characterName + " rolled a " + result);
        }
        
        this.refs.d4roller.value=""
        this.refs.d6roller.value=""
        this.refs.d8roller.value=""
        this.refs.d10roller.value=""
        this.refs.d12roller.value=""
        this.refs.d20roller.value=""

    }

    renderInitiativeOrder(){
        isSorted = true;
        prev = Number.MAX_SAFE_INTEGER;
        cards = [];

        if (this.campaign && this.characters){
            for (i = 0; i < this.campaign.turnOrder.length; i++){
                index = (i + this.campaign.turnIndex) % this.campaign.turnOrder.length;

                if (this.campaign.turnOrder[index].initiative > prev){
                    isSorted = false;
                    break;
                }

                for (j = 0; j < this.characters.length; j++){
                    if (this.campaign.turnOrder[index].cid == this.characters[j]._id){
                        cards.push(
                            <CharacterCard
                            key={i}
                            characterImageURL={this.characters[j].characterImageURL} 
                            id={this.characters[j]._id} 
                            somehistory={this.props.history} 
                            func={this.loadCharacter} 
                            characterName={this.characters[j].characterName} 
                            characterClass={this.characters[j].characterClass} 
                            level={this.characters[j].level} 
                            race={this.characters[j].race}
                            />
                        );
                    }
                }
            }

            if (Meteor.userId() == this.campaign.gm && !isSorted){
                this.sortTurnOrder()
            }

            return <div>{cards}</div>;
        }

        return null;
    }

    sortTurnOrder(){
        newTurnOrder = this.campaign.turnOrder;
        newTurnOrder.sort(this.compareInitiative);
        Meteor.call('campaigns.setTurnOrder', this.campaign._id, newTurnOrder);
    }

    compareInitiative(a, b){
        if (a.initiative < b.initiative){
            return -1;
        }
        if (a.initiative > b.initiative){
            return 1;
        }
        if (a.dex < b.dex){
            return -1;
        }
        if (a.dex > b.dex){
            return 1;
        }
        return Math.random() >= 0.5;
    }

    startCombat() {
        this.toggleInitiativePopup();
        Meteor.call("campaigns.startCombat", this.campaign._id);
    }

    endCombat() {
        Meteor.call("campaigns.endCombat", this.campaign._id);
    }

    endTurn() {
        Meteor.call("campaigns.endTurn", this.campaign._id, (this.campaign.turnIndex + 1) % this.campaign.turnOrder.length)
    }

    showInitiativeButton(){
        if (this.campaign.combat && Meteor.userId() != this.campaign.gm && !this.alreadyInInitiative()){
            return <button className="full-width submit-button blue-button" style={{"height":"80px", "marginTop":"20px", "backgroundColor":"limegreen"}} onClick={this.rollInitiative.bind(this)}>INITIATIVE</button>;
        }
        else{
            return null;
        }
    }

    rollInitiative(){
        if (this.alreadyInInitiative()){
            return;
        }

        dex = this.myCharacter.attributes[1];
        val = Math.floor(Math.random() * 20) + 1 + dex;
        Meteor.call('campaigns.addToTurnOrder', this.campaign._id, this.myCharacter._id, val, dex);
    }

    alreadyInInitiative(){
        if (this.campaign && this.myCharacter){
            for (i = 0; i < this.campaign.turnOrder.length; i++){
                if (this.campaign.turnOrder[i].cid == this.myCharacter._id){
                    return true;
                }
            }
        }

        return false;
    }

    renderEndCombatButton(){
        if (this.campaign.combat && this.campaign.gm == Meteor.userId()){
            return (
                <div className="col-sm-12">
                    <button className="full-width submit-button" onClick={this.endCombat.bind(this)}>END COMBAT</button>
                </div>
            );
        }
    }

    renderEndTurnButton(){
        if (this.campaign.combat && 
            this.campaign.turnOrder.length > 0 && 
            (this.campaign.gm == Meteor.userId() || this.campaign.turnOrder[this.campaign.turnIndex].cid == this.myCharacter._id)
        ){
            return (
                <div className="col-sm-12">
                    <button className="full-width submit-button " onClick={this.endTurn.bind(this)}>END TURN</button>
                </div>
            );
        }
    }

    renderStartCombatButton(){
        if (!this.campaign.combat && this.campaign.gm == Meteor.userId()){
            return (
                <div className="col-sm-12">
                    <button className="full-width submit-button blue-button " onClick={this.startCombat.bind(this)}>START COMBAT</button>
                </div>
            );
        }
    }

    sendMessage(){
        if (this.state.conversation){
            message = this.refs.messageBox.value;
            Meteor.call('conversations.sendMessage', this.state.conversation._id, message);
            this.loadConversation(this.state.conversation);
        }
    }

    loadConversation(conversation) {
        if (conversation){ 
            this.setState({conversation: conversation});

            this.forceUpdate();
        }
    }

    establishContact(){
    }

    renderContacts() {
        if (!this.conversations){
            return;
        }

        var cards = [];
        if (this.conversations){
            for (var i = 0; i < this.conversations.length; i++){
                partner = (this.conversations[i].participants[0].id == Meteor.userId()) ? this.conversations[i].participants[1] : this.conversations[i].participants[0];
                cards.push(<UserCard 
                    key={i} 
                    username={partner.name} 
                    accountPicture={partner.accountPicture} 
                    param={this.conversations[i]} 
                    func={this.loadConversation.bind(this)}/>);
            }
        }

        return <div>{cards}</div>;
    }

    loadConversation(conversation) {
        if (conversation){ 
            this.setState({conversation: conversation});
            this.forceUpdate();
        }
    }

    sendMessage(){
        if (this.state.conversation){
            message = this.refs.messageBox.value;
            Meteor.call('conversations.sendMessage', this.state.conversation._id, message);
            this.loadConversation(this.state.conversation);
        }
    }

    render() {
        if (!this.characters || !this.campaign){
            return null;
        }
        return(
            <div className="page-wrapper">
                <Header/>
                <div className="col-md-12">
                    <div className=" game-screen">

                            <div className="col-lg-3  col-xs-12 top-content content-container-left">
                                <div className="inner-content-container">
                                    <div className="spacer col-sm-12"/>

                                    <h3>Initiative</h3>
                                    <hr/>
                                    <div className="scrolling-container initiative">
                                        {this.renderInitiativeOrder()}
                                    </div>


                                    {this.renderEndTurnButton()}
                                    {this.renderEndCombatButton()}
                                    {this.renderStartCombatButton()}                                   
                                </div>
                            </div>
                                
                            <div className="col-lg-6 col-xs-12 top-content content-container-mid scrolling-container add-background">
                                <div className="broadcast-screen">
                                    <div className="broadcast-object" >
                                        <ToastContainer store={ToastStore}/>
                                        {this.broadcastCurrentAsset()}
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3  col-xs-12 top-content content-container-left">
                                <div className="inner-content-container">
                                    <div className="spacer col-sm-12"/>
                                    <h3>Characters</h3>
                                    <hr/>
                                    <div className="scrolling-container-content-top">
                                        {this.renderCharacterCard()}
                                    </div>
                                </div>
                            </div>


                    <div className="spacer col-sm-12"/>
                            

                    <div className="sub-content-bottom col-lg-3 col-xs-12 content-container-left  no-padding">
                        <div className="inner-content-container">
                            <div className="col-sm-4 in-game-chat-btn-container scrolling-container">
                                <div className="spacer col-sm-12"/>
                                
                                {this.renderContacts()}
                                
                                <div className="spacer col-sm-12"/>
                                
                            </div>
                            <div className="col-sm-8 no-padding">
                                <div className="scrolling-container chat-box in-game-chat-window">
                                <ChatWindow conversation={this.state.conversation}/>

                                </div>
                                <div className="col-sm-12 negate-margins" style={{"height":"50px", "marginTop":"10px"}}>
                                    <div className="col-sm-8">
                                            <textarea rows={4} ref="messageBox" className="full-width"  style={{"height":"50px"}}/>
                                        </div>

                                        <div className="col-sm-4 negate-margins">
                                                <button  onClick={this.sendMessage.bind(this)} className="full-width blue-button" style={{"height":"50px"}}>SEND</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>





                            <div className="sub-content-bottom col-lg-6 col-xs-12 content-container-mid add-background">
                                <div className="inner-content-container" >
                                    <div className="col-md-7  col-xs-12">
                                        <div className="dice-display scrolling-container center">
                                            <div className="spacer col-sm-12"/>

                                            <div className="dice-panel">
                                                <img src={'/images/d4.png'} className="dice-img"/>
                                                <input className="rollbox" ref="d4roller" placeholder="Qty:"/>
                                            </div>
                                            <div className="dice-panel">
                                                <img src={'/images/d6.png'} className="dice-img"/>
                                                <input className="rollbox" ref="d6roller" placeholder="Qty:"/>
                                            </div>
                                            <div className="dice-panel">
                                                <img src={'/images/d8.png'} className="dice-img"/>
                                                <input className="rollbox" ref="d8roller" placeholder="Qty:"/>    
                                            </div>
                                            <div className="dice-panel">
                                                <img src={'/images/d10.png'} className="dice-img"/>
                                                <input className="rollbox" ref="d10roller" placeholder="Qty:"/>
                                            </div>
                                            <div className="dice-panel">
                                                <img src={'/images/d12.png'} className="dice-img"/>
                                                <input className="rollbox" ref="d12roller" placeholder="Qty:"/>
                                            </div>
                                            <div className="dice-panel">
                                                <img src={'/images/d20.png'} className="dice-img"/>
                                                <input className="rollbox" ref="d20roller" placeholder="Qty:"/>
                                            </div>
                                            <div className="dice-panel">
                                                <img src={'/images/d100.png'} className="dice-img"/>
                                                <input className="rollbox" ref="d100roller" placeholder="Qty:"/>
                                            </div>
                                        </div>
                                    </div>
                                
                                    <div className="col-sm-3  col-xs-12">
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
                                            {this.showInitiativeButton()}
                                        </div>
                                    </div>
                                
                                </div>
                            </div>

                            <div className="sub-content-bottom col-lg-3 col-xs-12 content-container-right  no-padding">
                                <div className=" inner-content-container scrolling-container">
                                    
                                    {this.renderPanel()}


                                </div>
                            </div>

                    {this.state.showInitiativePopup ? 
                        <InitiativePopup
                            text='Close Me'
                            closePopup={this.toggleInitiativePopup.bind(this)}
                        />
                        : null
                        }
                        
                </div>
            </div>
        </div>
    );
  }
}  