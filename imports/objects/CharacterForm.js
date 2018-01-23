import React from 'react'


export default class CharacterForm extends React.Component{
    
    onSubmit(e){  
        //gets the character name
        const characterName = this.refs.characterName.value.trim();
        const characterBackstory = this.refs.characterBackstory.value.trim();
        const characterLevel = this.refs.characterLevel.value.trim();
        const characterClass = this.refs.characterClass.value.trim();
        const characterRace = this.refs.characterRace.value.trim();
        const characterAlignment = this.refs.characterAlignment.value.trim();
        const characterBackground = this.refs.characterBackground.value.trim();
        const characterAC = this.refs.characterAC.value.trim();
        const characterMaxHP = this.refs.characterMaxHP.value.trim();
        const characterTempHP = this.refs.characterTempHP.value.trim();
        const characterInitiative = this.refs.characterInitiative.value.trim();
        const characterSpeed = this.refs.characterSpeed.value.trim();
        const characterHitDice = this.refs.characterHitDice.value.trim();
        const characterTotalHitDice = this.refs.characterTotalHitDice.value.trim();
        const characterTemphitDice = this.refs.characterTemphitDice.value.trim();
        const characterDeathSaveSuccesses = this.refs.characterDeathSaveSuccesses.value.trim();
        const characterDeathSaveFailures = this.refs.characterDeathSaveFailures.value.trim();
        const characterStrength = this.refs.characterStrength.value.trim();
        const characterDexterity = this.refs.characterDexterity.value.trim();
        const characterConstitution = this.refs.characterConstitution.value.trim();
        const characterIntelligence = this.refs.characterIntelligence.value.trim();
        const characterWisdom = this.refs.characterWisdom.value.trim();
        const characterCharisma = this.refs.characterCharisma.value.trim();
        const characterProficiency = this.refs.characterProficiency.value.trim();
        const characterInspiration = this.refs.characterInspiration.value.trim();
        const characterPerception = this.refs.characterPerception.value.trim();
        const characterSavingThrows = this.refs.characterSavingThrows.value.trim();
        const characterSkills = this.refs.characterSkills.value.trim();
        const weapon1Name = this.refs.weapon1Name.value.trim();
        const weapon1Atk = this.refs.weapon1Atk.value.trim();
        const weapon1DamageType = this.refs.weapon1DamageType.value.trim();
        const weapon2Name = this.refs.weapon2Name.value.trim();
        const weapon2Atk = this.refs.weapon2Atk.value.trim();
        const weapon2DamageType = this.refs.weapon2DamageType.value.trim();
        const weapon3Name = this.refs.weapon3Name.value.trim();
        const weapon3Atk = this.refs.weapon3Atk.value.trim();
        const weapon3DamageType = this.refs.weapon3DamageType.value.trim();
        const attackNotes = this.refs.attackNotes.value.trim();
        const proficiencyNotes = this.refs.proficiencyNotes.value.trim();
        const equipmentNotes = this.refs.equipmentNotes.value.trim();
        const featureNotes = this.refs.featureNotes.value.trim();
    
        e.preventDefault();
    
        //checks if value exists
        if (characterName && characterClass) {
            Characters.insert({ name : characterName, class : characterClass });
            //this.refs.charactersName.value = '';
        }
    }
    
    render() {
        return(
            <form onSubmit={this.onSubmit.bind(this)}>

                <div className="col-sm-12">
                    <p className="p-override">NAME</p>
                    <input className="full-width" type="text" ref="characterName" placeholder=""/>
                </div>

                <div className="col-sm-12">
                    <p className="p-override">BACKSTORY</p>
                    <input className="full-width" type="textarea" ref="characterBackstory" style={{"height":200}}/>
                </div>

                            <div className="spacer col-sm-12"/>
                            <div className="hr full-width col-sm-12"/>

                <div className="col-sm-4">
                    <p className="p-override">LEVEL</p>
                    <input className="full-width" type="text" ref="characterLevel" placeholder=""/>
                </div>
                <div className="col-sm-4">
                    <p className="p-override">CLASS</p>
                    <input className="full-width" type="text" ref="characterClass" placeholder=""/>
                </div>
                <div className="col-sm-4">
                    <p className="p-override">RACE</p>
                    <input className="full-width" type="text" ref="characterRace" placeholder=""/>
                </div>

                            <div className="spacer col-sm-12"/>

                <div className="col-sm-6">
                    <p className="p-override">ALIGNMENT</p>
                    <input className="full-width" type="text" ref="characterAlignment" placeholder=""/>
                </div>
                <div className="col-sm-6">
                    <p className="p-override">BACKGROUND</p>
                    <input className="full-width" type="text" ref="characterBackground" placeholder=""/>
                </div>

                         <div className="spacer col-sm-12"/>

                         <div className="hr full-width col-sm-12"/>

                <div className="col-sm-4">
                    <p className="p-override">AC</p>
                    <input className="full-width" type="text" ref="characterAC" placeholder=""/>
                </div>
                <div className="col-sm-4">
                    <p className="p-override">MAX HP</p>
                    <input className="full-width" type="text" ref="characterMaxHP" placeholder=""/>
                </div>
                <div className="col-sm-4">
                    <p className="p-override">TEMP HP</p>
                    <input className="full-width" type="text" ref="characterTempHP" placeholder=""/>
                </div>

                            <div className="spacer col-sm-12"/>

                <div className="col-sm-4">
                    <p className="p-override">INITIATIVE</p>
                    <input className="full-width" type="text" ref="characterInitiative" placeholder=""/>
                </div>
                <div className="col-sm-4">
                    <p className="p-override">SPEED</p>
                    <input className="full-width" type="text" ref="characterSpeed" placeholder=""/>
                </div>

                            <div className="spacer col-sm-12"/>
                            <div className="hr full-width col-sm-12"/>

                            
                <div className="col-sm-4">
                    <p className="p-override">HIT DICE</p>
                    <input className="full-width" type="text" ref="characterHitDice" placeholder=""/>
                </div>
                <div className="col-sm-4">
                    <p className="p-override">TOTAL HIT DICE</p>
                    <input className="full-width" type="text" ref="characterTotalHitDice" placeholder=""/>
                </div>
                <div className="col-sm-4">
                    <p className="p-override">TEMP HIT DICE</p>
                    <input className="full-width" type="text" ref="characterTemphitDice" placeholder=""/>
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
                    <input className="full-width" type="text" ref="characterStrength" placeholder=""/>
                </div>
                <div className="col-sm-2 col-xs-4">
                    <p className="p-override">DEXTERITY</p>
                    <input className="full-width" type="text" ref="characterDexterity" placeholder=""/>
                </div>
                <div className="col-sm-2 col-xs-4">
                    <p className="p-override">CONSTITUTION</p>
                    <input className="full-width" type="text" ref="characterConstitution" placeholder=""/>
                </div>

                <div className="col-sm-2 col-xs-4">
                    <p className="p-override">INTELLIGENCE</p>
                    <input className="full-width" type="text" ref="characterIntelligence" placeholder=""/>
                </div>
                <div className="col-sm-2 col-xs-4">
                    <p className="p-override">WISDOM</p>
                    <input className="full-width" type="text" ref="characterWisdom" placeholder=""/>
                </div>
                <div className="col-sm-2 col-xs-4">
                    <p className="p-override">CHARISMA</p>
                    <input className="full-width" type="text" ref="characterCharisma" placeholder=""/>
                </div>

                            <div className="spacer col-sm-12"/>

                            
                <div className="col-sm-4">
                    <p className="p-override">PROFICIENCY BONUS</p>
                    <input className="full-width" type="text" ref="characterProficiency" placeholder=""/>
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
                    <select className="full-width no-scrollbar" ref="characterSavingThrows" size={6} multiple>
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
                    <input className="full-width" type="text" ref="weapon1Name" placeholder=""/>
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
                    <input className="full-width" type="textarea" ref="proficiencyNotes" style={{"height":200}}/>
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
                    <input className="full-width" type="textarea" ref="featureNotes" style={{"height":200}}/>
                </div>
                        
                <div className="spacer col-sm-12"/>
                <div className="spacer col-sm-12"/>
                <div className="spacer col-sm-12"/>

                <div className="col-sm-12">
                    <button className="full-width submit-button">SUBMIT CHANGES</button>
                </div>
            </form>
        );
    }
}