import React from 'react'
import { Meteor } from 'meteor/meteor'

import PropTypes from 'prop-types';

//import { Characters } from '../api/character';

export default class CharacterForm extends React.Component{
    onSubmit(e){  
        e.preventDefault();

        character = this.props.character;
        
        attributes = [str=this.refs.str.value.trim(), dex=this.refs.dex.value.trim(), con=this.refs.con.value.trim(), int=this.refs.int.value.trim(), wis=this.refs.wis.value.trim(), cha=this.refs.cha.value.trim()];
        spellSlotsMax = null;
        spellSlotsCurr = null;
        statuses = null;
        money = [cp=null, sp=null, ep=null, gp=null];
        //inventory subdocuments
        itemName = null;
        itemDescription = null;
        //current weapon subdocuments
        currWeaponType = null;
        currWeaponDamage = null;
        //features subdocument
        featureName = null;
        featureDescription = null;

        console.log("formSubmit");
        Meteor.call('characters.update',
            character._id,
            character.campaignID,
            Meteor.userId(),
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
            money,
            this.refs.characterImageURL.value.trim()
        );
    }

    deleteCharacter(id) {
        console.log("delete character  "+id);
        Meteor.call('characters.remove', id);
        window.location.replace("/home");
    }

    renderImage(){
        return '/images/photoMissing.png';
    }
    
    render() {
        character = this.props.character;

        console.log("character form render character:");
        console.log(character);

        return(
            <div className="col-xs-12">
                <div className="col-sm-4 split-page-left container">
                    <img src={character.characterImageURL != null && character.characterImageURL != "" ? character.characterImageURL : '/images/photoMissing.png'} className="full-width"/>
                    <div className="spacer col-sm-12"/>


                        <div className="col-sm-12">
                            <p className="p-override">IMAGE URL</p>
                            <input className="full-width" type="text" ref="characterImageURL" defaultValue={character.characterImageURL != null ? character.characterImageURL : ""}/>
                        </div>
                        <div className="spacer col-sm-12"/>
                        <div className="spacer col-sm-12"/>
                    <div onClick={() => {if(confirm('Delete this character?')) {this.deleteCharacter(character._id)};}}>
                        <div className="col-sm-12">
                            <button className="full-width submit-button">DELETE CHARACTER</button>
                        </div>
                    </div>
                </div>

                <div className="col-sm-8 split-page-right left-border container">
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <div className="scrolling-container-smaller">
                            <div className="col-sm-12">
                                <p className="p-override">NAME</p>
                                <input className="full-width" type="text" ref="characterName" defaultValue={character.characterName != null ? character.characterName : undefined}/>
                            </div>

                            <div className="col-sm-12">
                                <p className="p-override">BACKSTORY</p>
                                <input className="full-width" type="textarea" ref="characterBackstory" defaultValue={character.characterName != null ? character.characterName : undefined} style={{"height":200}}/>
                            </div>

                                <div className="spacer col-sm-12"/>
                                <div className="hr full-width col-sm-12"/>

                            <div className="col-sm-4">
                                <p className="p-override">LEVEL</p>
                                <input className="full-width" type="text" ref="level" defaultValue={character.level != null ? character.level : ""} placeholder=""/>
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
                                <input className="full-width" type="text" ref="AC" defaultValue={character.AC != null ? character.AC : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-4">
                                <p className="p-override">MAX HP</p>
                                <input className="full-width" type="text" ref="maxHP" defaultValue={character.maxHP != null ? character.maxHP : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-4">
                                <p className="p-override">TEMP HP</p>
                                <input className="full-width" type="text" ref="currHP" defaultValue={character.currHP != null ? character.currHP : ""} placeholder=""/>
                            </div>

                                        <div className="spacer col-sm-12"/>

                            <div className="col-sm-4">
                                <p className="p-override">INITIATIVE</p>
                                <input className="full-width" type="text" ref="characterInitiative" defaultValue={character.characterInitiative != null ? character.characterInitiative : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-4">
                                <p className="p-override">SPEED</p>
                                <input className="full-width" type="text" ref="speed" defaultValue={character.speed != null ? character.speed : ""} placeholder=""/>
                            </div>

                                        <div className="spacer col-sm-12"/>
                                        <div className="hr full-width col-sm-12"/>

                                        
                            <div className="col-sm-4">
                                <p className="p-override">HIT DICE</p>
                                <input className="full-width" type="text" ref="hitDie" defaultValue={character.hitDie != null ? character.hitDie : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-4">
                                <p className="p-override">TOTAL HIT DICE</p>
                                <input className="full-width" type="text" ref="maxHitDie" defaultValue={character.maxHitDie != null ? character.maxHitDie : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-4">
                                <p className="p-override">TEMP HIT DICE</p>
                                <input className="full-width" type="text" ref="currHitDie" defaultValue={character.currHitDie != null ? character.currHitDie : ""} placeholder=""/>
                            </div>

                                        <div className="spacer col-sm-12"/>

                            <div className="col-sm-4">
                                <p className="p-override">DEATH SAVE SUCCESSES</p>
                                <input className="full-width" type="text" ref="characterDeathSaveSuccesses" defaultValue={character.characterDeathSaveSuccesses != null ? character.characterDeathSaveSuccesses : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-4">
                                <p className="p-override">DEATH SAVE FAILURES</p>
                                <input className="full-width" type="text" ref="characterDeathSaveFailures" defaultValue={character.characterDeathSaveFailures != null ? character.characterDeathSaveFailures : ""} placeholder=""/>
                            </div>

                                        <div className="spacer col-sm-12"/>

                                        <div className="hr full-width col-sm-12"/>

                                                                    
                            <div className="col-sm-2 col-xs-4">
                                <p className="p-override">STRENGTH</p>
                                <input className="full-width" type="text" ref="str" defaultValue={character.attributes != null ? character.attributes[0] : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-2 col-xs-4">
                                <p className="p-override">DEXTERITY</p>
                                <input className="full-width" type="text" ref="dex" defaultValue={character.attributes != null ? character.attributes[1] : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-2 col-xs-4">
                                <p className="p-override">CONSTITUTION</p>
                                <input className="full-width" type="text" ref="con" defaultValue={character.attributes != null ? character.attributes[2] : ""} placeholder=""/>
                            </div>

                            <div className="col-sm-2 col-xs-4">
                                <p className="p-override">INTELLIGENCE</p>
                                <input className="full-width" type="text" ref="int" defaultValue={character.attributes != null ? character.attributes[3] : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-2 col-xs-4">
                                <p className="p-override">WISDOM</p>
                                <input className="full-width" type="text" ref="wis" defaultValue={character.attributes != null ? character.attributes[4] : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-2 col-xs-4">
                                <p className="p-override">CHARISMA</p>
                                <input className="full-width" type="text" ref="cha" defaultValue={character.attributes != null ? character.attributes[5] : ""} placeholder=""/>
                            </div>

                                        <div className="spacer col-sm-12"/>

                                        
                            <div className="col-sm-4">
                                <p className="p-override">PROFICIENCY BONUS</p>
                                <input className="full-width" type="text" ref="profBonus" defaultValue={character.profBonus != null ? character.profBonus : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-4">
                                <p className="p-override">INSPIRATION</p>
                                <input className="full-width" type="text" ref="characterInspiration" defaultValue={character.characterInspiration != null ? character.characterInspiration : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-4">
                                <p className="p-override">PERCEPTION</p>
                                <input className="full-width" type="text" ref="characterPerception" defaultValue={character.characterPerception != null ? character.characterPerception : ""} placeholder=""/>
                            </div>
                                        
                                    <div className="spacer col-sm-12"/>
                                    <div className="hr full-width col-sm-12"/>

                            <div className="col-sm-6">
                                <p className="p-override">SAVING THROWS (ctrl+click for multi-select)</p>
                                <select className="full-width no-scrollbar" ref="savingThrows" /*defaultValue={character.savingThrows != null ? character.savingThrows : ""}*/ size={6} multiple>
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
                                <select className="full-width no-scrollbar" ref="characterSkills" /*defaultValue={character.characterSkills != null ? character.characterSkills : ""}*/ size={18} multiple>
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
                                <input className="full-width" type="text" ref="currWeaponName" defaultValue={character.currWeaponName != null ? character.currWeaponName : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-2">
                                <p className="p-override">ATK BONUS</p>
                                <input className="full-width" type="text" ref="weapon1Atk" defaultValue={character.weapon1Atk != null ? character.weapon1Atk : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-5">
                                <p className="p-override">DAMAGE/TYPE</p>
                                <input className="full-width" type="text" ref="weapon1DamageType" defaultValue={character.weapon1DamageType != null ? character.weapon1DamageType : ""} placeholder=""/>
                            </div>
                            <div className="half-spacer col-sm-12"/>
                            
                            <div className="col-sm-5">
                                <input className="full-width" type="text" ref="weapon2Name" defaultValue={character.weapon2Name != null ? character.weapon2Name : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-2">
                                <input className="full-width" type="text" ref="weapon2Atk" defaultValue={character.weapon2Atk != null ? character.weapon2Atk : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-5">
                                <input className="full-width" type="text" ref="weapon2DamageType" defaultValue={character.weapon2DamageType != null ? character.weapon2DamageType : ""} placeholder=""/>
                            </div>
                            <div className="half-spacer col-sm-12"/>
                            
                            <div className="col-sm-5">
                                <input className="full-width" type="text" ref="weapon3Name" defaultValue={character.weapon3Name != null ? character.weapon3Name : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-2">
                                <input className="full-width" type="text" ref="weapon3Atk" defaultValue={character.weapon3Atk != null ? character.weapon3Atk : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-5">
                                <input className="full-width" type="text" ref="weapon3DamageType" defaultValue={character.weapon3DamageType != null ? character.weapon3DamageType : ""} placeholder=""/>
                            </div>
                            <div className="half-spacer col-sm-12"/>

                            <div className="col-sm-12">
                                <input className="full-width" type="textarea" ref="attackNotes" defaultValue={character.attackNotes != null ? character.attackNotes : ""} style={{"height":200}}/>
                            </div>

                                        <div className="spacer col-sm-12"/>
                                        <div className="hr full-width col-sm-12"/>

                            <div className="col-sm-12">
                                <h4>PROFICIENCIES & LANGUAGES</h4>
                            </div>
                            
                            <div className="col-sm-12">
                                <input className="full-width" type="textarea" ref="proficiencies" defaultValue={character.proficiencies != null ? character.proficiencies : ""} style={{"height":200}}/>
                            </div>

                                        <div className="spacer col-sm-12"/>
                                        <div className="hr full-width col-sm-12"/>

                            <div className="col-sm-12">
                                <h4>EQUIPMENT</h4>
                            </div>
                            
                            <div className="col-sm-12">
                                <input className="full-width" type="textarea" ref="equipmentNotes" defaultValue={character.equipmentNotes != null ? character.equipmentNotes : ""} style={{"height":200}}/>
                            </div>

                                        <div className="spacer col-sm-12"/>
                                        <div className="hr full-width col-sm-12"/>

                            <div className="col-sm-12">
                                <h4>FEATURES & TRAITS</h4>
                            </div>
                            
                            <div className="col-sm-12">
                                <input className="full-width" type="textarea" ref="notes" defaultValue={character.notes != null ? character.notes : ""} style={{"height":200}}/>
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
                </div>
            </div>
        );
    }
}