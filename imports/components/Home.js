import React from 'react';
import { NavLink } from 'react-router-dom';
import { Random } from 'meteor/random';

//import { Characters } from '../api/character';
import CharacterCardHalf from '../objects/CharacterCardMini';
import CampaignCardHalf from '../objects/CampaignCardMini';

var characters;
var charactersArray;

export default class Home extends React.Component {

    componentWillMount(){
        console.log("cs > componentDidMount");
        this.homeTracker = Tracker.autorun(() => {
            const sub = Meteor.subscribe('characters');
            console.log("cs > componentDidMount > tracker");
            console.log(sub.ready());
            if(sub.ready())
            {
                var UID = Meteor.userId();
                charactersArray = Characters.find({UID: UID}).fetch();
                this.characters = charactersArray;
                if(characters != undefined)
                {
                    //this.characters = charactersArray;
                    display = true;
                    console.log("characters not undefined anymroe");
                }
                console.log("componentDidMount cs");                
            }
            this.forceUpdate();
        });
    }

    componentWillUnmount(){
        this.homeTracker.stop();
    }

    renderForm(){
        if(this.characters == undefined)
        {
            console.log("calling nothing");
            //this.renderCharacterCard();
            return;
        }
        else
        {
            console.log("calling renderCharacterCard");
            //console.log(characters[0]._id);
            return this.renderCharacterCard();
        }
    }

    renderCharacterCard() {
        var cards = [];
        var UID = Meteor.userId();
        //var characters = Characters.find({UID: UID}).fetch();
        var numcharacters = this.characters.length;
        console.log(this.characters.length);
        for (var i = 0; i < this.characters.length; i++)
        {
            cards.push(
                <NavLink to='#' onClick={() => this.loadCharacter(this.characters[i]._id)} className='nav-item nav-link'>
                    <CharacterCardHalf key={i} characterName={this.characters[i].characterName} characterClass={this.characters[i].characterClass} level={this.characters[i].level} race={this.characters[i].race}/>
                </NavLink>
            );
        }
        return <div>{cards}</div>;
    }

    renderCampaignCard() {
        var cards = [];
        var numcampaigns = 2;
        for (var i = 0; i < numcampaigns; i++)
        {
            cards.push(<CampaignCardHalf key={i}/>);
        }
        return <div>{cards}</div>;
    }

    loadCharacter(cid){
        console.log(cid);
        if (!cid)
        {
            cid = Random.id();
            Meteor.call('characters.insert', cid);
        }

        this.props.history.push('/character/edit/' + cid);
    }

    loadCampaign(campaignId){
        if (!campaignId)
        {
            campaignId = Random.id();
            Meteor.call('campaigns.insert', campaignId);
        }

        this.props.history.push('/campaign/edit/' + campaignId);
    }

    render() {
        Meteor.subscribe('characters');
        return(
        <div className="page-wrapper">
            <div className="col-lg-8 col-lg-offset-2">
                <div className="col-md-6 ">
                    <div className="page-content-half">
                        <NavLink to="Characters">
                            <h3>Characters >></h3>
                        </NavLink>
                        <hr/>
                        <div className="page-content-scroller">
                            {this.renderForm()}
                            <NavLink to='#' onClick={() => this.loadCharacter()} className='nav-item nav-link'>   
                                <div className="objectCardMini add-container">
                                    <div className="objectCardMiniImage">
                                        <img src={'/images/addIcon.png'} className="stretch-image"/>
                                    </div>
                                    <div className="objectCardMiniInfo container-fluid">
                                        <h4 className="no-margin-override">CREATE NEW CHARACTER</h4>
                                        <hr className="hr-override-light"/>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
                    
                <div className="col-md-6 ">
                    <div className="page-content-half">
                        <NavLink to="Campaigns">
                            <h3>Campaign >></h3>
                        </NavLink>
                        <hr/>
                        
                        <div className="page-content-scroller">
                            {this.renderCampaignCard()}
                            
                            <div className="objectCardMini add-container">
                                        <div className="objectCardMiniImage">
                                            <img src={'/images/pending.png'} className="stretch-image"/>
                                        </div>
                                        <div className="objectCardMiniInfo container-fluid">
                                            <h4 className="no-margin-override">PENDING INVITE</h4>
                                            <hr className="hr-override-light"/>
                                            <p className="p-override">Click for Details...</p>
                                        </div>
                                    </div>
                               
                                <NavLink to='#' onClick={() => this.loadCampaign()} className='nav-item nav-link'>   
                                    <div className="objectCardMini add-container">
                                        <div className="objectCardMiniImage">
                                            <img src={'/images/addIcon.png'} className="stretch-image"/>
                                        </div>
                                        <div className="objectCardMiniInfo container-fluid">
                                            <h4 className="no-margin-override">CREATE NEW CAMPAIGN</h4>
                                            <hr className="hr-override-light"/>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                </div>
                <div className="col-md-6 ">
                <div className="page-content-half">
                    <h3>Players Nearby >></h3>
                    <hr/>
                    <br/>
                    <div className="item"></div>
                    </div>
                </div>
                <div className="col-md-6 ">
                <div className="page-content-half">
                    <h3>Meeting Spots >></h3>
                    <hr/>
                    <br/>
                    <div className="item"></div>
                </div>
            </div>
            </div>
        </div>
        );
    }
}  
