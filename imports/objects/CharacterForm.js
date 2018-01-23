import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Random } from 'meteor/random'

import { Characters } from '../api/character';

export default class CharacterForm extends React.Component{
    characterID;
    newCharacter;

    onSubmit(e){  
        //gets the character name
        const name = this.refs.name.value.trim();
        //const characterBackstory = this.refs.characterBackstory.value.trim();
        const level = this.refs.level.value.trim();
        const characterClass = this.refs.characterClass.value.trim();
        const race = this.refs.race.value.trim();
        const alignment = this.refs.alignment.value.trim();
        const background = this.refs.background.value.trim();
        const AC = this.refs.AC.value.trim();
        const maxHP = this.refs.maxHP.value.trim();
        const currHP = this.refs.currHP.value.trim();
        //const characterInitiative = this.refs.characterInitiative.value.trim();
        const speed = this.refs.speed.value.trim();
        const hitDie = this.refs.hitDie.value.trim();
        const maxHitDie = this.refs.maxHitDie.value.trim();
        const currHitDie = this.refs.currHitDie.value.trim();
        //const characterDeathSaveSuccesses = this.refs.characterDeathSaveSuccesses.value.trim();
        //const characterDeathSaveFailures = this.refs.characterDeathSaveFailures.value.trim();
        const str = this.refs.str.value.trim();
        const dex = this.refs.dex.value.trim();
        const con = this.refs.con.value.trim();
        const int = this.refs.int.value.trim();
        const wis = this.refs.wis.value.trim();
        const cha = this.refs.cha.value.trim();
        const profBonus = this.refs.profBonus.value.trim();
        //const characterInspiration = this.refs.characterInspiration.value.trim();
        //const characterPerception = this.refs.characterPerception.value.trim();
        const savingThrows = this.refs.savingThrows.value.trim();
        //const characterSkills = this.refs.characterSkills.value.trim();
        const currWeaponName = this.refs.currWeaponName.value.trim();
        // const weapon1Atk = this.refs.weapon1Atk.value.trim();
        // const weapon1DamageType = this.refs.weapon1DamageType.value.trim();
        // const weapon2Name = this.refs.weapon2Name.value.trim();
        // const weapon2Atk = this.refs.weapon2Atk.value.trim();
        // const weapon2DamageType = this.refs.weapon2DamageType.value.trim();
        // const weapon3Name = this.refs.weapon3Name.value.trim();
        // const weapon3Atk = this.refs.weapon3Atk.value.trim();
        //const weapon3DamageType = this.refs.weapon3DamageType.value.trim();
        //const attackNotes = this.refs.attackNotes.value.trim();
        const proficiencies = this.refs.proficiencies.value.trim();
        const notes = this.refs.notes.value.trim();
    
        e.preventDefault();

        if(newCharacter){
            //db.Characters.insert({characterID: this.characterID});
        }
        else{
            //Characters.update({characterID: this.characterID}, {$set:{name: "elfman", class: "druid"}});
        }

        //basic attributes
        characterID = this.characterID;
        campaignID = null;
        UID = Meteor.userId();
        //UID = null;
        //name = characterName;
        //characterClass = characterClass;
        //level = null;
        //background = null;
        //race = null;
        //alignment = null;
        //AC = null;
        //speed = null;
        //maxHP = null;
        //currHP = null;
        //maxHitDie = level;
        //currHitDie = null;
        //hitDie = null;
        //profBonus = null;
        //notes = null;
        //proficiencies = null;
        attributes = [str, dex, con, int, wis, cha];
        //savingThrows = null;
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
            speed,
            maxHP,
            currHP,
            maxHitDie,
            currHitDie,
            hitDie,
            profBonus,
            notes,
            currWeapon : {
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
        if (this.props.characterID == "undefined"){
            this.newCharacter = true;
            this.characterID = Random.id();

            console.log("generate random ID");
            console.log(this.characterID);
        }
        else{
            this.newCharacter = false;
            this.characterID = this.props.characterID;
            dbCursor = Characters.find({"characterID": this.characterID});

            console.log('CharacterID: ' + this.characterID);
            console.log('UserID: ' + Meteor.userId());
            console.log(dbCursor);
            console.log("From DB: " + dbCursor.collection._docs._map.characterID);
        }

        return(

            <form onSubmit={this.onSubmit.bind(this)}>
                <div className="scrolling-container-smaller">
                    
                    <div className="col-sm-12">
                        <p className="p-override">NAME</p>
                        <input className="full-width" type="text" ref="name" placeholder=""/>
                    </div>

                    <div className="col-sm-12">
                        <p className="p-override">BACKSTORY</p>
                        <input className="full-width" type="textarea" ref="characterBackstory" style={{"height":200}}/>
                    </div>

                                <div className="spacer col-sm-12"/>
                                <div className="hr full-width col-sm-12"/>

                    <div className="col-sm-4">
                        <p className="p-override">LEVEL</p>
                        <input className="full-width" type="text" ref="level" placeholder=""/>
                    </div>
                    <div className="col-sm-4">
                        <p className="p-override">CLASS</p>
                        <input className="full-width" type="text" ref="characterClass" placeholder=""/>
                    </div>
                    <div className="col-sm-4">
                        <p className="p-override">RACE</p>
                        <input className="full-width" type="text" ref="race" placeholder=""/>
                    </div>

                                <div className="spacer col-sm-12"/>

                    <div className="col-sm-6">
                        <p className="p-override">ALIGNMENT</p>
                        <input className="full-width" type="text" ref="alignment" placeholder=""/>
                    </div>
                    <div className="col-sm-6">
                        <p className="p-override">BACKGROUND</p>
                        <input className="full-width" type="text" ref="background" placeholder=""/>
                    </div>

                            <div className="spacer col-sm-12"/>

                            <div className="hr full-width col-sm-12"/>

                    <div className="col-sm-4">
                        <p className="p-override">AC</p>
                        <input className="full-width" type="text" ref="AC" placeholder=""/>
                    </div>
                    <div className="col-sm-4">
                        <p className="p-override">MAX HP</p>
                        <input className="full-width" type="text" ref="maxHP" placeholder=""/>
                    </div>
                    <div className="col-sm-4">
                        <p className="p-override">TEMP HP</p>
                        <input className="full-width" type="text" ref="currHP" placeholder=""/>
                    </div>

                                <div className="spacer col-sm-12"/>

                    <div className="col-sm-4">
                        <p className="p-override">INITIATIVE</p>
                        <input className="full-width" type="text" ref="characterInitiative" placeholder=""/>
                    </div>
                    <div className="col-sm-4">
                        <p className="p-override">SPEED</p>
                        <input className="full-width" type="text" ref="speed" placeholder=""/>
                    </div>

                                <div className="spacer col-sm-12"/>
                                <div className="hr full-width col-sm-12"/>

                                
                    <div className="col-sm-4">
                        <p className="p-override">HIT DICE</p>
                        <input className="full-width" type="text" ref="hitDie" placeholder=""/>
                    </div>
                    <div className="col-sm-4">
                        <p className="p-override">TOTAL HIT DICE</p>
                        <input className="full-width" type="text" ref="maxHitDie" placeholder=""/>
                    </div>
                    <div className="col-sm-4">
                        <p className="p-override">TEMP HIT DICE</p>
                        <input className="full-width" type="text" ref="currHitDie" placeholder=""/>
                    </div>

                                <div className="spacer col-sm-12"/>

                    <div className="col-sm-4">
                        <p className="p-override">DEATH SAVE SUCCESSES</p>
                        <input className="full-width" type="text" ref="characterDeathSaveSuccesses" placeholder=""/>
                    </div>
                    <div className="col-sm-4">
                        <p className="p-override">DEATH SAVE FAILURES</p>
                        <input className="full-width" type="text" ref="characterDeathSaveFailures" placeholder=""/>
                    </div>

                                <div className="spacer col-sm-12"/>

                                <div className="hr full-width col-sm-12"/>

                                                            
                    <div className="col-sm-2 col-xs-4">
                        <p className="p-override">STRENGTH</p>
                        <input className="full-width" type="text" ref="str" placeholder=""/>
                    </div>
                    <div className="col-sm-2 col-xs-4">
                        <p className="p-override">DEXTERITY</p>
                        <input className="full-width" type="text" ref="dex" placeholder=""/>
                    </div>
                    <div className="col-sm-2 col-xs-4">
                        <p className="p-override">CONSTITUTION</p>
                        <input className="full-width" type="text" ref="con" placeholder=""/>
                    </div>

                    <div className="col-sm-2 col-xs-4">
                        <p className="p-override">INTELLIGENCE</p>
                        <input className="full-width" type="text" ref="int" placeholder=""/>
                    </div>
                    <div className="col-sm-2 col-xs-4">
                        <p className="p-override">WISDOM</p>
                        <input className="full-width" type="text" ref="wis" placeholder=""/>
                    </div>
                    <div className="col-sm-2 col-xs-4">
                        <p className="p-override">CHARISMA</p>
                        <input className="full-width" type="text" ref="cha" placeholder=""/>
                    </div>

                                <div className="spacer col-sm-12"/>

                                
                    <div className="col-sm-4">
                        <p className="p-override">PROFICIENCY BONUS</p>
                        <input className="full-width" type="text" ref="profBonus" placeholder=""/>
                    </div>
                    <div className="col-sm-4">
                        <p className="p-override">INSPIRATION</p>
                        <input className="full-width" type="text" ref="characterInspiration" placeholder=""/>
                    </div>
                    <div className="col-sm-4">
                        <p className="p-override">PERCEPTION</p>
                        <input className="full-width" type="text" ref="characterPerception" placeholder=""/>
                    </div>
                                
                            <div className="spacer col-sm-12"/>
                            <div className="hr full-width col-sm-12"/>

                    <div className="col-sm-6">
                        <p className="p-override">SAVING THROWS (ctrl+click for multi-select)</p>
                        <select className="full-width no-scrollbar" ref="savingThrows" size={6} multiple>
                            <option value="savingThrowStrength">Strength</option>
                            <option value="savingThrowDexterity">Dexterity</option>
                            <option value="savingThrowConstitution">Constitution</option>
                            <option value="savingThrowIntelligence">Intelligence</option>
                            <option value="savingThrowWisdom">Wisdom</option>
                            <option value="savingThrowCharisma">Charisma</option>
                        </select>
                    </div>
                    <div className="col-sm-6">
                        <p className="p-override">SKILLS (ctrl+click for multi-select)</p>
                        <select className="full-width no-scrollbar" ref="characterSkills" size={18} multiple>
                            <option value="skillAcrobatics">Acrobatics</option>
                            <option value="skillAnimalHandling">Animal handling</option>
                            <option value="skillArcana">Arcana</option>
                            <option value="skillAthletics">Athletics</option>
                            <option value="skillDeception">Deception</option>
                            <option value="skillHistory">History</option>
                            <option value="skillInsight">Insight</option>
                            <option value="skillIntimidation">Intimidation</option>
                            <option value="skillInvestigation">Investigation</option>
                            <option value="skillMedicine">Medicine</option>
                            <option value="skillNature">Nature</option>
                            <option value="skillPerception">Perception</option>
                            <option value="skillPersuasion">Persuasion</option>
                            <option value="skillRelgion">Religion</option>
                            <option value="skillSleightOfHand">Sleight Of Hand</option>
                            <option value="skillStealth">Stealth</option>
                            <option value="skillSurvival">Survival</option>
                        </select>
                    </div>

                                <div className="spacer col-sm-12"/>
                                <div className="hr full-width col-sm-12"/>

                    <div className="col-sm-12">
                        <h4>ATTACK & SPELLCASTING</h4>
                    </div>
                    <div className="col-sm-5">
                        <p className="p-override">NAME</p>
                        <input className="full-width" type="text" ref="currWeaponName" placeholder=""/>
                    </div>
                    <div className="col-sm-2">
                        <p className="p-override">ATK BONUS</p>
                        <input className="full-width" type="text" ref="weapon1Atk" placeholder=""/>
                    </div>
                    <div className="col-sm-5">
                        <p className="p-override">DAMAGE/TYPE</p>
                        <input className="full-width" type="text" ref="weapon1DamageType" placeholder=""/>
                    </div>
                    <div className="half-spacer col-sm-12"/>
                    
                    <div className="col-sm-5">
                        <input className="full-width" type="text" ref="weapon2Name" placeholder=""/>
                    </div>
                    <div className="col-sm-2">
                        <input className="full-width" type="text" ref="weapon2Atk" placeholder=""/>
                    </div>
                    <div className="col-sm-5">
                        <input className="full-width" type="text" ref="weapon2DamageType" placeholder=""/>
                    </div>
                    <div className="half-spacer col-sm-12"/>
                    
                    <div className="col-sm-5">
                        <input className="full-width" type="text" ref="weapon3Name" placeholder=""/>
                    </div>
                    <div className="col-sm-2">
                        <input className="full-width" type="text" ref="weapon3Atk" placeholder=""/>
                    </div>
                    <div className="col-sm-5">
                        <input className="full-width" type="text" ref="weapon3DamageType" placeholder=""/>
                    </div>
                    <div className="half-spacer col-sm-12"/>

                    <div className="col-sm-12">
                        <input className="full-width" type="textarea" ref="attackNotes" style={{"height":200}}/>
                    </div>

                                <div className="spacer col-sm-12"/>
                                <div className="hr full-width col-sm-12"/>

                    <div className="col-sm-12">
                        <h4>PROFICIENCIES & LANGUAGES</h4>
                    </div>
                    
                    <div className="col-sm-12">
                        <input className="full-width" type="textarea" ref="proficiencies" style={{"height":200}}/>
                    </div>

                                <div className="spacer col-sm-12"/>
                                <div className="hr full-width col-sm-12"/>

                    <div className="col-sm-12">
                        <h4>EQUIPMENT</h4>
                    </div>
                    
                    <div className="col-sm-12">
                        <input className="full-width" type="textarea" ref="equipmentNotes" style={{"height":200}}/>
                    </div>

                                <div className="spacer col-sm-12"/>
                                <div className="hr full-width col-sm-12"/>

                    <div className="col-sm-12">
                        <h4>FEATURES & TRAITS</h4>
                    </div>
                    
                    <div className="col-sm-12">
                        <input className="full-width" type="textarea" ref="notes" style={{"height":200}}/>
                    </div>
                            
                    <div className="spacer col-sm-12"/>
                    <div className="spacer col-sm-12"/>
                    <div className="spacer col-sm-12"/>

                </div>
                    
                                <div className="spacer col-sm-12"/>

                <div className="col-sm-12">
                    <button className="full-width submit-button">SUBMIT CHANGES</button>
                </div>
            </form>
        );
    }
}