import React from 'react'
import { NavLink } from 'react-router-dom';

export default class OtherSpeechBubble extends React.Component{
    render() {
        return (
            <div style={{"clear":"both","marginTop":"15px", "float":"left"}} draggable="false">
                    <div className="speechBubble" style={{"backgroundColor":"#FF404C", "float":"right"}}>
                        <p style={{ "color":"white"}}>{this.props.message}</p>
                    </div>

            </div>
        );
    }
}