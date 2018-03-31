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
        //console.log(_id);
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
    'campaigns.addToTurnOrder'(_id, cid, initiative, dex, tieBreaker, npc){
        Campaigns.update(_id, {
            $addToSet: {
                turnOrder : {
                    cid,
                    initiative,
                    dex,
                    tieBreaker,
                    npc
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
    'campaignsActiveNPCs.addToSet'(_id, npc, uid){
        npc._id = uid;
        Campaigns.update(_id, {
            $addToSet: {
                activeNPCs : npc
            }
        });
    },
    'campaignsGameLog.push'(_id, message){
        Campaigns.update(_id, {
            $push: {
                gameLog : message
            }
        });
    },
    'campaignActiveNPCs.clear'(_id){
        Campaigns.update(_id, {
            $set : {
                activeNPCs : []
            }
        });
    },
    'campaignsTurnOrder.breakTie'(_id, winner){
        winner.tieBreaker = Number(winner.tieBreaker) + 1;
        //console.log(winner.tieBreaker);
        Campaigns.update({"_id" : _id, "turnOrder.cid" : winner.cid},{
            $set : {
                "turnOrder.$.tieBreaker" : winner.tieBreaker
            }
        });
    },
    'campaigns.updateCurrHealth'(_id, character, value){
        console.log("update curr hp "  + character._id);
        console.log(value);

        if (character.UID == "npc"){
            Campaigns.update({"_id" : _id, "activeNPCs._id" : character._id}, {
                $set : {
                    "activeNPCs.$.currHP" : value
                }
            });
        }
        else{
            Characters.update({"_id" : character._id}, {
                $set : {
                    "activeNPCs.$.currHP" : value
                }
            });
        }
    },
    'campaigns.updateTempHealth'(_id, character, value){
        console.log("update temp hp "  + character._id);
        console.log(value);

        if (character.UID == "npc"){
            Campaigns.update({"_id" : _id, "activeNPCs._id" : character._id}, {
                $set : {
                    "activeNPCs.$.tempHP" : value
                }
            });
        }
        else{
            Characters.update({"_id" : character._id}, {
                $set : {
                    "activeNPCs.$.tempHP" : value
                }
            });
        }
    },
    'campaigns.removeFromInitiative'(_id, cid){
        Campaigns.update(_id, {
            $pull : {
                "turnOrder" : {
                    cid 
                }
            }
        });

        Campaigns.update(_id, {
            $pull : {
                "activeNPCs" : {
                    "_id" : cid
                }
            }
        });
    }
});


