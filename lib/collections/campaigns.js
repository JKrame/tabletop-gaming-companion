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
        campaignImageURL
        ) 
    {
    
        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        if (notes == null){
            notes = [];
        }

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
            campaignImageURL
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
        campaignImageURL
        )
    {
        // These check methods need to check the data type of the parameters we are updating with
        console.log("campaigns update");
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
            campaignImageURL
            } 
        });
    },
    'campaignNote.push'(_id, newNote){
        Campaigns.update(_id, {
            $push: { 
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

});


