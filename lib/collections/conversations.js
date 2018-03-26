Conversations = new Mongo.Collection('conversations');

Meteor.methods({
    'conversations.insert'(userOne, userTwo) 
    {
        if (userOne._id > userTwo._id){
            oneID = userOne._id;
            oneName = userOne.profile.username;
            onePicture = userOne.profile.accountPicture;
            twoID = userTwo._id;
            twoName = userTwo.profile.username;
            twoPicture = userTwo.profile.accountPicture;
        }
        else{
            oneID = userTwo._id;
            oneName = userTwo.profile.username;
            onePicture = userTwo.profile.accountPicture;
            twoID = userOne._id;
            twoName = userOne.profile.username;
            twoPicture = userOne.profile.accountPicture;
        }

        messages = [];

        Conversations.insert({participants: [{id: oneID, name: oneName, picture: onePicture}, {id: twoID, name: twoName, picture: twoPicture}], messages});
    },
    'conversations.sendMessage'(_id, message){
        userID = Meteor.userId();

        Conversations.update(_id, {
            $push: {
                messages: {userID, message}
            }
        });
    },
    'conversations.update'(userID, imgString)
    {
        Conversations.update({ participants:{$elemMatch : {id : userID}}}, { $set: {"participants.$.picture":imgString}});
    }
});