import React from 'react'
import CampaignCardVertical from '../objects/CampaignCardVertical';

var campaigns;
var campaignsArray;

var SortParameters = Object.freeze({
    DATE_CREATED : 1,
    ALPHABETICAL_A_Z : 2,
    ALPHABETICAL_Z_A : 3
});

export default class CampaignsPage extends React.Component{
    
    componentWillMount(){
        this.campaignsTracker = Tracker.autorun(() => {
            const sub = Meteor.subscribe('campaigns');
            var UID = Meteor.userId();
            if(sub.ready())
            {
                campaignsArray = Campaigns.find({gm: UID}).fetch();
                if(campaignsArray != undefined)
                {
                    this.campaigns = campaignsArray;
                    display = true;
                }
            }
            this.forceUpdate();
        });
    }

    componentWillUnmount(){
        this.campaignsTracker.stop();
    }
    
    renderCampaignCard(sort) {
        var cards = [];
        var UID = Meteor.userId();
        if(sort == SortParameters.DATE_CREATED)
        {
            //nothing changes
        }
        else if(sort == SortParameters.ALPHABETICAL_A_Z)
        {
            this.characters.sort(function(a, b) {
                var x = a.name.toLowerCase();
                var y = b.name.toLowerCase();
                if(x < y)
                {
                    return -1;
                }
                if(x > y)
                {
                    return 1;
                }
                return 0;
            });
        }
        else if(sort == SortParameters.ALPHABETICAL_Z_A)
        {
            this.characters.sort(function(a, b) {
                var x = a.name.toLowerCase();
                var y = b.name.toLowerCase();
                if(x < y)
                {
                    return 1;
                }
                if(x > y)
                {
                    return -1;
                }
                return 0;
            });
        }
        for (var i = 0; i < this.campaigns.length; i++)
        {
            cards.push(
                <CampaignCardVertical key={i} id={this.campaigns[i]._id} somehistory={this.props.history} func={this.loadCampaign} campaigns={this.campaigns} campaignName={this.campaigns[i].name} campaignDescription={this.campaigns[i].description}/>
            );
        }
        return <div>{cards}</div>;
    }

    renderCampaignForm(){
        if(this.campaigns == undefined)
        {
            return;
        }
        else
        {
            sort = SortParameters.DATE_CREATED;
            return this.renderCampaignCard();
        }
    }

    loadCampaign(campaignId, somehistory, campaigns){
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

        for(var i = 0; i < campaigns.length; i++)
        {
            if(campaigns[i]._id == campaignId)
            {
                if(campaigns[i].gm == Meteor.userId())
                {
                    somehistory.push('/campaign/edit/' + campaignId); //first send them to the editing page
                }
                else
                {
                    somehistory.push('/campaigns/' + campaignId); //if they dont own it, send them to game screen
                }
                break;
            }
        }
    }

    render() {
        return(
            <div className="page-wrapper">
                <div className="col-lg-8 col-lg-offset-2">
                    <div className="page-content col-xs-12 fill-height">
                        <h3>Your Campaigns</h3>
                        <hr/>
                        <div className="scrolling-container">
                            {this.renderCampaignForm()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    }  