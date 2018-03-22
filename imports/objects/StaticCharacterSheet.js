import React from 'react'
import UserCard from '../objects/UserCard';


export default class StaticCharacterSheet extends React.Component {
    
    componentWillMount(){
        this.playerFormPopupTracker = Tracker.autorun(() => {
            const sub = Meteor.subscribe('conversations');
            if(sub.ready())
            {
                this.conversations = Conversations.find({ participants:{$elemMatch : {id : Meteor.userId()}}}).fetch();
            }

            const sub2 = Meteor.subscribe('userData');
            if(sub2.ready())
            {
                this.users = Meteor.users.find({}).fetch();
            }

            this.forceUpdate();
        });
    }

    componentWillUnmount(){
        this.playerFormPopupTracker.stop();
    }

    renderContacts() {
        var cards = [];
        if (this.conversations){
            for (var i = 0; i < this.conversations.length; i++){
                console.log(this.conversations[i]);
                partner = (this.conversations[i].participants[0].id === Meteor.userId()) ? this.conversations[i].participants[1] : this.conversations[i].participants[0];
                console.log(partner);
                if (!this.alreadyInvited(partner)){
                    cards.push(<UserCard key={i} username={partner.name} accountPicture={partner.picture} func={this.props.addPlayer} param={partner.id}/>);
                }
            }
        }
        return <div>{cards}</div>;
    }

    alreadyInvited(player){
        for (var i = 0; i < this.props.pendingInvites.length; i++){
            if (this.props.pendingInvites[i] == player._id){
                return true;
            }
        }

        for (var i = 0; i < this.props.characters.length; i++){
            if (this.props.characters[i].UID == player._id){
                return true;
            }
        }

        return false;
    }


    renderImage(){
        return '/images/photoMissing.png';
    }
    
    render() {
        character = this.props.character;

        return(
            <div className='popup'>
                    <div className="static-cs-popup">
                        <div className="col-sm-4 split-page-left container">
                            <img src={character.characterImageURL != null && character.characterImageURL != "" ? character.characterImageURL : '/images/photoMissing.png'} className="full-width" draggable="false"/>
                            <div className="spacer col-sm-12"/>
                        </div>
        
                        <div className="col-sm-8 split-page-right left-border container">
                            <div className="scrolling-container-smaller">
                                <div className="col-sm-12">
                                    <p className="p-override">NAME: {character.characterName != null ? character.characterName : ""} </p>
                                </div>
                                <div className="spacer col-sm-12"/>
                                <div className="spacer col-sm-12"/>
    
                                <div className="col-sm-12">
                                    <p className="p-override">BACKSTORY:</p>
                                    <p className="full-width"  >{character.characterName != null ? character.characterName : undefined}</p>
                                </div>
    
                                    <div className="spacer col-sm-12"/>
                                    <div className="hr full-width col-sm-12"/>
    
                                <div className="col-sm-4">
                                    <p className="p-override">LEVEL: {character.level != null ? character.level : ""}</p>
                                </div>
                                <div className="col-sm-4">
                                    <p className="p-override">CLASS: {character.characterClass != null ? character.characterClass : ""}</p>
                                </div>
                                <div className="col-sm-4">
                                    <p className="p-override">RACE: {character.race != null ? character.race : ""}</p>
                                </div>
    
                                            <div className="spacer col-sm-12"/>
    
                                <div className="col-sm-6">
                                    <p className="p-override">ALIGNMENT: {character.alignment != null ? character.alignment : ""} </p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="p-override">BACKGROUND: {character.background != null ? character.background : ""}</p>
                                </div>
    
                                        <div className="spacer col-sm-12"/>
    
                                        <div className="hr full-width col-sm-12"/>
    
                                <div className="col-sm-4">
                                    <p className="p-override">AC: {character.AC != null ? character.AC : ""}</p>
                                </div>
                                <div className="col-sm-4">
                                    <p className="p-override">MAX HP: {character.maxHP != null ? character.maxHP : ""}</p>
                                </div>
                                <div className="col-sm-4">
                                    <p className="p-override">TEMP HP: {character.tempHP != null ? character.tempHP : ""}</p>
                                </div>
    
                                            <div className="spacer col-sm-12"/>
    
                                <div className="col-sm-4">
                                    <p className="p-override">INITIATIVE: {character.characterInitiative != null ? character.characterInitiative : ""} </p>
                                </div>
                                <div className="col-sm-4">
                                    <p className="p-override">SPEED: {character.speed != null ? character.speed : ""}</p>
                                </div>
                                <div className="col-sm-4">
                                    <p className="p-override">Curr HP: {character.currHP != null ? character.currHP : ""}</p>
                                </div>
    
                                            <div className="spacer col-sm-12"/>
                                            <div className="hr full-width col-sm-12"/>
    
                                            
                                <div className="col-sm-4">
                                    <p className="p-override">HIT DICE: {character.hitDie != null ? character.hitDie : ""}</p>
                                </div>
                                <div className="col-sm-4">
                                    <p className="p-override">TOTAL HIT DICE: {character.maxHitDie != null ? character.maxHitDie : ""}</p>
                                </div>
                                <div className="col-sm-4">
                                    <p className="p-override">TEMP HIT DICE: {character.currHitDie != null ? character.currHitDie : ""}</p>
                                </div>
    
                                            <div className="spacer col-sm-12"/>
    
                                <div className="col-sm-4">
                                    <p className="p-override">DEATH SAVE SUCCESSES: {character.characterDeathSaveSuccesses != null ? character.characterDeathSaveSuccesses : ""}</p>
                                </div>
                                <div className="col-sm-4">
                                    <p className="p-override">DEATH SAVE FAILURES: {character.characterDeathSaveFailures != null ? character.characterDeathSaveFailures : ""}</p>
                                </div>
    
                                            <div className="spacer col-sm-12"/>
    
                                            <div className="hr full-width col-sm-12"/>
    
                                                                        
                                <div className="col-sm-4 col-xs-4">
                                    <p className="p-override">STRENGTH: {character.attributes != null ? character.attributes[0] : ""}</p>
                                </div>
                                <div className="col-sm-4 col-xs-4">
                                    <p className="p-override">DEXTERITY: {character.attributes != null ? character.attributes[1] : ""}</p>
                                </div>
                                <div className="col-sm-4 col-xs-4">
                                    <p className="p-override">CONSTITUTION: {character.attributes != null ? character.attributes[2] : ""}</p>
                                </div>
    
                                <div className="col-sm-4 col-xs-4">
                                    <p className="p-override">INTELLIGENCE: {character.attributes != null ? character.attributes[3] : ""}</p>
                                </div>
                                <div className="col-sm-4 col-xs-4">
                                    <p className="p-override">WISDOM: {character.attributes != null ? character.attributes[4] : ""}</p>
                                </div>
                                <div className="col-sm-4 col-xs-4">
                                    <p className="p-override">CHARISMA: {character.attributes != null ? character.attributes[5] : ""}</p>
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
                                    <select className="full-width no-scrollbar" ref="savingThrows" defaultValue={character.savingThrows != null ? character.savingThrows : ""} size={6} multiple>
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
                                    <select className="full-width no-scrollbar" ref="characterSkills" defaultValue={character.skills != null ? character.skills : ""} size={18} multiple>
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
                            
                            </div>
                            <button onClick={this.props.closePopup} className=" submit-button button">Close</button>

                        </div>
                    </div>
        </div>
        );
    }
}