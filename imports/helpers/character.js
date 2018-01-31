import React from 'react'

export class Character extends React.Component{
    _id;
    characterID;
    campaignID;
    UID;
    characterName;
    characterClass;
    level;
    background;
    race;
    alignment;
    AC;
    speed;
    maxHP;
    currHP;
    maxHitDie;
    currHitDie;
    hitDie;
    profBonus;
    notes;
    currWeapon;
    features;
    inventory;
    proficiencies;
    attributes;
    savingThrows;
    spellSlotsMax;
    spellSlotsCurr;
    statuses;
    money;

    constructor(props){
        this._id = props._id;
        this.characterID = props.characterID;
        this.campaignID = props.campaignID;
        this.UID = props.UID;
        this.characterName = props.characterName;
        this.characterClass = props.characterClass;
        this.level = props.level;
        this.background = props.background;
        this.race = props.race;
        this.alignment = props.alignment;
        this.AC = props.AC;
        this.speed = props.speed;
        this.maxHP = props.maxHP;
        this.currHP = props.currHP;
        this.maxHitDie = props.maxHitDie;
        this.currHitDie = props.currHitDie;
        this.hitDie = props.hitDie;
        this.profBonus = props.profBonus;
        this.notes = props.notes;
        this.currWeapon = props.currWeapon;
        this.features = props.features;
        this.inventory = props.inventory;
        this.proficiencies = props.proficiencies;
        this.attributes = props.attributes;
        this.savingThrows = props.savingThrows;
        this.spellSlotsMax = props.spellSlotsMax;
        this.spellSlotsCurr = props.spellSlotsCurr;
        this.statuses = props.statuses;
        this.money = props.money;
    }
  }