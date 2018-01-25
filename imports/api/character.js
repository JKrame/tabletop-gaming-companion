import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Characters = new Mongo.Collection('characters');

if (Meteor.isServer) {
    Meteor.publish("characters", function charactersPublication(){
        return Characters.find();
    });
}

Meteor.methods({
    'characters.insert'(
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
        check(text, String);
    
        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Characters.insert(
        {
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
        check(taskId, String);
        check(setChecked, Boolean);
        Characters.update(characterID, { 
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
                money 
            } 
        });
    },
});


