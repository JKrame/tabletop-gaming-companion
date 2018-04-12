import React from 'react'
import { NavLink } from 'react-router-dom';

export default class PCInitiativeCard extends React.Component{
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
        this.setState({percent : (Number(this.props.character.currHP) / Number(max) * 100) + "%"});
    }

    renderSpellSlots(){
        if (!this.props.character ){
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

    renderControls(){
        if (Meteor.userId() != this.props.gm){
            return null;
        }

        return (
            <div>
                <div className="kill-button" onClick={this.removeFromInitiative.bind(this)}></div>;
            </div>
        );
    }

    removeFromInitiative(){
        if (this.props.position <= this.props.index && this.props.index > 0){
            Meteor.call('campaigns.endTurn', this.campaignID, this.props.index - 1);
        }
        Meteor.call('campaigns.removeFromInitiative', this.props.campaignID, this.props.character._id)
    }

    render() {
        if (!this.props.character){
            return null;
        }

        return (
            <NavLink to='#'  onClick={() => this.props.parent.toggleCharacterPopup(this.props.character)} className='nav-item nav-link'>
                <div className="objectCardMini " draggable="false">
                    <div className="objectCardMiniImage">
                        <img src={this.props.character.characterImageURL != null || this.props.character.characterImageURL != "" ? this.props.character.characterImageURL : '/images/photoMissing.png'} className="stretch-image" draggable="false"/>
                    </div>
                    <div className="objectCardMiniInfo container-fluid col-xs-10">
                        <h5 className="no-margin-override h5-overflow-hidden">{this.props.character.characterName}</h5>
                        <hr className="hr-override-light"/>

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
                        <div className="spacer col-sm-12"/>
                        <div className="spacer col-sm-12"/>
                        
                        {this.renderControls()}                   
                        <div className="spacer col-sm-12"/>

                        {this.renderSpellSlots()}
                    </div>
                </div>
            </NavLink>
        );
    }
}