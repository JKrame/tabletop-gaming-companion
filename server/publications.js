Meteor.publish('characters', function(){
    return Characters.find({UID: Meteor.userId()});
});