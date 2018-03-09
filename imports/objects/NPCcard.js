import React from 'react'
import { NavLink } from 'react-router-dom';

export default class CharacterCardMini extends React.Component{
    callParent(){
        this.props.loadConversation(this.props.conversation);
    }

    nothing()
    {
        return;
    }

    render() {
        return (
            <div className="NPCCardMini highlight-container" onClick={this.props.func ? () => this.props.func(this.props.NPC) : this.nothing()}>
                <div className="NPCCardMiniImage">
                    <img src={this.props.NPC.characterImageURL!=null && this.props.NPC.characterImageURL!="" ? this.props.NPC.characterImageURL : '/images/photoMissing.png'} className="stretch-image"/>
                </div>
                <div className="objectCardMiniInfo container-fluid  col-xs-10">
                    <h5 className="no-margin-override h5-overflow-hidden">{this.props.NPC.characterName}</h5>
                </div>
            </div>
        );
    }
}