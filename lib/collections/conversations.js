Conversations = new Mongo.Collection('conversations');

Meteor.methods({
    'conversations.insert'(contactID) 
    {
        userID = Meteor.userId();
        messages = [];

        Conversations.insert({userID, contactID, messages});
    },
    'conversations.sendMessage'(_id, message){
        userID = Meteor.userId();

        Conversations.push
    }
});