import React from 'react'
import { Meteor } from 'meteor/meteor'

import PropTypes from 'prop-types';

//import { Characters } from '../api/character';

export default class CharacterForm extends React.Component{
    onSubmit(e){  
        e.preventDefault();

        //gets saving throws
        var savingThrowOptions = this.refs.savingThrows;
        var savingThrowValue = [];
        for (var i = 0, l = savingThrowOptions.length; i < l; i++) {
            if (savingThrowOptions[i].selected) {
                savingThrowValue.push(savingThrowOptions[i].value);
            }
        }
        
        //gets skills
        var skillOptions = this.refs.characterSkills;
        var skillValue = [];
        for (var i = 0, l = skillOptions.length; i < l; i++) {
            if (skillOptions[i].selected) {
                skillValue.push(skillOptions[i].value);
            }
        }
        //console.log(skillValue)

        character = this.props.character;
        
        attributes = [str=this.refs.str.value.trim(), dex=this.refs.dex.value.trim(), con=this.refs.con.value.trim(), int=this.refs.int.value.trim(), wis=this.refs.wis.value.trim(), cha=this.refs.cha.value.trim()];
        spellSlotsMax = [this.refs.lvl1Spell.value, this.refs.lvl2Spell.value, this.refs.lvl3Spell.value, this.refs.lvl4Spell.value, this.refs.lvl5Spell.value, this.refs.lvl6Spell.value, this.refs.lvl7Spell.value, this.refs.lvl8Spell.value, this.refs.lvl9Spell.value];
        spellSlotsCurr = spellSlotsMax;
        statuses = null;
        money = [cp=null, sp=null, ep=null, gp=null];
        //inventory subdocuments
        itemName = null;
        itemDescription = null;
        //current weapon subdocuments

        //features subdocument
        featureName = null;
        featureDescription = null;
        var UID;
        if(this.props.UID == "npc")
        {
            UID = "npc";
        }
        else
        {
            UID = Meteor.userId();
        }

        Meteor.call('characters.update',
            character._id,
            character.campaignID,
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
                currWeaponBonus: this.refs.weapon1Atk.value.trim(),
                currWeaponDamage : this.refs.weapon1DamageType.value.trim(),
                weapon2Name : this.refs.weapon2Name.value.trim(),
                weapon2Bonus : this.refs.weapon2Atk.value.trim(),
                weapon2damage : this.refs.weapon2DamageType.value.trim(),
                weapon3Name : this.refs.weapon3Name.value.trim(),
                weapon3Bonus : this.refs.weapon3Atk.value.trim(),
                weapon3damage : this.refs.weapon3DamageType.value.trim()
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
            savingThrowValue,
            spellSlotsMax,
            spellSlotsCurr,
            statuses,
            money,
            this.refs.characterImageURL.value.trim(),
            false,
            skillValue,
            this.refs.characterInitiative.value.trim(),
            this.refs.tempHP.value.trim(),
            this.refs.characterDeathSaveSuccesses.value.trim(),
            this.refs.characterDeathSaveFailures.value.trim(),
            this.refs.characterInspiration.value.trim(),
            this.refs.characterPerception.value.trim(),
            this.refs.attackNotes.value.trim(),
            this.refs.equipmentNotes.value.trim()
        );
    }
    deleteCharacter(id) {
        if(confirm('Delete this character?')) {

            Meteor.call("campaigns.removeCharacter", this.props.character.campaignID, this.props.character._id)

            Meteor.call('characters.remove', id);
            window.location.replace("/home");
        }
    }

    renderImage(){
        return '/images/photoMissing.png';
    }
    
    render() {
        character = this.props.character;

        return(
            <div className="col-xs-12">
                <div className="col-sm-4 split-page-left container">
                    <img src={character.characterImageURL != null && character.characterImageURL != "" ? character.characterImageURL : '/images/photoMissing.png'} className="full-width" draggable="false"/>
                    <div className="spacer col-sm-12"/>

                        <div className="col-sm-12">
                            <p className="p-override">IMAGE URL</p>
                            <input className="full-width" type="text" ref="characterImageURL" defaultValue={character.characterImageURL != null ? character.characterImageURL : ""}/>
                        </div>

                        <div className="spacer col-sm-12"/>
                        <div className="spacer col-sm-12"/>


                </div>

                <div className="col-sm-8 split-page-right left-border container">
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <div className="scrolling-container-smaller">
                            <div className="col-sm-12">
                                <p className="p-override">NAME</p>
                                <input className="full-width" type="text" ref="characterName" defaultValue={character.characterName != null ? character.characterName : undefined}/>
                            </div>
                            <div className="spacer col-sm-12"/>
                            <div className="spacer col-sm-12"/>

                            <div className="col-sm-12">
                                <p className="p-override">BACKSTORY</p>
                                <textarea rows={10} className="full-width"  ref="characterBackstory" defaultValue={character.characterName != null ? character.characterName : undefined}/>
                            </div>

                                <div className="spacer col-sm-12"/>
                                <div className="hr full-width col-sm-12"/>

                            <div className="col-sm-4">
                                <p className="p-override">LEVEL</p>
                                <input className="full-width" type="number" ref="level" defaultValue={character.level != null ? character.level : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-4">
                                <p className="p-override">CLASS</p>
                                <input className="full-width" type="text" ref="characterClass" defaultValue={character.characterClass != null ? character.characterClass : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-4">
                                <p className="p-override">RACE</p>
                                <input className="full-width" type="text" ref="race" defaultValue={character.race != null ? character.race : ""} placeholder=""/>
                            </div>

                                        <div className="spacer col-sm-12"/>

                            <div className="col-sm-6">
                                <p className="p-override">ALIGNMENT</p>
                                <input className="full-width" type="text" ref="alignment" defaultValue={character.alignment != null ? character.alignment : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-6">
                                <p className="p-override">BACKGROUND</p>
                                <input className="full-width" type="text" ref="background" defaultValue={character.background != null ? character.background : ""} placeholder=""/>
                            </div>

                                    <div className="spacer col-sm-12"/>

                                    <div className="hr full-width col-sm-12"/>

                            <div className="col-sm-4">
                                <p className="p-override">AC</p>
                                <input className="full-width" type="number" ref="AC" defaultValue={character.AC != null ? character.AC : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-4">
                                <p className="p-override">MAX HP</p>
                                <input className="full-width" type="number" ref="maxHP" defaultValue={character.maxHP != null ? character.maxHP : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-4">
                                <p className="p-override">TEMP HP</p>
                                <input className="full-width" type="number" ref="tempHP" defaultValue={character.tempHP != null ? character.tempHP : ""} placeholder=""/>
                            </div>

                                        <div className="spacer col-sm-12"/>

                            <div className="col-sm-4">
                                <p className="p-override">INITIATIVE</p>
                                <input className="full-width" type="number" ref="characterInitiative" defaultValue={character.characterInitiative != null ? character.characterInitiative : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-4">
                                <p className="p-override">SPEED</p>
                                <input className="full-width" type="number" ref="speed" defaultValue={character.speed != null ? character.speed : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-4">
                                <p className="p-override">Curr HP</p>
                                <input className="full-width" type="number" ref="currHP" defaultValue={character.currHP != null ? character.currHP : ""} placeholder=""/>
                            </div>

                                        <div className="spacer col-sm-12"/>
                                        <div className="hr full-width col-sm-12"/>

                                        
                            <div className="col-sm-4">
                                <p className="p-override">HIT DICE</p>
                                <input className="full-width" type="number" ref="hitDie" defaultValue={character.hitDie != null ? character.hitDie : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-4">
                                <p className="p-override">TOTAL HIT DICE</p>
                                <input className="full-width" type="number" ref="maxHitDie" defaultValue={character.maxHitDie != null ? character.maxHitDie : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-4">
                                <p className="p-override">TEMP HIT DICE</p>
                                <input className="full-width" type="number" ref="currHitDie" defaultValue={character.currHitDie != null ? character.currHitDie : ""} placeholder=""/>
                            </div>

                                        <div className="spacer col-sm-12"/>

                            <div className="col-sm-4">
                                <p className="p-override">DEATH SAVE SUCCESSES</p>
                                <input className="full-width" type="number" ref="characterDeathSaveSuccesses" defaultValue={character.characterInitiative != null ? character.characterInitiative : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-4">
                                <p className="p-override">DEATH SAVE FAILURES</p>
                                <input className="full-width" type="number" ref="characterDeathSaveFailures" defaultValue={character.characterDeathSaveFailures != null ? character.characterDeathSaveFailures : ""} placeholder=""/>
                            </div>

                                        <div className="spacer col-sm-12"/>

                                        <div className="hr full-width col-sm-12"/>

                                                                    
                            <div className="col-sm-2 col-xs-4">
                                <p className="p-override">STRENGTH</p>
                                <input className="full-width" type="number" ref="str" defaultValue={character.attributes != null ? character.attributes[0] : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-2 col-xs-4">
                                <p className="p-override">DEXTERITY</p>
                                <input className="full-width" type="number" ref="dex" defaultValue={character.attributes != null ? character.attributes[1] : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-2 col-xs-4">
                                <p className="p-override">CONSTITUTION</p>
                                <input className="full-width" type="number" ref="con" defaultValue={character.attributes != null ? character.attributes[2] : ""} placeholder=""/>
                            </div>

                            <div className="col-sm-2 col-xs-4">
                                <p className="p-override">INTELLIGENCE</p>
                                <input className="full-width" type="number" ref="int" defaultValue={character.attributes != null ? character.attributes[3] : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-2 col-xs-4">
                                <p className="p-override">WISDOM</p>
                                <input className="full-width" type="number" ref="wis" defaultValue={character.attributes != null ? character.attributes[4] : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-2 col-xs-4">
                                <p className="p-override">CHARISMA</p>
                                <input className="full-width" type="number" ref="cha" defaultValue={character.attributes != null ? character.attributes[5] : ""} placeholder=""/>
                            </div>

                                        <div className="spacer col-sm-12"/>

                                        
                            <div className="col-sm-4">
                                <p className="p-override">PROFICIENCY BONUS</p>
                                <input className="full-width" type="number" ref="profBonus" defaultValue={character.profBonus != null ? character.profBonus : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-4">
                                <p className="p-override">INSPIRATION</p>
                                <input className="full-width" type="number" ref="characterInspiration" defaultValue={character.characterInspiration != null ? character.characterInspiration : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-4">
                                <p className="p-override">PERCEPTION</p>
                                <input className="full-width" type="number" ref="characterPerception" defaultValue={character.characterPerception != null ? character.characterPerception : ""} placeholder=""/>
                            </div>
                                        
                                    <div className="spacer col-sm-12"/>
                                    <div className="hr full-width col-sm-12"/>

                            <div className="col-sm-6">
                                <p className="p-override">SAVING THROWS (ctrl+click for multi-select)</p>
                                <select className="full-width no-scrollbar" ref="savingThrows" defaultValue={character.savingThrows != null ? character.savingThrows : ""} size={6} multiple>
                                    <option value="Strength">Strength</option>
                                    <option value="Dexterity">Dexterity</option>
                                    <option value="Constitution">Constitution</option>
                                    <option value="Intelligence">Intelligence</option>
                                    <option value="Wisdom">Wisdom</option>
                                    <option value="Charisma">Charisma</option>
                                </select>
                            </div>
                            <div className="col-sm-6">
                                <p className="p-override">SKILLS (ctrl+click for multi-select)</p>
                                <select className="full-width no-scrollbar" ref="characterSkills" defaultValue={character.skills != null ? character.skills : ""} size={18} multiple>
                                    <option value="Acrobatics">Acrobatics</option>
                                    <option value="Animal Handling">Animal handling</option>
                                    <option value="Arcana">Arcana</option>
                                    <option value="Athletics">Athletics</option>
                                    <option value="Deception">Deception</option>
                                    <option value="History">History</option>
                                    <option value="Insight">Insight</option>
                                    <option value="Intimidation">Intimidation</option>
                                    <option value="Investigation">Investigation</option>
                                    <option value="Medicine">Medicine</option>
                                    <option value="Nature">Nature</option>
                                    <option value="Perception">Perception</option>
                                    <option value="Persuasion">Persuasion</option>
                                    <option value="Relgion">Religion</option>
                                    <option value="Sleight Of Hand">Sleight Of Hand</option>
                                    <option value="Stealth">Stealth</option>
                                    <option value="Survival">Survival</option>
                                </select>
                            </div>

                                        <div className="spacer col-sm-12"/>
                                        <div className="hr full-width col-sm-12"/>
                            <div className="col-sm-12">
                                <h4>SPELLCASTING</h4>
                                <div className="col-sm-2">
                                    <input className="full-width" type="text" ref="lvl1Spell" defaultValue={character.spellSlotsMax[0] != null ? character.spellSlotsMax[0] : ""} placeholder=""/>
                                    <input className="full-width" type="text" ref="lvl2Spell" defaultValue={character.spellSlotsMax[1] != null ? character.spellSlotsMax[1] : ""} placeholder=""/>
                                    <input className="full-width" type="text" ref="lvl3Spell" defaultValue={character.spellSlotsMax[2] != null ? character.spellSlotsMax[2] : ""} placeholder=""/>
                                    <input className="full-width" type="text" ref="lvl4Spell" defaultValue={character.spellSlotsMax[3] != null ? character.spellSlotsMax[3] : ""} placeholder=""/>
                                    <input className="full-width" type="text" ref="lvl5Spell" defaultValue={character.spellSlotsMax[4] != null ? character.spellSlotsMax[4] : ""} placeholder=""/>
                                    <input className="full-width" type="text" ref="lvl6Spell" defaultValue={character.spellSlotsMax[5] != null ? character.spellSlotsMax[5] : ""} placeholder=""/>
                                    <input className="full-width" type="text" ref="lvl7Spell" defaultValue={character.spellSlotsMax[6] != null ? character.spellSlotsMax[6] : ""} placeholder=""/>
                                    <input className="full-width" type="text" ref="lvl8Spell" defaultValue={character.spellSlotsMax[7] != null ? character.spellSlotsMax[7] : ""} placeholder=""/>
                                    <input className="full-width" type="text" ref="lvl9Spell" defaultValue={character.spellSlotsMax[8] != null ? character.spellSlotsMax[8] : ""} placeholder=""/>
                                </div>
                            </div>

                            <div className="spacer col-sm-12"/>
                                        <div className="hr full-width col-sm-12"/>
                            <div className="col-sm-12">
                                <h4>ATTACK</h4>
                            </div>
                            <div className="col-sm-5">
                                <p className="p-override">NAME</p>
                                <input className="full-width" type="text" ref="currWeaponName" defaultValue={character.currWeapon != null && character.currWeapon.currWeaponName != null ? character.currWeapon.currWeaponName : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-2">
                                <p className="p-override">ATK BONUS</p>
                                <input className="full-width" type="text" ref="weapon1Atk" defaultValue={character.currWeapon != null && character.currWeapon.currWeaponBonus != null ? character.currWeapon.currWeaponBonus : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-5">
                                <p className="p-override">DAMAGE/TYPE</p>
                                <input className="full-width" type="text" ref="weapon1DamageType" defaultValue={character.currWeapon != null && character.currWeapon.currWeaponDamage != null ? character.currWeapon.currWeaponDamage : ""} placeholder=""/>
                            </div>
                            <div className="half-spacer col-sm-12"/>
                            
                            <div className="col-sm-5">
                                <input className="full-width" type="text" ref="weapon2Name" defaultValue={character.currWeapon != null && character.currWeapon.weapon2Name != null ? character.currWeapon.weapon2Name : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-2">
                                <input className="full-width" type="text" ref="weapon2Atk" defaultValue={character.currWeapon != null && character.currWeapon.weapon2Bonus != null ? character.currWeapon.weapon2Bonus : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-5">
                                <input className="full-width" type="text" ref="weapon2DamageType" defaultValue={character.currWeapon != null && character.currWeapon.weapon2damage != null ? character.currWeapon.weapon2damage : ""} placeholder=""/>
                            </div>
                            <div className="half-spacer col-sm-12"/>
                            
                            <div className="col-sm-5">
                                <input className="full-width" type="text" ref="weapon3Name" defaultValue={character.currWeapon != null && character.currWeapon.weapon3Name != null ? character.currWeapon.weapon3Name : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-2">
                                <input className="full-width" type="text" ref="weapon3Atk" defaultValue={character.currWeapon != null && character.currWeapon.weapon3Bonus != null ? character.currWeapon.weapon3Bonus : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-5">
                                <input className="full-width" type="text" ref="weapon3DamageType" defaultValue={character.currWeapon != null && character.currWeapon.weapon3damage != null ? character.currWeapon.weapon3damage : ""} placeholder=""/>
                            </div>
                            <div className="half-spacer col-sm-12"/>

                            <div className="col-sm-12">
                                <textarea rows={10} className="full-width"  ref="attackNotes" defaultValue={character.attackNotes != null ? character.attackNotes : ""}/>
                            </div>

                                        <div className="spacer col-sm-12"/>
                                        <div className="hr full-width col-sm-12"/>

                            <div className="col-sm-12">
                                <h4>PROFICIENCIES & LANGUAGES</h4>
                            </div>
                            
                            <div className="col-sm-12">
                                <textarea rows={10} className="full-width"  ref="proficiencies" defaultValue={character.proficiencies != null ? character.proficiencies : ""} />
                            </div>

                                        <div className="spacer col-sm-12"/>
                                        <div className="hr full-width col-sm-12"/>

                            <div className="col-sm-12">
                                <h4>EQUIPMENT</h4>
                            </div>
                            
                            <div className="col-sm-12">
                                <textarea rows={10} className="full-width"  ref="equipmentNotes" defaultValue={character.equipmentNotes != null ? character.equipmentNotes : ""} />
                            </div>

                                        <div className="spacer col-sm-12"/>
                                        <div className="hr full-width col-sm-12"/>

                            <div className="col-sm-12">
                                <h4>FEATURES & TRAITS</h4>
                            </div>
                            
                            <div className="col-sm-12">
                                <textarea rows={10} className="full-width"  ref="notes" defaultValue={character.notes != null ? character.notes : ""}  />
                            </div>
                                    
                            <div className="spacer col-sm-12"/>
                            <div className="spacer col-sm-12"/>
                            <div className="spacer col-sm-12"/>
                        
                            <div onClick={() => {this.deleteCharacter(character._id)}}>
                                <div className="col-sm-12">
                                    <button className="full-width submit-button">DELETE CHARACTER</button>
                                </div>
                            </div>
                        </div>
                            
                                        <div className="spacer col-sm-12"/>

                        <div className="col-sm-12">
                            <button className="full-width submit-button blue-button">SUBMIT CHANGES</button>
                        </div>

                    </form>
                </div>
            </div>
        );
    }
}