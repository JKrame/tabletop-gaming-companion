import React from 'react'
import { NavLink } from 'react-router-dom';

export default class OtherSpeechBubble extends React.Component{
    render() {
        return (
            <div style={{"margin-top":"15px", "float":"left"}}>
                    <div style={{"width":"20px","height":"20px", "float":"left","margin-top":"40px"}}>
                        <img src={'/images/otherSpeechBubble.png'}/>
                    </div>
                    <div className="speechBubble" style={{"background-color":"#DAEBF2", "width":"400px","height":"100px", "float":"left"}}>
                    </div>

            </div>
        );
    }
}