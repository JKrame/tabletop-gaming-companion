import React from 'react'
import { NavLink } from 'react-router-dom';

export default class CharacterCardMini extends React.Component{
    callParent(){
        this.props.loadConversation(this.props.conversation);
    }

    render() {
        return (
            <NavLink to='#' onClick={() => this.props.func(this.props.id, this.props.somehistory, this.props.characterName)} className='nav-item nav-link'>
                <div className="NPCCardMini highlight-container">
                    <div className="NPCCardMiniImage">
                        <img src={this.props.characterImageURL!=null && this.props.characterImageURL!="" ? this.props.characterImageURL : '/images/photoMissing.png'} className="stretch-image"/>
                    </div>
                    <div className="objectCardMiniInfo container-fluid  col-xs-10">
                        <h5 className="no-margin-override h5-overflow-hidden">{this.props.characterName}</h5>
                    </div>
                </div>
            </NavLink>
        );
    }
}