import React from 'react';
import { NavLink } from 'react-router-dom';

export default class CharacterCardVertical extends React.Component {
    render() {
        return (
            <NavLink to='#' onClick={() => this.props.func(this.props.id, this.props.somehistory)} className='nav-item nav-link'>
                <div className="vertical-card col-lg-3 col-md-4 col-sm-6 col-xs-12 highlight-container " draggable="false">
                    <div className="vertical-card-contents grow">
                        <div className="vertical-image">
                            <img src={this.props.characterImageURL!=null && this.props.characterImageURL!="" ? this.props.characterImageURL : '/images/photoMissing.png'} className="full-width vertical-image" draggable="false"/>
                        </div>
                        <div className="vertical-contents">     
                            <div className="vertical-campaign-title">
                                <h3 style={{"whiteSpace": "nowrap", "overflow":"hidden"}}>{this.props.characterName}</h3>
                                <hr className="hr-override-light"/>
                            </div>
                            <div className="vertical-data">
                                <p className="p-override"> Class: {this.props.characterClass}</p>
                                <p className="p-override"> Level: {this.props.level}</p>
                                <p className="p-override"> Race: {this.props.race}</p>
                            </div>
                        </div>   
                    </div>
                </div>
            </NavLink>
        );
    }
}