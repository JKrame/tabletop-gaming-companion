import React from 'react'
import CharacterForm from '../objects/CharacterForm';


export default class StaticCharacterSheet extends React.Component {
    


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
                                    <p className="p-override">NAME: <span className="chardata">{character.characterName != null ? character.characterName : ""}</span></p>
                                </div>
                                <div className="spacer col-sm-12"/>
                                <div className="spacer col-sm-12"/>
    
                                <div className="col-sm-12">
                                    <p className="p-override">BACKSTORY:</p>
                                    <p className="full-width"  ><span className="chardata">{character.characterName != null ? character.characterName : undefined}</span></p>
                                </div>
    
                                    <div className="spacer col-sm-12"/>
                                    <div className="hr full-width col-sm-12"/>
    
                                <div className="col-sm-4">
                                    <p className="p-override">LEVEL:<span className="chardata"> {character.level != null ? character.level : ""}</span></p>
                                </div>
                                <div className="col-sm-4">
                                    <p className="p-override">CLASS:<span className="chardata"> {character.characterClass != null ? character.characterClass : ""}</span></p>
                                </div>
                                <div className="col-sm-4">
                                    <p className="p-override">RACE:<span className="chardata"> {character.race != null ? character.race : ""}</span></p>
                                </div>
    
                                            <div className="spacer col-sm-12"/>
    
                                <div className="col-sm-6">
                                    <p className="p-override">ALIGNMENT: <span className="chardata">{character.alignment != null ? character.alignment : ""}</span> </p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="p-override">BACKGROUND:<span className="chardata"> {character.background != null ? character.background : ""}</span></p>
                                </div>
    
                                        <div className="spacer col-sm-12"/>
    
                                        <div className="hr full-width col-sm-12"/>
    
                                <div className="col-sm-4">
                                    <p className="p-override">AC: <span className="chardata">{character.AC != null ? character.AC : ""}</span></p>
                                </div>
                                <div className="col-sm-4">
                                    <p className="p-override">MAX HP: <span className="chardata">{character.maxHP != null ? character.maxHP : ""}</span></p>
                                </div>
                                <div className="col-sm-4">
                                    <p className="p-override">TEMP HP:<span className="chardata"> {character.tempHP != null ? character.tempHP : ""}</span></p>
                                </div>
    
                                            <div className="spacer col-sm-12"/>
    
                                <div className="col-sm-4">
                                    <p className="p-override">INITIATIVE: <span className="chardata">{character.characterInitiative != null ? character.characterInitiative : ""} </span></p>
                                </div>
                                <div className="col-sm-4">
                                    <p className="p-override">SPEED: <span className="chardata">{character.speed != null ? character.speed : ""}</span></p>
                                </div>
                                <div className="col-sm-4">
                                    <p className="p-override">Curr HP: <span className="chardata">{character.currHP != null ? character.currHP : ""}</span></p>
                                </div>
    
                                            <div className="spacer col-sm-12"/>
                                            <div className="hr full-width col-sm-12"/>
    
                                            
                                <div className="col-sm-4">
                                    <p className="p-override">HIT DICE: <span className="chardata">{character.hitDie != null ? character.hitDie : ""}</span></p>
                                </div>
                                <div className="col-sm-4">
                                    <p className="p-override">TOTAL HIT DICE:<span className="chardata"> {character.maxHitDie != null ? character.maxHitDie : ""}</span></p>
                                </div>
                                <div className="col-sm-4">
                                    <p className="p-override">TEMP HIT DICE: <span className="chardata">{character.currHitDie != null ? character.currHitDie : ""}</span></p>
                                </div>
    
                                            <div className="spacer col-sm-12"/>
    
                                <div className="col-sm-4">
                                    <p className="p-override">DEATH SAVE SUCCESSES:<span className="chardata"> {character.characterDeathSaveSuccesses != null ? character.characterDeathSaveSuccesses : ""}</span></p>
                                </div>
                                <div className="col-sm-4">
                                    <p className="p-override">DEATH SAVE FAILURES:<span className="chardata"> {character.characterDeathSaveFailures != null ? character.characterDeathSaveFailures : ""}</span></p>
                                </div>
    
                                            <div className="spacer col-sm-12"/>
    
                                            <div className="hr full-width col-sm-12"/>
    
                                                                        
                                <div className="col-sm-4 col-xs-4">
                                    <p className="p-override">STRENGTH: <span className="chardata">{character.attributes != null ? character.attributes[0] : ""}</span></p>
                                </div>
                                <div className="col-sm-4 col-xs-4">
                                    <p className="p-override">DEXTERITY: <span className="chardata">{character.attributes != null ? character.attributes[1] : ""}</span></p>
                                </div>
                                <div className="col-sm-4 col-xs-4">
                                    <p className="p-override">CONSTITUTION: <span className="chardata">{character.attributes != null ? character.attributes[2] : ""}</span></p>
                                </div>
    
                                <div className="col-sm-4 col-xs-4">
                                    <p className="p-override">INTELLIGENCE: <span className="chardata">{character.attributes != null ? character.attributes[3] : ""}</span></p>
                                </div>
                                <div className="col-sm-4 col-xs-4">
                                    <p className="p-override">WISDOM: <span className="chardata">{character.attributes != null ? character.attributes[4] : ""}</span></p>
                                </div>
                                <div className="col-sm-4 col-xs-4">
                                    <p className="p-override">CHARISMA: <span className="chardata">{character.attributes != null ? character.attributes[5] : ""}</span></p>
                                </div>
    
                                            <div className="spacer col-sm-12"/>
    
                                            
                                <div className="col-sm-4">
                                    <p className="p-override">PROFICIENCY BONUS: <span className="chardata">{character.profBonus != null ? character.profBonus : ""}</span></p>
                                </div>
                                <div className="col-sm-4">
                                    <p className="p-override">INSPIRATION: <span className="chardata"> {character.characterInspiration != null ? character.characterInspiration : ""}</span></p>
                                </div>
                                <div className="col-sm-4">
                                    <p className="p-override">PERCEPTION: <span className="chardata">{character.characterPerception != null ? character.characterPerception : ""}  </span></p>
                                </div>
                                            
                                        <div className="spacer col-sm-12"/>
                                        <div className="hr full-width col-sm-12"/>
    
                                <div className="col-sm-6">
                                    <p className="p-override">SAVING THROWS:</p>
                                    <span className="chardata">
                                        {character.savingThrows + ' \n'}
                                    </span>
                                </div>
                                <div className="col-sm-6">
                                    <p className="p-override">SKILLS:</p>
                                    <span className="chardata">
                                        {character.skills+' \n'}

                                    </span>
                                </div>
    
                                            <div className="spacer col-sm-12"/>
                                            <div className="hr full-width col-sm-12"/>
                                <div className="col-sm-12">
                                    <h4>SPELL SLOTS</h4>
                                    <div className="col-sm-4">
                                        <p>LEVEL 1: <span className="chardata">{character.spellSlotsMax[0] != null ? character.spellSlotsMax[0] : ""} </span></p>
                                    </div>
                                    <div className="col-sm-4">
                                        <p>LEVEL 2: <span className="chardata">{character.spellSlotsMax[1] != null ? character.spellSlotsMax[1] : ""} </span></p>
                                    </div>
                                    <div className="col-sm-4">
                                        <p>LEVEL 3: <span className="chardata">{character.spellSlotsMax[2] != null ? character.spellSlotsMax[2] : ""} </span></p>
                                    </div>
                                    <div className="col-sm-4">
                                        <p>LEVEL 4: <span className="chardata">{character.spellSlotsMax[3] != null ? character.spellSlotsMax[3] : ""} </span></p>
                                    </div>
                                    <div className="col-sm-4">
                                        <p>LEVEL 5: <span className="chardata">{character.spellSlotsMax[4] != null ? character.spellSlotsMax[4] : ""} </span></p>
                                    </div>
                                    <div className="col-sm-4">
                                        <p>LEVEL 6: <span className="chardata">{character.spellSlotsMax[5] != null ? character.spellSlotsMax[5] : ""} </span></p>
                                    </div>
                                    <div className="col-sm-4">
                                        <p>LEVEL 7: <span className="chardata">{character.spellSlotsMax[6] != null ? character.spellSlotsMax[6] : ""} </span></p>
                                    </div>
                                    <div className="col-sm-4">
                                        <p>LEVEL 8: <span className="chardata">{character.spellSlotsMax[7] != null ? character.spellSlotsMax[7] : ""} </span></p>
                                    </div>
                                    <div className="col-sm-4">
                                        <p>LEVEL 9: <span className="chardata">{character.spellSlotsMax[8] != null ? character.spellSlotsMax[8] : ""} </span></p>
                                    </div>
                                </div>
    
                                <div className="spacer col-sm-12"/>
                                            <div className="hr full-width col-sm-12"/>
                                <div className="col-sm-12">
                                    <h4>ATTACK</h4>
                                </div>
                                <div className="col-sm-5">
                                    <p className="p-override"><strong>NAME</strong></p>
                                    <p className="chardata">{character.currWeapon.currWeaponName != null ? character.currWeapon.currWeaponName : ""} </p>
                                </div>
                                <div className="col-sm-2">
                                    <p className="p-override"><strong>ATK BONUS</strong></p>
                                    <p className="chardata">{character.currWeapon.currWeaponBonus != null ? character.currWeapon.currWeaponBonus : ""}</p>
                                </div>
                                <div className="col-sm-5">
                                    <p className="p-override"><strong>DAMAGE/TYPE</strong></p>
                                    <p className="chardata">{character.currWeapon.currWeaponDamage != null ? character.currWeapon.currWeaponDamage : ""}</p>
                                </div>
                                <div className="half-spacer col-sm-12"/>
                                
                                <div className="col-sm-5">
                                    <p className="chardata">{character.currWeapon.weapon2Name != null ? character.currWeapon.weapon2Name : ""} </p>
                                </div>
                                <div className="col-sm-2">
                                    <p className="chardata">{character.currWeapon.weapon2Bonus != null ? character.currWeapon.weapon2Bonus : ""} </p>
                                </div>
                                <div className="col-sm-5">
                                    <p className="chardata">{character.currWeapon.weapon2damage != null ? character.currWeapon.weapon2damage : ""}</p>
                                </div>
                                <div className="half-spacer col-sm-12"/>
                                
                                <div className="col-sm-5">
                                    <p className="chardata">{character.currWeapon.weapon3Name != null ? character.currWeapon.weapon3Name : ""}</p>
                                </div>
                                <div className="col-sm-2">
                                    <p className="chardata">{character.currWeapon.weapon3Bonus != null ? character.currWeapon.weapon3Bonus : ""}</p>
                                </div>
                                <div className="col-sm-5">
                                    <p className="chardata">{character.currWeapon.weapon3damage != null ? character.currWeapon.weapon3damage : ""}</p>
                                </div>
                                <div className="half-spacer col-sm-12"/>
    
                                <div className="col-sm-12">
                                    <p className="chardata">{character.attackNotes != null ? character.attackNotes : ""}</p>
                                </div>
    
                                            <div className="spacer col-sm-12"/>
                                            <div className="hr full-width col-sm-12"/>
    
                                <div className="col-sm-12">
                                    <h4>PROFICIENCIES & LANGUAGES</h4>
                                </div>
                                
                                <div className="col-sm-12">
                                    <p className="chardata">{character.proficiencies != null ? character.proficiencies : ""} </p>
                                </div>
    
                                            <div className="spacer col-sm-12"/>
                                            <div className="hr full-width col-sm-12"/>
    
                                <div className="col-sm-12">
                                    <h4>EQUIPMENT</h4>
                                </div>
                                
                                <div className="col-sm-12">
                                    <p className="chardata">{character.equipmentNotes!= null ? character.equipmentNotes : ""}</p>
                                </div>
    
                                            <div className="spacer col-sm-12"/>
                                            <div className="hr full-width col-sm-12"/>
    
                                <div className="col-sm-12">
                                    <h4>FEATURES & TRAITS</h4>
                                </div>
                                
                                <div className="col-sm-12">
                                    <p className="chardata">{character.notes != null ? character.notes : ""} </p>
                                </div>
                                        
                                <div className="spacer col-sm-12"/>
                                <div className="spacer col-sm-12"/>
                                <div className="spacer col-sm-12"/>
                            
                            </div>
                            <button onClick={this.props.closePopup} className=" submit-button button" style={{"float":"right"}}>Close</button>

                        </div>
                    </div>
                </div>
            
            );
        }
    
    }