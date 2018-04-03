import React from 'react';
import ReactDOM from 'react-dom';
import UserCard from '../objects/UserCard';
import CharacterCardMini from '../objects/CharacterCardMini';
import { BADQUERY } from 'dns';
import NPCCard from '../objects/NPCInitiativeCard';
import { Random } from 'meteor/random';

var NPCs;

export default class InitiativePopup extends React.Component {

    constructor(props, context){
        super(props, context);
        this.endCombat = this.endCombat.bind(this);
        this.createActiveNPCs = this.createActiveNPCs.bind(this);
    }

    componentWillMount(){
        this.initiativePopupTracker = Tracker.autorun(() => {
            const sub = Meteor.subscribe('characters');
            if(sub.ready())
            {
                this.NPCs = Characters.find({ $and: [ { campaignID: { $eq: this.props.campaignID } }, { UID: { $eq: "npc" } } ] }).fetch();
            }

            this.forceUpdate();
        });
    }

    componentWillUnmount(){
        this.initiativePopupTracker.stop();
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
                <input keyj={i} type="text" ref={"npc" + i} className="npc-qty textBoxMini"/>
            );
        }
        return <div>{boxes}</div>;
    }

    endCombat()
    {
        this.props.endCombat();
        this.props.closePopup();
    }

    createActiveNPCs()
    {
        for(var i = 0; i < this.NPCs.length; i++)
        {
            var refID = "npc" + i;
            var numCopies = ReactDOM.findDOMNode(this.refs[refID]).value;
            var dex = this.NPCs[i].attributes[1];

            for(var j = 0; j < numCopies; j++)
            {
                var unique_id = Random.id();
                var initiative = Math.floor(Math.random() * 20) + 1 + dex;
                var name = this.NPCs[i].characterName;
                this.NPCs[i].characterName = name + j;

                Meteor.call("campaignsActiveNPCs.addToSet",
                    this.props.campaignID,
                    this.NPCs[i],
                    unique_id
                );

                this.NPCs[i].characterName = name;

                //console.log(this.props.campaignID);
                //console.log(unique_id);
                Meteor.call('campaigns.addToTurnOrder',
                    this.props.campaignID,
                    unique_id,
                    initiative,
                    dex,
                    0,
                    true
                );
            }
        }

        this.props.closePopup();
    }

    render() {
        return (
            <div className='popup'>
                <div className="initiative-popup">
                    <div className="col-xs-2">
                        <h2>Qty</h2>
                        {this.renderQtyBoxes()}
                    </div>

                    <div className="col-xs-10">
                        <h2>NPCs</h2>

                        {this.renderNPCs()}
                    </div>
                    <div className="spacer col-xs-12"/>
                    <button onClick={this.endCombat} className=" submit-button button">Cancel</button>
                    <button onClick={this.createActiveNPCs} className=" submit-button button">Start Combat</button>

                </div>
            </div>
        );
    }
}