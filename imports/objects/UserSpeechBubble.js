import React from 'react'
import { NavLink } from 'react-router-dom';

export default class UserSpeechBubble extends React.Component{
    render() {
        return (
            <div style={{"margin-top":"15px", "float":"right"}}>
                    <div className="speechBubble" style={{"background-color":"#EEEEEE", "width":"400px","height":"100px", "float":"left"}}>
                    </div>
                    <div style={{"width":"20px","height":"20px", "float":"left","margin-top":"40px"}}>
                        <img src={'/images/userSpeechBubble.png'}/>
                    </div>
            </div>
        );
    }
}