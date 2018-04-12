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

        Conversations.insert({participants: [{id: oneID, name: oneName, picture: onePicture}, {id: twoID, name: twoName, picture: twoPicture}], messages, userOneUnread: false, userTwoUnread: false});
    },
    'conversations.sendMessage'(_id, message){
        userID = Meteor.userId();
        participants = Conversations.findOne({_id: _id}).participants;
        otherUserID = participants[0].id;

        Conversations.update(_id, {
            $push: {
                messages: {userID, message}
            }
        });

        if(userID == otherUserID) //this means userID is oneID, and is "greater" than twoID
        {
            //otherUserID = participants[1].id;
            Conversations.update(_id, {
                $set: {
                    userTwoUnread: true  //therefore notify usertwo cause userone sent a message
                }
            });
        }
        else
        {
            Conversations.update(_id, {
                $set: {
                    userOneUnread: true
                }
            });
        }
    },
    'conversations.update'(userID, imgString)
    {
        Conversations.update({ participants:{$elemMatch : {id : userID}}}, { $set: {"participants.$.picture":imgString}});
    },
    'conversations.markRead'(_id)
    {
        userID = Meteor.userId();
        participants = Conversations.findOne({_id: _id}).participants;
        otherUserID = participants[0].id;

        if(userID == otherUserID) //this means userID is oneID, and is "greater" than twoID
        {
            //otherUserID = participants[1].id;
            Conversations.update(_id, {
                $set: {
                    userOneUnread: false
                }
            });
        }
        else
        {
            Conversations.update(_id, {
                $set: {
                    userTwoUnread: false
                }
            });
        }
    }
});