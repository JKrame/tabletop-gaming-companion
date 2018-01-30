import React from 'react'
import { Meteor } from 'meteor/meteor'

import PropTypes from 'prop-types';

import { Characters } from '../api/character';

export default class CharacterForm extends React.Component{
    _id;

    onSubmit(e){  
        e.preventDefault();

        //basic attributes
        characterID = this.characterID;
        campaignID = null;
        UID = Meteor.userId();
        
        attributes = [str=this.refs.str.value.trim(), dex=this.refs.dex.value.trim(), con=this.refs.con.value.trim(), int=this.refs.int.value.trim(), wis=this.refs.wis.value.trim(), cha=this.refs.cha.value.trim()];

        spellSlotsMax = null;
        spellSlotsCurr = null;
        statuses = null;
        money = [cp=null, sp=null, ep=null, gp=null];

        //inventory subdocuments
        itemName = null;
        itemDescription = null;

        //current weapon subdocuments
        //currWeaponName = null;
        currWeaponType = null;
        currWeaponDamage = null;

        //features subdocument
        featureName = null;
        featureDescription = null;

        
        Meteor.call('characters.update',
            _id,
            characterID,
            campaignID,
            UID,
            this.refs.characterName.value.trim(),
            this.refs.characterClass.value.trim(),
            this.refs.level.value.trim(),
            this.refs.background.value.trim(),
            this.refs.race.value.trim(),
            this.refs.alignment.value.trim(),
            this.refs.AC.value.trim(),
            this.refs.speed.value.trim(),
            this.refs.maxHP.value.trim(),
            this.refs.currHP.value.trim(),
            this.refs.maxHitDie.value.trim(),
            this.refs.currHitDie.value.trim(),
            this.refs.hitDie.value.trim(),
            this.refs.profBonus.value.trim(),
            this.refs.notes.value.trim(),
            { 
                currWeaponName : this.refs.currWeaponName.value.trim(),
                currWeaponType,
                currWeaponDamage
            },
            {
                featureName,		
                featureDescription		
            },
            {
                itemName,
                itemDescription
            },
            this.refs.proficiencies.value.trim(),
            attributes,
            this.refs.savingThrows.value.trim(),
            spellSlotsMax,
            spellSlotsCurr,
            statuses,
            money
        );
    }
    
    render() {
        cid = this.props._id
        console.log("CharacterForm _id: " + Meteor.userId());

        character = Characters.fetch();
        console.log(character);

        return(
            <form onSubmit={this.onSubmit.bind(this)}>
                <div className="scrolling-container-smaller">
                    
                    <div className="col-sm-12">
                        <p className="p-override">NAME</p>
                        <input className="full-width" type="text" ref="characterName" defaultValue={character ? character.characterName : ""} placeholder=""/>
                    </div>

                    <div className="col-sm-12">
                        <p className="p-override">BACKSTORY</p>
                        <input className="full-width" type="textarea" ref="characterBackstory" defaultValue={character ? character.characterBackstory : ""} style={{"height":200}}/>
                    </div>

                                <div className="spacer col-sm-12"/>
                                <div className="hr full-width col-sm-12"/>

                    <div className="col-sm-4">
                        <p className="p-override">LEVEL</p>
                        <input className="full-width" type="text" ref="level" defaultValue={character ? character.level : ""} placeholder=""/>
                    </div>
                    <div className="col-sm-4">
                        <p className="p-override">CLASS</p>
                        <input className="full-width" type="text" ref="characterClass" defaultValue={character ? character.characterClass : ""} placeholder=""/>
                    </div>
                    <div className="col-sm-4">
                        <p className="p-override">RACE</p>
                        <input className="full-width" type="text" ref="race" defaultValue={character ? character.race : ""} placeholder=""/>
                    </div>

                                <div className="spacer col-sm-12"/>

                    <div className="col-sm-6">
                        <p className="p-override">ALIGNMENT</p>
                        <input className="full-width" type="text" ref="alignment" defaultValue={character ? character.alignment : ""} placeholder=""/>
                    </div>
                    <div className="col-sm-6">
                        <p className="p-override">BACKGROUND</p>
                        <input className="full-width" type="text" ref="background" defaultValue={character ? character.background : ""} placeholder=""/>
                    </div>

                            <div className="spacer col-sm-12"/>

                            <div className="hr full-width col-sm-12"/>

                    <div className="col-sm-4">
                        <p className="p-override">AC</p>
                        <input className="full-width" type="text" ref="AC" defaultValue={character ? character.AC : ""} placeholder=""/>
                    </div>
                    <div className="col-sm-4">
                        <p className="p-override">MAX HP</p>
                        <input className="full-width" type="text" ref="maxHP" defaultValue={character ? character.maxHP : ""} placeholder=""/>
                    </div>
                    <div className="col-sm-4">
                        <p className="p-override">TEMP HP</p>
                        <input className="full-width" type="text" ref="currHP" defaultValue={character ? character.currHP : ""} placeholder=""/>
                    </div>

                                <div className="spacer col-sm-12"/>

                    <div className="col-sm-4">
                        <p className="p-override">INITIATIVE</p>
                        <input className="full-width" type="text" ref="characterInitiative" defaultValue={character ? character.characterInitiative : ""} placeholder=""/>
                    </div>
                    <div className="col-sm-4">
                        <p className="p-override">SPEED</p>
                        <input className="full-width" type="text" ref="speed" defaultValue={character ? character.speed : ""} placeholder=""/>
                    </div>

                                <div className="spacer col-sm-12"/>
                                <div className="hr full-width col-sm-12"/>

                                
                    <div className="col-sm-4">
                        <p className="p-override">HIT DICE</p>
                        <input className="full-width" type="text" ref="hitDie" defaultValue={character ? character.hitDie : ""} placeholder=""/>
                    </div>
                    <div className="col-sm-4">
                        <p className="p-override">TOTAL HIT DICE</p>
                        <input className="full-width" type="text" ref="maxHitDie" defaultValue={character ? character.maxHitDie : ""} placeholder=""/>
                    </div>
                    <div className="col-sm-4">
                        <p className="p-override">TEMP HIT DICE</p>
                        <input className="full-width" type="text" ref="currHitDie" defaultValue={character ? character.currHitDie : ""} placeholder=""/>
                    </div>

                                <div className="spacer col-sm-12"/>

                    <div className="col-sm-4">
                        <p className="p-override">DEATH SAVE SUCCESSES</p>
                        <input className="full-width" type="text" ref="characterDeathSaveSuccesses" defaultValue={character ? character.characterDeathSaveSuccesses : ""} placeholder=""/>
                    </div>
                    <div className="col-sm-4">
                        <p className="p-override">DEATH SAVE FAILURES</p>
                        <input className="full-width" type="text" ref="characterDeathSaveFailures" defaultValue={character ? character.characterDeathSaveFailures : ""} placeholder=""/>
                    </div>

                                <div className="spacer col-sm-12"/>

                                <div className="hr full-width col-sm-12"/>

                                                            
                    <div className="col-sm-2 col-xs-4">
                        <p className="p-override">STRENGTH</p>
                        <input className="full-width" type="text" ref="str" defaultValue={character ? character.str : ""} placeholder=""/>
                    </div>
                    <div className="col-sm-2 col-xs-4">
                        <p className="p-override">DEXTERITY</p>
                        <input className="full-width" type="text" ref="dex" defaultValue={character ? character.dex : ""} placeholder=""/>
                    </div>
                    <div className="col-sm-2 col-xs-4">
                        <p className="p-override">CONSTITUTION</p>
                        <input className="full-width" type="text" ref="con" defaultValue={character ? character.con : ""} placeholder=""/>
                    </div>

                    <div className="col-sm-2 col-xs-4">
                        <p className="p-override">INTELLIGENCE</p>
                        <input className="full-width" type="text" ref="int" defaultValue={character ? character.int : ""} placeholder=""/>
                    </div>
                    <div className="col-sm-2 col-xs-4">
                        <p className="p-override">WISDOM</p>
                        <input className="full-width" type="text" ref="wis" defaultValue={character ? character.wis : ""} placeholder=""/>
                    </div>
                    <div className="col-sm-2 col-xs-4">
                        <p className="p-override">CHARISMA</p>
                        <input className="full-width" type="text" ref="cha" defaultValue={character ? character.cha : ""} placeholder=""/>
                    </div>

                                <div className="spacer col-sm-12"/>

                                
                    <div className="col-sm-4">
                        <p className="p-override">PROFICIENCY BONUS</p>
                        <input className="full-width" type="text" ref="profBonus" defaultValue={character ? character.profBonus : ""} placeholder=""/>
                    </div>
                    <div className="col-sm-4">
                        <p className="p-override">INSPIRATION</p>
                        <input className="full-width" type="text" ref="characterInspiration" defaultValue={character ? character.characterInspiration : ""} placeholder=""/>
                    </div>
                    <div className="col-sm-4">
                        <p className="p-override">PERCEPTION</p>
                        <input className="full-width" type="text" ref="characterPerception" defaultValue={character ? character.characterPerception : ""} placeholder=""/>
                    </div>
                                
                            <div className="spacer col-sm-12"/>
                            <div className="hr full-width col-sm-12"/>

                    <div className="col-sm-6">
                        <p className="p-override">SAVING THROWS (ctrl+click for multi-select)</p>
                        <select className="full-width no-scrollbar" ref="savingThrows" /*defaultValue={character ? character.savingThrows : ""}*/ size={6} multiple>
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
                        <select className="full-width no-scrollbar" ref="characterSkills" /*defaultValue={character ? character.characterSkills : ""}*/ size={18} multiple>
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
                        <input className="full-width" type="text" ref="currWeaponName" defaultValue={character ? character.currWeaponName : ""} placeholder=""/>
                    </div>
                    <div className="col-sm-2">
                        <p className="p-override">ATK BONUS</p>
                        <input className="full-width" type="text" ref="weapon1Atk" defaultValue={character ? character.weapon1Atk : ""} placeholder=""/>
                    </div>
                    <div className="col-sm-5">
                        <p className="p-override">DAMAGE/TYPE</p>
                        <input className="full-width" type="text" ref="weapon1DamageType" defaultValue={character ? character.weapon1DamageType : ""} placeholder=""/>
                    </div>
                    <div className="half-spacer col-sm-12"/>
                    
                    <div className="col-sm-5">
                        <input className="full-width" type="text" ref="weapon2Name" defaultValue={character ? character.weapon2Name : ""} placeholder=""/>
                    </div>
                    <div className="col-sm-2">
                        <input className="full-width" type="text" ref="weapon2Atk" defaultValue={character ? character.weapon2Atk : ""} placeholder=""/>
                    </div>
                    <div className="col-sm-5">
                        <input className="full-width" type="text" ref="weapon2DamageType" defaultValue={character ? character.weapon2DamageType : ""} placeholder=""/>
                    </div>
                    <div className="half-spacer col-sm-12"/>
                    
                    <div className="col-sm-5">
                        <input className="full-width" type="text" ref="weapon3Name" defaultValue={character ? character.weapon3Name : ""} placeholder=""/>
                    </div>
                    <div className="col-sm-2">
                        <input className="full-width" type="text" ref="weapon3Atk" defaultValue={character ? character.weapon3Atk : ""} placeholder=""/>
                    </div>
                    <div className="col-sm-5">
                        <input className="full-width" type="text" ref="weapon3DamageType" defaultValue={character ? character.weapon3DamageType : ""} placeholder=""/>
                    </div>
                    <div className="half-spacer col-sm-12"/>

                    <div className="col-sm-12">
                        <input className="full-width" type="textarea" ref="attackNotes" defaultValue={character ? character.attackNotes : ""} style={{"height":200}}/>
                    </div>

                                <div className="spacer col-sm-12"/>
                                <div className="hr full-width col-sm-12"/>

                    <div className="col-sm-12">
                        <h4>PROFICIENCIES & LANGUAGES</h4>
                    </div>
                    
                    <div className="col-sm-12">
                        <input className="full-width" type="textarea" ref="proficiencies" defaultValue={character ? character.proficiencies : ""} style={{"height":200}}/>
                    </div>

                                <div className="spacer col-sm-12"/>
                                <div className="hr full-width col-sm-12"/>

                    <div className="col-sm-12">
                        <h4>EQUIPMENT</h4>
                    </div>
                    
                    <div className="col-sm-12">
                        <input className="full-width" type="textarea" ref="equipmentNotes" defaultValue={character ? character.equipmentNotes : ""} style={{"height":200}}/>
                    </div>

                                <div className="spacer col-sm-12"/>
                                <div className="hr full-width col-sm-12"/>

                    <div className="col-sm-12">
                        <h4>FEATURES & TRAITS</h4>
                    </div>
                    
                    <div className="col-sm-12">
                        <input className="full-width" type="textarea" ref="notes" defaultValue={character ? character.notes : ""} style={{"height":200}}/>
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