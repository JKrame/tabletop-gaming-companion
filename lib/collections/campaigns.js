Campaigns = new Mongo.Collection('campaigns');

if (Meteor.isClient){
    /*const subscription = Meteor.subscribe('characters');
    console.log("subscribe");

    Tracker.autorun(() => {
        const isReady = subscription.ready();
        console.log("subscription is ready: " + isReady);
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
        URLs
        ) 
    {
    
        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
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
            URLs
        });
    },
  
    'campaigns.remove'(_id) {
        check(_id, String);
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
        URLs
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
            URLs
            } 
        });
    },
});

