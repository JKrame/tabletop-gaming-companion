import React from 'react'
import { NavLink } from 'react-router-dom';

export default class CampaignCharacterTile extends React.Component{
    render() {
        return (
            <NavLink to='#' onClick={() => this.props.func(this.props.id, this.props.somehistory)} className='nav-item nav-link'>
                <div className="objectCardMini highlight-container">
                    <div className="objectCardMiniImage">
                        <img src={this.props.characterImageURL!=null && this.props.characterImageURL!="" ? this.props.characterImageURL : '/images/photoMissing.png'} className="stretch-image"/>
                    </div>
                    <div className="objectCardMiniInfo container-fluid col-xs-10">
                        <h5 className="no-margin-override h5-overflow-hidden">{this.props.characterName}</h5>
                        <hr className="hr-override-light"/>
                        <div className="col-xs-12 no-margin-override no-padding">
                            <div className="col-xs-11 no-margin-override">
                                <div className="full-width" style={{"backgroundColor":"red", "height":"15px"}}/>
                            </div>
                            <div className="col-xs-1 no-margin-override"><p>x/x</p></div>
                        </div>

                        <div className="col-xs-12 no-margin-override no-padding">
                            <div className="spell-slot-container">
                                <div className="spell-slot"></div>
                                <div className="spell-slot"></div>
                                <div className="spell-slot"></div>
                                <div className="spell-slot"></div>
                            </div>
                            <div className="spell-slot-container">
                                <div className="spell-slot"></div>
                                <div className="spell-slot"></div>
                                <div className="spell-slot"></div>
                                <div className="spell-slot"></div>
                            </div>
                            <div className="spell-slot-container">
                                <div className="spell-slot"></div>
                                <div className="spell-slot"></div>
                                <div className="spell-slot"></div>
                                <div className="spell-slot"></div>
                            </div>
                            <div className="spell-slot-container">
                                <div className="spell-slot"></div>
                                <div className="spell-slot"></div>
                                <div className="spell-slot"></div>
                                <div className="spell-slot"></div>
                            </div>
                            <div className="spell-slot-container">
                                <div className="spell-slot"></div>
                                <div className="spell-slot"></div>
                                <div className="spell-slot"></div>
                                <div className="spell-slot"></div>
                            </div>
                            <div className="spell-slot-container">
                                <div className="spell-slot"></div>
                                <div className="spell-slot"></div>
                                <div className="spell-slot"></div>
                                <div className="spell-slot"></div>
                            </div>
                            <div className="spell-slot-container">
                                <div className="spell-slot"></div>
                                <div className="spell-slot"></div>
                                <div className="spell-slot"></div>
                                <div className="spell-slot"></div>
                            </div>
                            <div className="spell-slot-container">
                                <div className="spell-slot"></div>
                                <div className="spell-slot"></div>
                                <div className="spell-slot"></div>
                                <div className="spell-slot"></div>
                            </div>
                            <div className="spell-slot-container">
                                <div className="spell-slot"></div>
                                <div className="spell-slot"></div>
                                <div className="spell-slot"></div>
                                <div className="spell-slot"></div>
                            </div>

                        </div>
                    </div>
                </div>
            </NavLink>
        );
    }
}