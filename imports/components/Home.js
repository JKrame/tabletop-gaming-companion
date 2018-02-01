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
                characters = Characters.find().fetch();
                if(characters != undefined)
                {
                    charactersArray = characters;
                    display = true;
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
        if(characters === undefined)
        {
            console.log("calling cf w/o props");
            return;
        }
        else
        {
            console.log("calling cf w/ props");
            console.log(characters[0]._id);
            this.renderCharacterCard();
            return;
        }
    }

    renderCharacterCard() {
        var cards = [];
        var UID = Meteor.userId();
        //var characters = Characters.find({UID: UID}).fetch();
        var numcharacters = characters.length;
        console.log(characters[0].characterName);
        for (var i = 0; i < numcharacters; i++)
        {
            cards.push(
                <NavLink to='#' onClick={() => this.loadCharacter(characters[i]._id)} className='nav-item nav-link'>
                    <CharacterCardHalf key={i} characterName={characters[i].characterName} characterClass={characters[i].characterClass} level={characters[i].level} race={characters[i].race}/>
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
            name = null;
            description = null;
            meetTime = null;
            meetDate = null;
            players = null;
            gm = null;
            notes = [];
            turnOrder = null;
            URLs = null;

            Meteor.call("campaigns.insert", 
                campaignId,
                name,
                description,
                meetTime,
                meetDate,
                players,
                gm,
                notes,
                turnOrder,
                URLs
            );
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
