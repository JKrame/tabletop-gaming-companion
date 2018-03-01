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
        pendingInvites,
        gm,
        notes,
        turnOrder,
        URLs,
        campaignImageURL,
        isPublic, 
        characters
        )
    {
    
        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        if (notes == null){
            notes = [];
        }
        if (pendingInvites == null){
            pendingInvites = [];
        }
        if (URLs == null){
            URLs = [];
        }
        if(characters == null){
            characters = []
        }
        if(pendingInvites == null){
            pendingInvites = []
        }

        gm = Meteor.userId();

        Campaigns.insert(
        {
            _id,
            name,
            description,
            meetTime,
            meetDate,
            pendingInvites,
            gm,
            notes,
            turnOrder,
            URLs,
            campaignImageURL,
            isPublic,
            characters
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
        pendingInvites,
        gm,
        notes,
        turnOrder,
        URLs,
        campaignImageURL,
        isPublic,
        characters
        )
    {
        // These check methods need to check the data type of the parameters we are updating with
        Campaigns.update(_id, { 
            $set: { 
            name,
            description,
            meetTime,
            meetDate,
            pendingInvites,
            gm,
            notes,
            turnOrder,
            URLs,
            campaignImageURL,
            isPublic,
            characters
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
    'campaignPendingInvites.addToSet'(_id, newPlayer){
        Campaigns.update(_id, {
            $addToSet: { 
                pendingInvites : newPlayer
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
});


