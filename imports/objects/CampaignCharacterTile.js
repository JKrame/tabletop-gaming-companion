import React from 'react'
import { NavLink } from 'react-router-dom';

export default class CampaignCharacterTile extends React.Component{
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <NavLink to='#'  onClick={() => this.props.parent.toggleCharacterPopup(this.props.character)} className='nav-item nav-link'>
                <div className="objectCardMini " draggable="false">
                    <div className="objectCardMiniImage">
                        <img src={this.props.characterImageURL!=null && this.props.characterImageURL!="" ? this.props.characterImageURL : '/images/photoMissing.png'} className="stretch-image" draggable="false"/>
                    </div>
                    <div className="objectCardMiniInfo container-fluid col-xs-10">
                        <h5 className="no-margin-override h5-overflow-hidden">{this.props.characterName}</h5>
                        <hr className="hr-override-light"/>

                        <div className="col-xs-12 no-margin-override no-padding">
                            <div className="col-xs-10 no-margin-override">
                                <div className="full-width" style={{"backgroundColor":"red", "height":"15px"}}/>
                            </div>
                            <div className="col-xs-2 no-margin-override"><p>x/x</p></div>
                        </div>
                        <div className="spacer col-sm-12"/>


                        <div className="col-xs-12 ">
                            <div className="spell-slot-container">
                                <div className="spell-slot "></div>
                                <div className="spell-slot "></div>
                                <div className="spell-slot "></div>
                                <div className="spell-slot "></div>
                            </div>
                            <div className=" spell-slot-container">
                                <div className="spell-slot "></div>
                                <div className="spell-slot "></div>
                                <div className="spell-slot "></div>
                                <div className="spell-slot "></div>
                            </div>
                            <div className=" spell-slot-container">
                                <div className="spell-slot "></div>
                                <div className="spell-slot "></div>
                                <div className="spell-slot "></div>
                                <div className="spell-slot "></div>
                            </div>
                            <div className=" spell-slot-container">
                                <div className="spell-slot "></div>
                                <div className="spell-slot "></div>
                                <div className="spell-slot "></div>
                                <div className="spell-slot "></div>
                            </div>
                            <div className=" spell-slot-container">
                                <div className="spell-slot "></div>
                                <div className="spell-slot "></div>
                                <div className="spell-slot "></div>
                                <div className="spell-slot "></div>
                            </div>
                            <div className=" spell-slot-container">
                                <div className="spell-slot "></div>
                                <div className="spell-slot "></div>
                                <div className="spell-slot "></div>
                                <div className="spell-slot "></div>
                            </div>                            
                            <div className=" spell-slot-container">
                                <div className="spell-slot "></div>
                                <div className="spell-slot "></div>
                                <div className="spell-slot "></div>
                                <div className="spell-slot "></div>
                            </div>
                            <div className=" spell-slot-container">
                                <div className="spell-slot "></div>
                                <div className="spell-slot "></div>
                                <div className="spell-slot "></div>
                                <div className="spell-slot "></div>
                            </div>
                            <div className=" spell-slot-container">
                                <div className="spell-slot "></div>
                                <div className="spell-slot "></div>
                                <div className="spell-slot "></div>
                                <div className="spell-slot "></div>
                            </div>
                        </div>
                    </div>
                </div>
            </NavLink>
        );
    }
}