import React from 'react'
import { NavLink } from 'react-router-dom';

export default class PCInitiativeCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            currHP : 0,
            maxHP : 1,
            percent : 0,
            yourTurn : false
        }
    }

    componentWillMount(){
        if (!this.props.campaignID || !this.props.characterID){
            return;
        }
        
        this.campaignID = this.props.campaignID;
        this.characterID = this.props.characterID;

        this.tracker = Tracker.autorun(() => {
            const sub = Meteor.subscribe('campaigns');
            if(sub.ready())
            {
                this.campaign = Campaigns.findOne({_id: this.campaignID});
                this.gm = this.campaign.gm;
                if (this.campaign.turnIndex == this.props.key){
                    this.setState({yourTurn : true});
                }

                console.log(this.state.yourTurn);
            }

            const sub2 = Meteor.subscribe('characters');
            if (sub2.ready()){
                this.character = Characters.findOne({_id:this.characterID});

                var max = this.character.maxHP == 0 ? 1 : this.character.maxHP;
        
                this.setState({maxHP : max});
                this.setState({currHP : this.character.currHP});
                //this.tempHP = this.character.tempHP;
        
                percent = Number(this.character.currHP) / Number(max) * 100;
                if (percent < 0 || isNaN(percent)){
                    percent = 0;
                }
        
                percent = percent + "%";
        
                this.setState({percent});
            }
        });
    }

    componentWillUnmount(){
        this.tracker.stop();
    }

    renderSpellSlots()
    {
        if (!this.character ){
            return null;
        }

        var spellSlotContainers = [];
        var spellSlots;
        for(var i = 0; i < this.character.spellSlotsCurr.length; i++)
        {
            spellSlots = [];
            for(var j = 0; j < this.character.spellSlotsMax[i]; j++)
            {
                if(j < this.character.spellSlotsCurr[i])
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

    removeFromInitiative(){
        Meteor.call('campaigns.removePCFromInitiative', this.campaignID, this.characterID)
    }

    renderRemoveFromInitiativeButton(){
        if (Meteor.userId() == this.gm){
            return <button onClick={this.removeFromInitiative.bind(this)}>X</button>;
        }

        return null;
    }

    render() {
        if (!this.character){
            return null;
        }

        return (
            <NavLink to='#'  /*onClick={() => this.props.parent.toggleCharacterPopup(this.props.character)}*/ className='nav-item nav-link'>
                <div className="objectCardMini " draggable="false">
                    <div className="objectCardMiniImage">
                        <img src={this.character.characterImageURL != null && this.character.characterImageURL != "" ? this.character.characterImageURL : '/images/photoMissing.png'} className="stretch-image" draggable="false"/>
                    </div>
                    <div className="objectCardMiniInfo container-fluid col-xs-10">
                        <h5 className="no-margin-override h5-overflow-hidden">{this.character.characterName}</h5>
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

                        {this.renderSpellSlots()}
                    </div>
                </div>
            </NavLink>
        );
    }
}