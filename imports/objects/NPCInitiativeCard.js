import React from 'react'
import { NavLink } from 'react-router-dom';

export default class InitiativeCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            currHP : 0,
            maxHP : 1,
            percent : 0
        }
    }

    componentWillMount(){
        if (!this.props.character){
            return;
        }

        var max = this.props.character.maxHP == 0 ? 1 : this.props.character.maxHP;

        this.setState({maxHP : max});
        this.setState({currHP : this.props.character.currHP});
        //this.tempHP = this.props.character.tempHP;

        //this.percent = (Number(currHP) + Number(tempHP)) / Number(maxHP);
        this.setState({percent : (Number(this.props.character.currHP) / Number(max) * 100) + "%"});
        //this.percent = (this.percent*100) + "%";
    }

    renderSpellSlots(){
        if (!this.props.character){
            return null;
        }

        if (Meteor.userId() != this.props.gm){
            return null;
        }

        var spellSlotContainers = [];
        var spellSlots;
        for(var i = 0; i < this.props.character.spellSlotsCurr.length; i++)
        {
            spellSlots = [];
            for(var j = 0; j < this.props.character.spellSlotsMax[i]; j++)
            {
                if(j < this.props.character.spellSlotsCurr[i])
                {
                    spellSlots.push(<div className="spell-slot"></div>)
                }
                else
                {
                    spellSlots.push(<div className="empty-spell-slot"></div>)
                }
            }

            if(spellSlots.length != 0)
            {
                spellSlotContainers.push(<div className="spell-slot-container">{spellSlots}</div>);
            }
        }

        return <div className="col-xs-12 ">{spellSlotContainers}</div>;
    }

    renderHealthBar(){
        if (Meteor.userId() != this.props.gm){
            return null;
        }
        
        return (
            <div className="col-xs-12 no-margin-override no-padding">
                <div className="col-xs-10 no-margin-override">
                    <div className="full-width" style={{"backgroundColor":"Grey", "height":"15px", "display":"relative", "overflow":"hidden"}}>
                        <div style={{"backgroundColor":"red", "height":"15px", "width": this.state.percent}}/>
                    </div>
                </div>
                <div className="col-xs-2 no-margin-override">
                    <p>{this.state.currHP + "/" + this.state.maxHP}</p>
                </div>
            </div>
        );
    }

    renderHealthControls(){
        if (Meteor.userId() != this.props.gm){
            return null;
        }

        return (
            <div>
                <button className="inc-button" onClick={() => this.lowerHealth(this.props.character)}>-</button>
                <input className="spellbox" ref="healthBox" defaultValue={this.state.currHP} onChange={() => this.setHealth(this.props.character).bind(this)} placeholder=""/>
                <button className="inc-button" onClick={() => this.raiseHealth(this.props.character)}>+</button>
            </div>
        );
    }

    raiseHealth(character){
        /*if (character.currHP >= character.maxHP){
            Meteor.call("campaigns.updateTempHealth", this.campaignID, character, character.tempHP - 0 + 1);
        }
        else{
            Meteor.call("campaigns.updateCurrHealth", this.campaignID, character, Number(character.currHP) + 1);
        }*/

        this.setHealth(character, this.state.currHP - 0 + 1);        
    }

    lowerHealth(character){
        /*if (character.tempHP > 0){
            Meteor.call("campaigns.updateTempHealth", this.campaignID, character, character.tempHP - 1);
        }
        else{
            Meteor.call("campaigns.updateCurrHealth", this.campaignID, character, character.currHP - 1);
        }*/

        this.setHealth(character, this.state.currHP - 1);
    }

    setHealth(character, value){
        if (!value){
            value = Number(this.refs.healthBox.value);
            console.log(value);
        }

        Meteor.call("campaigns.updateCurrHealth", this.props.campaignID, character, value);
        this.refs.healthBox.value = Number(value);
        this.setState({currHP : value});
        this.setState({percent : (value / this.state.maxHP * 100) + "%"})

        //if (value > character.maxHP){
            //Meteor.call("campaigns.updateTempHealth", this.campaignID, character, value - character.maxHP);
            //Meteor.call("campaigns.updateCurrHealth", this.campaignID, character, character.maxHP);
       // }
        //else{
        //}
    }

    removeFromInitiative(){
        Meteor.call('campaigns.removeFromInitiative', this.props.campaignID, this.props.character._id)
    }

    renderRemoveFromInitiativeButton(){
        if (Meteor.userId() == this.props.gm){
            return <button onClick={this.removeFromInitiative.bind(this)}>X</button>;
        }

        return null;
    }

    render() {
        if (!this.props.character){
            return null;
        }

        return (
            <NavLink to='#'  /*onClick={() => this.props.parent.toggleCharacterPopup(this.props.character)}*/ className='nav-item nav-link'>
                <div className="objectCardMini " draggable="false">
                    <div className="objectCardMiniImage">
                        <img src={this.props.characterImageURL!=null && this.props.character.characterImageURL!="" ? this.props.character.characterImageURL : '/images/photoMissing.png'} className="stretch-image" draggable="false"/>
                    </div>
                    <div className="objectCardMiniInfo container-fluid col-xs-10">
                        <h5 className="no-margin-override h5-overflow-hidden">{this.props.character.characterName}</h5>
                        <hr className="hr-override-light"/>
                        
                        {this.renderHealthBar()}
                        <div className="spacer col-sm-12"/>
                        <div className="spacer col-sm-12"/>
                        
                        {this.renderHealthControls()}
                        <div className="spacer col-sm-12"/>

                        {this.renderSpellSlots()}

                        {this.renderRemoveFromInitiativeButton()}
                    </div>
                </div>
            </NavLink>
        );
    }
}