import React from 'react'
import { NavLink } from 'react-router-dom';

export default class UserSpeechBubble extends React.Component{
    render() {
        return (
            <div style={{"marginTop":"15px", "float":"right"}} className="col-xs-12 user-bubble">
                    <div className="speechBubble" style={{"backgroundColor":"#EEEEEE",  "float":"left"}}>
                    </div>
                    <div style={{"width":"20px","height":"20px", "float":"left","marginTop":"40px"}}>
                        <img src={'/images/userSpeechBubble.png'}/>
                    </div>
            </div>
        );
    }
}