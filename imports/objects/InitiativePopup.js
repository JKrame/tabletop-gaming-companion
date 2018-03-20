import React from 'react'
import UserCard from '../objects/UserCard';
import CharacterCardMini from '../objects/CharacterCardMini';
import { BADQUERY } from 'dns';

var NPCs;

export default class PlayerFormPopup extends React.Component {
    componentWillMount(){
        this.playerFormPopupTracker = Tracker.autorun(() => {
            const sub = Meteor.subscribe('conversations');
            if(sub.ready())
            {
                this.conversations = Conversations.find( {$or: [{"userOne._id": Meteor.userId()}, {"userTwo._id": Meteor.userId()}]}).fetch();
            }

            const sub2 = Meteor.subscribe('userData');
            if(sub2.ready())
            {
                this.users = Meteor.users.find({}).fetch();
            }
            
            const sub3 = Meteor.subscribe('characters');
            if(sub3.ready())
            {
                this.NPCs = Characters.find({ $and: [ { campaignID: { $eq: this.props.campaignID } }, { UID: { $eq: "npc" } } ] }).fetch();
            }

            this.forceUpdate();
        });
    }

    componentWillUnmount(){
        this.playerFormPopupTracker.stop();
    }

    renderContacts() {
        var cards = [];
        if (this.conversations){
            for (var i = 0; i < this.conversations.length; i++){
                partner = (this.conversations[i].userOne._id == Meteor.userId()) ? this.conversations[i].userTwo : this.conversations[i].userOne;
                if (!this.alreadyInvited(partner)){
                    cards.push(
                        <UserCard
                            key={i}
                            username={partner.profile.username}
                            accountPicture={partner.profile.accountPicture}
                            func={this.props.addPlayer}
                            param={partner._id}
                        />
                    );
                }
            }
        }
        return <div>{cards}</div>;
    }

    alreadyInvited(player){
        for (var i = 0; i < this.props.pendingInvites.length; i++){
            if (this.props.pendingInvites[i] == player._id){
                return true;
            }
        }
        for (var i = 0; i < this.props.characters.length; i++){
            if (this.props.characters[i].UID == player._id){
                return true;
            }
        }
        return false;
    }

    renderNPCs()
    {
        var cards = [];
        if (this.NPCs){
            for (var i = 0; i < this.NPCs.length; i++)
            {
                cards.push(
                    <CharacterCardMini
                        key={i}
                        characterImageURL={this.NPCs[i].characterImageURL}
                        id={this.NPCs[i]._id}
                        somehistory={this.props.history}
                        func={this.loadNPC}
                        characterName={this.NPCs[i].characterName}
                        characterClass={this.NPCs[i].characterClass}
                        level={this.NPCs[i].level}
                        race={this.NPCs[i].race}
                    />
                );
            }
        }
        return <div>{cards}</div>;
    }

    renderQtyBoxes()
    {
        var boxes = [];
        for(var i = 0; i < this.NPCs.length; i++)
        {
            boxes.push(
                <input type="text" ref="" className="npc-qty"/>
            );
        }
    }

    addPlayer(userID){
        if (!userID){
            userID = this.refs.username.value;
        }
        this.props.addPlayer(userID);
    }

    render() {
        return (
            <div className='popup'>
                <div className="initiative-popup">
                    <div className="col-xs-2">
                        <h2>Qty</h2>
                        <input type="text" className="npc-qty"/>
                    </div>

                    <div className="col-xs-10"/>
                    <h2>NPCs</h2>

                    {this.renderNPCs()}
                    <button onClick={this.props.closePopup} className=" submit-button button">Cancel</button>
                    <button onClick={this.props.closePopup} className=" submit-button button">Start Combat</button>

                </div>
            </div>
        );
    }
}