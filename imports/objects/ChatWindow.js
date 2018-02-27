import React from 'react'
import { NavLink } from 'react-router-dom';
import UserBubble from '../objects/UserSpeechBubble';
import OtherBubble from '../objects/OtherSpeechBubble';

export default class ChatWindow extends React.Component{
    renderChatBubbles(){
        console.log("ChatWindow this.props.conversation: ");
        console.log(this.props.conversation);
        var cards = [];
        if (this.props.conversation){
            messages = this.props.conversation.messages;
            for (i = 0; i < messages.length; i++){
                if (messages[i].userID == Meteor.userId()){
                    cards.push(<UserBubble key={i} message={messages[i].message}/>);
                }
                else{
                    cards.push(<OtherBubble key={i} message={messages[i].message}/>);
                }
            }
        }

        return cards;
    }

    render() {
        return (
            <div className="">
                <div className="col-sm-12 full-width scrolling-container-50" >
                    {this.renderChatBubbles()}
                </div>
                
            </div>
           
        );
    }
}