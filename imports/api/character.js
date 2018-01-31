import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Characters = new Mongo.Collection('characters');

if (Meteor.isServer) {
    Meteor.publish('characters', function charactersPublication(){
        console.log("publish");
        return Characters.find();
    });
}
if (Meteor.isClient) {
    console.log("subscribe");
    Meteor.subscribe("characters");
}

Meteor.methods({
    'characters.insert'(
        _id,
        characterID,
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
        money) 
    {
    
        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Characters.insert(
        {
            _id,
            characterID, 
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
            money
        });
    },
  
    'characters.remove'(_id) {
        check(_id, String);
        Characters.remove(_id);
    },
  
    'characters.update'(
        _id,
        characterID, 
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
        money)
    {
        // These check methods need to check the data type of the parameters we are updating with
        Characters.update(_id, { 
            $set: { 
                characterID,
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
                money 
            } 
        });
    },
});


