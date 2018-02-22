Conversations = new Mongo.Collection('conversations');

Meteor.methods({
    'conversations.insert'(contactID) 
    {
        console.log("conversations.insert");
        console.log(contactID);
        userID = Meteor.userId();
        messages = [];

        Conversations.insert({userID, contactID, messages});
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