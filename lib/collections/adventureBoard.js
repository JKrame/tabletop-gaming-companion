AdventureBoard = new Mongo.Collection('adventureBoard');

Meteor.methods({
    'adventureBoard.insert'(campaignID, location){
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        AdventureBoard.insert({campaignID, location});
    },
    'adventureBoard.remove'(campaignID){
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        AdventureBoard.remove(campaignID);
    }
});