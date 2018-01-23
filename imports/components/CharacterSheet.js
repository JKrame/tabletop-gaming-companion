import React from 'react'
import { Characters } from '../api/character';
import { Random } from 'meteor/random'

export default class CharacterSheet extends React.Component{

  onSubmit(e){  
    //gets the character name
    const characterName = this.refs.characterName.value.trim();
    const characterClass = this.refs.characterClass.value.trim();

    e.preventDefault();

    //basic attributes
    characterID = null;
    campaignID = null;
    UID = null;
    name = characterName;
    characterClass = characterClass;
    level = null;
    background = null;
    race = null;
    alignment = null;
    AC = null;
    Speed = null;
    MaxHP = null;
    CurrHP = null;
    MaxHitDie = level;
    currHitDie = null;
    HitDie = null;
    ProfBonus = null;
    Notes = null;
    //CurrWeapon = null;
    //features = null;
    //inventory = ;
    proficiencies = null;
    attributes = [str=null, dex=null, con=null, int=null, wis=null, cha=null];
    savingThrows = null;
    spellSlotsMax = null;
    spellSlotsCurr = null;
    statuses = null;
    money = [cp=null, sp=null, ep=null, gp=null];

    //inventory subdocuments
    itemName = null;
    itemDescription = null

    //current weapon subdocuments
    currWeaponName = null;
    currWeaponType = null;
    currWeaponDamage = null;

    //features subdocument
    featureName = null;
    featureDescription = null;



    //checks if value exists
    if (characterName && characterClass) {
      Characters.insert({ 
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
          Speed,
          MaxHP,
          CurrHP,
          MaxHitDie,
          currHitDie,
          HitDie,
          ProfBonus,
          Notes,
          CurrWeapon : {
                currWeaponName,
                currWeaponType,
                currWeaponDamage
            },
          features : {
                featureName,
                featureDescription
            },
          inventory : {
                itemName,
                itemDescription
            },
          proficiencies,
          attributes,
          savingThrows,
          spellSlotsMax,
          spellSlotsCurr,
          statuses,
          money
           });
      this.refs.characterName.value = '';
      this.refs.characterClass.value = '';
    }
  }
  
  render() {
    return(
      <div className="page-wrapper">
          <div className="col-lg-8 col-lg-offset-2">
            <div className="page-content">
              <h3>Character Sheet >></h3>
              <hr/>
              <p>Add Character</p>
              <form onSubmit={this.onSubmit.bind(this)}>
                <input type="text" ref="characterName" placeholder="Character Name"/>
                <input type="text" ref="characterClass" placeholder="Character Class"/>
                <button>Create Character</button>
              </form>
            </div>
          </div>
        </div>
    );
  }
}  