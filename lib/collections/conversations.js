Conversations = new Mongo.Collection('conversations');

Meteor.methods({
    'conversations.insert'(userOne, userTwo) 
    {
        userID = Meteor.userId();
        messages = [];

        Conversations.insert({userOne, userTwo, messages});
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