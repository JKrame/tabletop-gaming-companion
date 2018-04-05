import React from 'react'
import { NavLink } from 'react-router-dom';

export default class UserSpeechBubble extends React.Component{
    render() {
        return (
            <div style={{"clear":"both","marginTop":"15px", "float":"right"}} className="col-xs-12 user-bubble">
                    <div className="speechBubble" style={{"backgroundColor":"#012C40",  "float":"right"}}>
                        <p style={{ "color":"white"}}>{this.props.message}</p>
                    </div>
            </div>
        );
    }
}