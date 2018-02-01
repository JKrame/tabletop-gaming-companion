Meteor.publish('characters', function(){
    return Characters.find({UID: Meteor.userId()});
});

Meteor.publish('campaigns', function(){
    return Campaigns.find({});
})