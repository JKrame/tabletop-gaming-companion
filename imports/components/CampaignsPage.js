import React from 'react'
import CampaignCardVertical from '../objects/CampaignCardVertical';

var campaigns;
var campaignsArray;

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
    
    renderCampaignCard() {
        var cards = [];
        var UID = Meteor.userId();
        for (var i = 0; i < this.campaigns.length; i++)
        {
            cards.push(
                <CampaignCardVertical key={i} id={this.campaigns[i]._id} somehistory={this.props.history} func={this.loadCampaign} campaignName={this.campaigns[i].name} campaignDescription={this.campaigns[i].description}/>
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
            return this.renderCampaignCard();
        }
    }

    loadCampaign(campaignId, somehistory){
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

        somehistory.push('/campaign/edit/' + campaignId);
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