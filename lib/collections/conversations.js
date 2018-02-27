Conversations = new Mongo.Collection('conversations');

Meteor.methods({
    'conversations.insert'(username, contactID, contactUsername) 
    {
        userID = Meteor.userId();
        messages = [];

        Conversations.insert({userID, username, contactID, contactUsername, messages});
    },
    'conversations.sendMessage'(_id, message){
        userID = Meteor.userId();

        Conversations.update(_id, {
            $push: {
                messages: {userID, message}
            }
        });
    }
});