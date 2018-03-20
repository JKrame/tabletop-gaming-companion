import React from 'react'
import { NavLink } from 'react-router-dom';

export default class OtherSpeechBubble extends React.Component{
    render() {
        return (
            <div style={{"marginTop":"15px", "float":"left"}} draggable="false">
                    <div style={{"width":"20px","height":"20px", "float":"left","marginTop":"40px"}}>
                        <img src={'/images/otherSpeechBubble.png'} draggable="false"/>
                    </div>
                    <div className="speechBubble" style={{"backgroundColor":"#DAEBF2", "float":"left"}}>
                        <p>{this.props.message}</p>
                    </div>

            </div>
        );
    }
}