import React from 'react'
import { NavLink } from 'react-router-dom';

export default class CampaignCharacterTile extends React.Component{
    constructor(props) {
        super(props);
    }

    renderSpellSlots()
    {
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
                console.log(j);
            }
            //console.log(spellSlots);
            if(spellSlots.length != 0)
            {
                spellSlotContainers.push(<div className="spell-slot-container">{spellSlots}</div>);
            }
        }
        //console.log(spellSlotContainers);
        return <div className="col-xs-12 ">{spellSlotContainers}</div>;
    }

    render() {
        var percent = (Number(this.props.character.currHP) + Number(this.props.character.tempHP))/Number(this.props.character.maxHP);
        percent = (percent*100) + "%";
        console.log(percent);
        return (
            <NavLink to='#'  onClick={() => this.props.parent.toggleCharacterPopup(this.props.character)} className='nav-item nav-link'>
                <div className="objectCardMini " draggable="false">
                    <div className="objectCardMiniImage">
                        <img src={this.props.characterImageURL!=null && this.props.characterImageURL!="" ? this.props.characterImageURL : '/images/photoMissing.png'} className="stretch-image" draggable="false"/>
                    </div>
                    <div className="objectCardMiniInfo container-fluid col-xs-10">
                        <h5 className="no-margin-override h5-overflow-hidden">{this.props.characterName}</h5>
                        <hr className="hr-override-light"/>

                        <div className="col-xs-12 no-margin-override no-padding">
                            <div className="col-xs-10 no-margin-override">
                                <div className="full-width" style={{"backgroundColor":"Grey", "height":"15px", "display":"relative"}}>
                                    <div style={{"backgroundColor":"red", "height":"15px", "width":percent}}/>
                                </div>
                            </div>
                            <div className="col-xs-2 no-margin-override"><p>{Number(this.props.character.currHP) + Number(this.props.character.tempHP)}/{this.props.character.maxHP}</p></div>
                        </div>
                        <div className="spacer col-sm-12"/>


                        {this.renderSpellSlots()}
                    </div>
                </div>
            </NavLink>
        );
    }
}