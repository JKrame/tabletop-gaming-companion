Campaigns = new Mongo.Collection('campaigns');

if (Meteor.isClient){
    /*const subscription = Meteor.subscribe('characters');

    Tracker.autorun(() => {
        const isReady = subscription.ready();
    });*/
}

Meteor.methods({
    'campaigns.insert'(
        _id,
        name,
        description,
        meetTime,
        meetDate,
        players,
        gm,
        notes,
        turnOrder,
        URLs,
        campaignImageURL,
        isPublic, 
        characters,
        currentBroadcastItem,
        currentBroadcastType
        )
    {
    
        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        if (notes == null){
            notes = [];
        }
        if (players == null){
            players = [];
        }
        if (URLs == null){
            URLs = [];
        }
        if (currentBroadcastItem == null){
            currentBroadcastItem = "";
        }
        if (currentBroadcastType == null){
            currentBroadcastType = "";
        }

        gm = Meteor.userId();

        Campaigns.insert(
        {
            _id,
            name,
            description,
            meetTime,
            meetDate,
            players,
            gm,
            notes,
            turnOrder,
            URLs,
            campaignImageURL,
            isPublic,
            characters,
            currentBroadcastItem,
            currentBroadcastType
        });
    },
  
    'campaigns.remove'(_id) {
        Campaigns.remove(_id);
    },
  
    'campaigns.update'(
        _id,
        name,
        description,
        meetTime,
        meetDate,
        players,
        gm,
        notes,
        turnOrder,
        URLs,
        campaignImageURL,
        isPublic,
        characters,
        currentBroadcastItem,
        currentBroadcastType
        )
    {
        // These check methods need to check the data type of the parameters we are updating with
        Campaigns.update(_id, { 
            $set: { 
            name,
            description,
            meetTime,
            meetDate,
            players,
            gm,
            notes,
            turnOrder,
            URLs,
            campaignImageURL,
            isPublic,
            characters,
            currentBroadcastItem,
            currentBroadcastType
            } 
        });
    },
    'campaignNote.push'(_id, note){
        Campaigns.update(_id, {
            $addToSet: { 
                notes : note
             } 
        });
    },
    'campaignNote.pull'(_id, newNote){
        Campaigns.update(_id, {
            $pull: { 
                notes : newNote
             } 
        });
    },
    'campaignPlayer.push'(_id, newPlayer){
        Campaigns.update(_id, {
            $push: { 
                players : newPlayer
             } 
        });
    },
    'campaignImage.addToSet'(_id, newURL){
        Campaigns.update(_id, {
            $addToSet: {
                URLs : newURL
             } 
        });
    },
    'campaignImage.pull'(_id, imageURL){
        Campaigns.update(_id, {
            $pull: {
                URLs : imageURL
            }
        });
    },
    'makeCampaignPublic'(_id){
        Campaigns.update(_id, {
            $set: {
                isPublic : true
            }
        });
    },
    'makeCampaignPrivate'(_id){
        Campaigns.update(_id, {
            $set: {
                isPublic : false
            }
        });
    },
    'campaignCharacter.addToSet'(_id, newCharacter){
        Campaigns.update(_id, {
            $addToSet: {
                characters : newCharacter
             } 
        });
    },
    'campaignCharacter.pull'(_id, character){
        Campaigns.update(_id, {
            $pull: {
                characters : character
            }
        });
    },
    'campaigns.broadcastUpdate'(_id, currentBroadcastItem, currentBroadcastType){
        Campaigns.update(_id, {
            $set: {
                currentBroadcastItem : currentBroadcastItem,
                currentBroadcastType : currentBroadcastType
            }
        });
    },
});


