Meteor.publish('characters', function(){
    return Characters.find({});
});

Meteor.publish('campaigns', function(){
    return Campaigns.find({});
});