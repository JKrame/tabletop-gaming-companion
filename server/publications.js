Meteor.publish('userData', function () {
    return Meteor.users.find({}, {fields: {profile: 1}});
  });

Meteor.publish('characters', function(){
    return Characters.find({});
});

Meteor.publish('campaigns', function(){
    return Campaigns.find({});
});

Meteor.publish('conversations', function(){
    return Conversations.find({"participants.id": Meteor.userId()});
})