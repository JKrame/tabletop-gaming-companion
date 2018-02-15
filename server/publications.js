Meteor.publish('characters', function(){
    return Characters.find({});
});

Meteor.publish('campaigns', function(){
    return Campaigns.find({});
});

Meteor.publish('adventureBoard', function(){
    console.log("publish adventureboard");
    return AdventureBoard.find({});
});