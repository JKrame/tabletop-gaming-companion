import React from 'react'
import { NavLink } from 'react-router-dom';
import UserBubble from '../objects/UserSpeechBubble';
import OtherBubble from '../objects/OtherSpeechBubble';

export default class ChatWindow extends React.Component{
    render() {
        return (
            <div className="">
                <div className="col-sm-12 full-width scrolling-container-50" >
                    <UserBubble/>
                    <OtherBubble/>
                    <UserBubble/>
                    <OtherBubble/>
                    <UserBubble/>

                </div>
                
            </div>
           
        );
    }
}