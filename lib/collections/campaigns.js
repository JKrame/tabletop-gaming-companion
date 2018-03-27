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
        characters,
        currentBroadcastItem,
        currentBroadcastType,
        turnIndex,
        combat,
        activeNPCs,
        gameLog
        )
    {
        // Make sure the user is logged in before inserting
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
        if (currentBroadcastItem == null){
            currentBroadcastItem = "";
        }
        if (currentBroadcastType == null){
            currentBroadcastType = "";
        }
        if (characters == null){
            characters = [];
        }
        if (turnOrder == null){
            turnOrder = [];
        }
        if (gameLog == null){
            gameLog = [];
        }

        gm = Meteor.userId();
        activeNPCs = [];


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
            characters,
            currentBroadcastItem,
            currentBroadcastType,
            turnIndex,
            combat,
            activeNPCs,
            gameLog
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
        characters,
        currentBroadcastItem,
        currentBroadcastType,
        turnIndex,
        combat
        )
    {
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
            characters,
            currentBroadcastItem,
            currentBroadcastType,
            turnIndex,
            combat
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
    'userPendingInvites.addToSet'(invitedUserID, campaignToBePushed)
    {
        Meteor.users.update(invitedUserID, {
            $addToSet: {
                "profile.pendingInvites" : campaignToBePushed
            }
        });
    },
    'userPendingInvites.pull'(invitedUserID, campaignToBePulled)
    {
        Meteor.users.update(invitedUserID, {
            $pull: {
                "profile.pendingInvites" : campaignToBePulled
            }
        });
    },
    'campaignPendingInvites.pull'(_id, Player){
        Campaigns.update(_id, {
            $pull: { 
                pendingInvites : Player
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
    'campaigns.startCombat'(_id){
        console.log(_id);
        Campaigns.update(_id, {
            $set: {
                combat: true,
                turnIndex: 0
            }
        });
    },
    'campaigns.endCombat'(_id){
        Campaigns.update(_id, {
            $set: {
                combat: false,
                turnOrder: []
            }
        });
    },
    'campaigns.endTurn'(_id, newTurnIndex){
        Campaigns.update(_id, {
            $set: {
                turnIndex: newTurnIndex
            }
        });
    },
    'campaigns.addToTurnOrder'(_id, cid, initiative, dex){
        Campaigns.update(_id, {
            $addToSet: {
                turnOrder : {
                    cid,
                    initiative,
                    dex
                }
            }
        });
    },
    'campaigns.setTurnOrder'(_id, turnOrder){
        Campaigns.update(_id, {
            $set: {
                turnOrder
            }
        });
    },
    'campaignsActiveNPCs.addToSet'(_id, unique_id, npc_id, initiative){
        Campaigns.update(_id, {
            $addToSet: {
                activeNPCs : {
                    unique_id,
                    npc_id,
                    initiative
                }
            }
        });
    },
    'campaignsGameLog.push'(_id, message){
        Campaigns.update(_id, {
            $push: {
                gameLog : message
            }
        });
    }
});


