import React from 'react'
import { NavLink } from 'react-router-dom';

export default class OtherSpeechBubble extends React.Component{
    render() {
        return (
            <div style={{"marginTop":"15px", "float":"left"}}>
                    <div style={{"width":"20px","height":"20px", "float":"left","marginTop":"40px"}}>
                        <img src={'/images/otherSpeechBubble.png'}/>
                    </div>
                    <div className="speechBubble" style={{"backgroundColor":"#DAEBF2", "float":"left"}}>
                    </div>

            </div>
        );
    }
}