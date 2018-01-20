import {Template} from 'metoer/templating';

import './yourCampaigns.html'

Template.body.helpers({
    campaigns: [
        {
            CampaignID: "123abc",
            Name: "Pirate",
            Description: "Pirates man. Gotta git after em",
            MeetingTime: new Date(2018, 1, 20),
            MeetingDate: new Date(null, null, null, 14, 30),
            //Players:
            GM: "123abc",
            //Notes: 
            TurnOrder: ""
            //URLs:  
        }
    ],
});