import React from 'react'
import { NavLink } from 'react-router-dom';

export default class CharacterCardMini extends React.Component{
    callParent(){
        this.props.loadConversation(this.props.conversation);
    }

    render() {
        return (
            <NavLink to='#' onClick={() => this.props.func(this.props.id, this.props.somehistory, this.props.campaign)} className='nav-item nav-link hoverBox'>
                <div className="objectCardMini grow">
                    <div className="objectCardMiniImage">
                        <img src={this.props.characterImageURL!=null && this.props.characterImageURL!="" ? this.props.characterImageURL : '/images/photoMissing.png'} className="stretch-image"/>
                    </div>
                    <div className="objectCardMiniInfo container-fluid  col-xs-10">
                        <h5 className="no-margin-override h5-overflow-hidden">{this.props.characterName}</h5>
                        <hr className="hr-override-light"/>
                        <p className="p-override no-margin-override small-text"> Class: {this.props.characterClass}</p>
                        <p className="p-override no-margin-override small-text"> Level: {this.props.level}</p>
                    </div>
                </div>
            </NavLink>
        );
    }
}