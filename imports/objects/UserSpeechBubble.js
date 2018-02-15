import React from 'react'
import { NavLink } from 'react-router-dom';

export default class UserSpeechBubble extends React.Component{
    render() {
        return (
            <div style={{"marginTop":"15px", "float":"right"}}>
                    <div className="speechBubble" style={{"backgroundColor":"#EEEEEE", "width":"400px","height":"100px", "float":"left"}}>
                    </div>
                    <div style={{"width":"20px","height":"20px", "float":"left","marginTop":"40px"}}>
                        <img src={'/images/userSpeechBubble.png'}/>
                    </div>
            </div>
        );
    }
}