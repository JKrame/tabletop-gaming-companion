Characters = new Mongo.Collection('characters');

if (Meteor.isClient){
    /*const subscription = Meteor.subscribe('characters');

    Tracker.autorun(() => {
        const isReady = subscription.ready();
    });*/
}

Meteor.methods({
    'characters.insert'(
        _id,
        campaignID,
        UID,
        characterName,
        characterClass, 
        level,
        background, 
        race,
        alignment,
        AC,
        speed,
        maxHP,
        currHP,
        maxHitDie,
        currHitDie,
        hitDie,
        profBonus,
        notes,
        currWeapon,
        features,
        inventory,
        proficiencies,
        attributes,
        savingThrows,
        spellSlotsMax,
        spellSlotsCurr,
        statuses,
        money,
        characterImageURL,
        npc,
        skills,
        characterInitiative,
        tempHP,
        characterDeathSaveSuccesses,
        characterDeathSaveFailures,
        characterInspiration,
        characterPerception,
        attackNotes,
        equipmentNotes
    )
    {
        if(spellSlotsMax==null){
            spellSlotsMax=[];
        }        
        if(spellSlotsCurr==null){
            spellSlotsCurr=[];
        }
        if(savingThrows==null){
            savingThrows=[];
        }
        if(skills==null){
            skills=[];
        }
    
        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Characters.insert(
        {
            _id,
            campaignID,
            UID, 
            characterName,
            characterClass,
            level, 
            background,
            race,
            alignment,
            AC,
            speed,
            maxHP,
            currHP,
            maxHitDie,
            currHitDie,
            hitDie,
            profBonus,
            notes,
            currWeapon,
            features,
            inventory,
            proficiencies,
            attributes,
            savingThrows,
            spellSlotsMax,
            spellSlotsCurr,
            statuses,
            money,
            characterImageURL,
            npc,
            skills,
            characterInitiative,
            tempHP,
            characterDeathSaveSuccesses,
            characterDeathSaveFailures,
            characterInspiration,
            characterPerception,
            attackNotes,
            equipmentNotes
        });
    },
  
    'characters.remove'(_id) {
        Characters.remove(_id);
    },
  
    'characters.update'(
        _id,
        campaignID,
        UID, 
        characterName,
        characterClass,
        level, 
        background,
        race,
        alignment,
        AC,
        speed,
        maxHP,
        currHP,
        maxHitDie,
        currHitDie,
        hitDie,
        profBonus,
        notes,
        currWeapon,
        features,
        inventory,
        proficiencies,
        attributes,
        savingThrows,
        spellSlotsMax,
        spellSlotsCurr,
        statuses,
        money,
        characterImageURL,
        npc,
        skills,
<<<<<<< HEAD
        characterInitiative,
        tempHP,
        characterDeathSaveSuccesses,
        characterDeathSaveFailures,
        characterInspiration,
        characterPerception,
        attackNotes,
        equipmentNotes
=======
        tempHP,
        initiative,
        deathSaveSuccesses,
        deathSaveFailures,
        inspiration,
        perception,
        equipment
>>>>>>> 9e86fc6b0eeb40046a77208d154982317e3ae19b
    )
    {
        // These check methods need to check the data type of the parameters we are updating with
        Characters.update(_id, { 
            $set: { 
                campaignID,
                UID, 
                characterName,
                characterClass,
                level, 
                background,
                race,
                alignment,
                AC,
                speed,
                maxHP,
                currHP,
                maxHitDie,
                currHitDie,
                hitDie,
                profBonus,
                notes,
                currWeapon,
                features,
                inventory,
                proficiencies,
                attributes,
                savingThrows,
                spellSlotsMax,
                spellSlotsCurr,
                statuses,
                money,
                characterImageURL,
                npc,
                skills,
                characterInitiative,
                tempHP,
                characterDeathSaveSuccesses,
                characterDeathSaveFailures,
                characterInspiration,
                characterPerception,
                attackNotes,
                equipmentNotes
            } 
        });
    },
    'characters.setCampaign'(_id, campaignID) {
        Characters.update(_id, {$set: {campaignID}});
    },
});


