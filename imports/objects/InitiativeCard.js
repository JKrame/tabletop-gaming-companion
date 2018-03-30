import React from 'react'
import { NavLink } from 'react-router-dom';

export default class InitiativeCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {healthString : ""}
    }

    componentWillMount(){
        if (!this.props.character){
            return;
        }

        var maxHP = this.props.character.maxHP;
        var currHP = this.props.character.currHP;
        var tempHP = this.props.character.tempHP;


        if (maxHP == 0 || maxHP == null){
            maxHP = 1;
        }
        if (currHP == null){
            currHP = 1;
        }
        if (tempHP == null){
            tempHP = 1;
        }

        this.percent = (Number(currHP) + Number(tempHP)) / Number(maxHP);
        this.percent = (this.percent*100) + "%";

        var numerator = Number(currHP) + Number(tempHP);

        if (Meteor.userId() == this.props.gm){
            this.setState({healthString: numerator + "/" + maxHP});
        }
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
                    <div className="full-width" style={{"backgroundColor":"Grey", "height":"15px", "display":"relative"}}>
                        <div style={{"backgroundColor":"red", "height":"15px", "width":this.percent}}/>
                    </div>
                </div>
                <div className="col-xs-2 no-margin-override">
                    <p>{this.state.healthString}</p>
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
                <button className="inc-button" onClick={() => this.props.lowerHealth(this.props.character)}>-</button>
                <input className="spellbox" ref="healthBox" defaultValue={this.props.character.currHP + this.props.character.tempHP} onChange={this.setHealth.bind(this)} placeholder=""/>
                <button className="inc-button" onClick={() => this.props.raiseHealth(this.props.character)}>+</button>
            </div>
        );
    }

    setHealth(){
        if (!this.refs.healthBox){
            return;
        }

        newHealth = this.refs.healthBox.value;
        if (parseInt(newHealth) == newHealth){
            this.props.setHealth(this.props.character, newHealth);
        }
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
                        <h5 className="no-margin-override h5-overflow-hidden">{this.props.characterName}</h5>
                        <hr className="hr-override-light"/>
                        
                        {this.renderHealthBar()}
                        {this.renderHealthControls()}
                        <div className="spacer col-sm-12"/>

                        {this.renderSpellSlots()}
                    </div>
                </div>
            </NavLink>
        );
    }
}