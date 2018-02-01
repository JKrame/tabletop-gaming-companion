import React from 'react'
import { Meteor } from 'meteor/meteor'

import PropTypes from 'prop-types';

//import { Characters } from '../api/character';
var character;
var _id;
var characterID;
var campaignID;
var UID;
var characterName;
var characterClass;
var level;
var background;
var race;
var alignment;
var AC;
var speed;
var maxHP;
var currHP;
var maxHitDie;
var currHitDie;
var hitDie;
var profBonus;
var notes;
var currWeapon;
var features;
var inventory;
var proficiencies;
var attributes;
var savingThrows;
var spellSlotsMax;
var spellSlotsCurr;
var statuses;
var money;
export default class CharacterForm extends React.Component{
    constructor(props){
        super(props);
    }

    onSubmit(e){  
        e.preventDefault();

        //basic attributes
        characterID = null;
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

        console.log("formSubmit");
        console.log(this.props._id);
        
        Meteor.call('characters.update',
            _id = this.props._id,
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
        this.forceUpdate();
    }

    componentDidMount(){
        Tracker.autorun(() => {
            console.log("CF > CDM > T");
            
            if (this.props.hasProps){
                console.log("CF > CDM > T > hasProps");
            
                this.props.CharacterSheet.forceUpdate();
            }
            
        });
    }

    renderImage(){
        return '/images/photoMissing.png';
    }
    
    render() {
        
        if(this.props.hasProps)
        {
            console.log("hasProps");
            character = this.props.character;
            _id = this.props._id;
            characterID = this.props.character.characterID;
            campaignID = this.props.character.campaignID;
            UID = this.props.character.UID;
            characterName = this.props.character.characterName;
            console.log(characterName);
            characterClass = this.props.character.characterClass;
            level = this.props.character.level;
            background = this.props.character.background;
            race = this.props.character.race;
            alignment = this.props.character.alignment;
            AC = this.props.character.AC;
            speed = this.props.character.speed;
            maxHP = this.props.character.maxHP;
            currHP = this.props.character.currHP;
            maxHitDie = this.props.character.maxHitDie;
            currHitDie = this.props.character.currHitDie;
            hitDie = this.props.character.hitDie;
            profBonus = this.props.character.profBonus;
            notes = this.props.character.notes;
            currWeapon = this.props.character.currWeapon;
            features = this.props.character.features;
            inventory = this.props.character.inventory;
            proficiencies = this.props.character.proficiencies;
            attributes = this.props.character.attributes;
            savingThrows = this.props.character.savingThrows;
            spellSlotsMax = this.props.character.spellSlotsMax;
            spellSlotsCurr = this.props.character.spellSlotsCurr;
            statuses = this.props.character.statuses;
            money = this.props.character.money;
        }

        return(
            <div className="col-xs-12">
                <div className="col-sm-4 split-page-left container">
                    <img src={this.renderImage()} className="full-width"/>
                    <div className="spacer col-sm-12"/>

                    <form>
                        <div className="col-sm-12">
                            <p className="p-override">IMAGE URL</p>
                            <input className="full-width" type="text" ref="characterImageURL" placeholder={characterName != null ? characterName : ""}/>
                        </div>
                        <div className="spacer col-sm-12"/>
                        <div className="spacer col-sm-12"/>

                        <div className="col-sm-12">
                            <button className="full-width submit-button">UPDATE IMAGE   </button>
                        </div>
                    </form>
                </div>
                

                <div className="col-sm-8 split-page-right left-border container">
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <div className="scrolling-container-smaller">
                            
                            <div className="col-sm-12">
                                <p className="p-override">NAME</p>
                                <input className="full-width" type="text" ref="characterName" defaultValue={this.props.hasProps ? characterName : "k"}/>
                                {console.log("inside form:")}
                                {console.log(characterName)}
                                {console.log(characterName != null)}
                            </div>

                            <div className="col-sm-12">
                                <p className="p-override">BACKSTORY</p>
                                <input className="full-width" type="textarea" ref="characterBackstory" defaultValue={characterName !== null ? characterName : ""} style={{"height":200}}/>
                            </div>

                                <div className="spacer col-sm-12"/>
                                <div className="hr full-width col-sm-12"/>

                            <div className="col-sm-4">
                                <p className="p-override">LEVEL</p>
                                <input className="full-width" type="text" ref="level" defaultValue={character != null  ? character.level : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-4">
                                <p className="p-override">CLASS</p>
                                <input className="full-width" type="text" ref="characterClass" defaultValue={character != null  ? character.characterClass : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-4">
                                <p className="p-override">RACE</p>
                                <input className="full-width" type="text" ref="race" defaultValue={character != null ? character.race : ""} placeholder=""/>
                            </div>

                                        <div className="spacer col-sm-12"/>

                            <div className="col-sm-6">
                                <p className="p-override">ALIGNMENT</p>
                                <input className="full-width" type="text" ref="alignment" defaultValue={character != null ? character.alignment : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-6">
                                <p className="p-override">BACKGROUND</p>
                                <input className="full-width" type="text" ref="background" defaultValue={character != null ? character.background : ""} placeholder=""/>
                            </div>

                                    <div className="spacer col-sm-12"/>

                                    <div className="hr full-width col-sm-12"/>

                            <div className="col-sm-4">
                                <p className="p-override">AC</p>
                                <input className="full-width" type="text" ref="AC" defaultValue={character != null ? character.AC : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-4">
                                <p className="p-override">MAX HP</p>
                                <input className="full-width" type="text" ref="maxHP" defaultValue={character != null ? character.maxHP : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-4">
                                <p className="p-override">TEMP HP</p>
                                <input className="full-width" type="text" ref="currHP" defaultValue={character != null ? character.currHP : ""} placeholder=""/>
                            </div>

                                        <div className="spacer col-sm-12"/>

                            <div className="col-sm-4">
                                <p className="p-override">INITIATIVE</p>
                                <input className="full-width" type="text" ref="characterInitiative" defaultValue={character != null ? character.characterInitiative : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-4">
                                <p className="p-override">SPEED</p>
                                <input className="full-width" type="text" ref="speed" defaultValue={character != null ? character.speed : ""} placeholder=""/>
                            </div>

                                        <div className="spacer col-sm-12"/>
                                        <div className="hr full-width col-sm-12"/>

                                        
                            <div className="col-sm-4">
                                <p className="p-override">HIT DICE</p>
                                <input className="full-width" type="text" ref="hitDie" defaultValue={character != null ? character.hitDie : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-4">
                                <p className="p-override">TOTAL HIT DICE</p>
                                <input className="full-width" type="text" ref="maxHitDie" defaultValue={character != null ? character.maxHitDie : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-4">
                                <p className="p-override">TEMP HIT DICE</p>
                                <input className="full-width" type="text" ref="currHitDie" defaultValue={character != null ? character.currHitDie : ""} placeholder=""/>
                            </div>

                                        <div className="spacer col-sm-12"/>

                            <div className="col-sm-4">
                                <p className="p-override">DEATH SAVE SUCCESSES</p>
                                <input className="full-width" type="text" ref="characterDeathSaveSuccesses" defaultValue={character != null ? character.characterDeathSaveSuccesses : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-4">
                                <p className="p-override">DEATH SAVE FAILURES</p>
                                <input className="full-width" type="text" ref="characterDeathSaveFailures" defaultValue={character != null ? character.characterDeathSaveFailures : ""} placeholder=""/>
                            </div>

                                        <div className="spacer col-sm-12"/>

                                        <div className="hr full-width col-sm-12"/>

                                                                    
                            <div className="col-sm-2 col-xs-4">
                                <p className="p-override">STRENGTH</p>
                                <input className="full-width" type="text" ref="str" defaultValue={character != null ? character.str : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-2 col-xs-4">
                                <p className="p-override">DEXTERITY</p>
                                <input className="full-width" type="text" ref="dex" defaultValue={character != null ? character.dex : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-2 col-xs-4">
                                <p className="p-override">CONSTITUTION</p>
                                <input className="full-width" type="text" ref="con" defaultValue={character != null ? character.con : ""} placeholder=""/>
                            </div>

                            <div className="col-sm-2 col-xs-4">
                                <p className="p-override">INTELLIGENCE</p>
                                <input className="full-width" type="text" ref="int" defaultValue={character != null ? character.int : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-2 col-xs-4">
                                <p className="p-override">WISDOM</p>
                                <input className="full-width" type="text" ref="wis" defaultValue={character != null ? character.wis : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-2 col-xs-4">
                                <p className="p-override">CHARISMA</p>
                                <input className="full-width" type="text" ref="cha" defaultValue={character != null ? character.cha : ""} placeholder=""/>
                            </div>

                                        <div className="spacer col-sm-12"/>

                                        
                            <div className="col-sm-4">
                                <p className="p-override">PROFICIENCY BONUS</p>
                                <input className="full-width" type="text" ref="profBonus" defaultValue={character != null ? character.profBonus : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-4">
                                <p className="p-override">INSPIRATION</p>
                                <input className="full-width" type="text" ref="characterInspiration" defaultValue={character != null ? character.characterInspiration : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-4">
                                <p className="p-override">PERCEPTION</p>
                                <input className="full-width" type="text" ref="characterPerception" defaultValue={character != null ? character.characterPerception : ""} placeholder=""/>
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
                                <input className="full-width" type="text" ref="currWeaponName" defaultValue={character != null ? character.currWeaponName : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-2">
                                <p className="p-override">ATK BONUS</p>
                                <input className="full-width" type="text" ref="weapon1Atk" defaultValue={character != null ? character.weapon1Atk : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-5">
                                <p className="p-override">DAMAGE/TYPE</p>
                                <input className="full-width" type="text" ref="weapon1DamageType" defaultValue={character != null ? character.weapon1DamageType : ""} placeholder=""/>
                            </div>
                            <div className="half-spacer col-sm-12"/>
                            
                            <div className="col-sm-5">
                                <input className="full-width" type="text" ref="weapon2Name" defaultValue={character != null ? character.weapon2Name : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-2">
                                <input className="full-width" type="text" ref="weapon2Atk" defaultValue={character != null ? character.weapon2Atk : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-5">
                                <input className="full-width" type="text" ref="weapon2DamageType" defaultValue={character != null ? character.weapon2DamageType : ""} placeholder=""/>
                            </div>
                            <div className="half-spacer col-sm-12"/>
                            
                            <div className="col-sm-5">
                                <input className="full-width" type="text" ref="weapon3Name" defaultValue={character != null ? character.weapon3Name : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-2">
                                <input className="full-width" type="text" ref="weapon3Atk" defaultValue={character != null ? character.weapon3Atk : ""} placeholder=""/>
                            </div>
                            <div className="col-sm-5">
                                <input className="full-width" type="text" ref="weapon3DamageType" defaultValue={character != null ? character.weapon3DamageType : ""} placeholder=""/>
                            </div>
                            <div className="half-spacer col-sm-12"/>

                            <div className="col-sm-12">
                                <input className="full-width" type="textarea" ref="attackNotes" defaultValue={character != null ? character.attackNotes : ""} style={{"height":200}}/>
                            </div>

                                        <div className="spacer col-sm-12"/>
                                        <div className="hr full-width col-sm-12"/>

                            <div className="col-sm-12">
                                <h4>PROFICIENCIES & LANGUAGES</h4>
                            </div>
                            
                            <div className="col-sm-12">
                                <input className="full-width" type="textarea" ref="proficiencies" defaultValue={character != null ? character.proficiencies : ""} style={{"height":200}}/>
                            </div>

                                        <div className="spacer col-sm-12"/>
                                        <div className="hr full-width col-sm-12"/>

                            <div className="col-sm-12">
                                <h4>EQUIPMENT</h4>
                            </div>
                            
                            <div className="col-sm-12">
                                <input className="full-width" type="textarea" ref="equipmentNotes" defaultValue={character != null ? character.equipmentNotes : ""} style={{"height":200}}/>
                            </div>

                                        <div className="spacer col-sm-12"/>
                                        <div className="hr full-width col-sm-12"/>

                            <div className="col-sm-12">
                                <h4>FEATURES & TRAITS</h4>
                            </div>
                            
                            <div className="col-sm-12">
                                <input className="full-width" type="textarea" ref="notes" defaultValue={character != null ? character.notes : ""} style={{"height":200}}/>
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