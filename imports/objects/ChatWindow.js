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
                <div className="col-sm-12 page-content">
                    <div className="col-sm-9">
                        <input type="text" style={{"height":"200px"}} className="full-width"/>
                    </div>
                    <div className="col-sm-3 negate-margins">
                            <button className="full-width blue-button" style={{"height":"50px", "margin-top":"150px"}}>SEND</button>
                    </div>
                </div>
            </div>
           
        );
    }
}