import React from 'react'
import { Characters } from '../api/character';

export default class CharacterSheet extends React.Component{
  
  onSubmit(e){  
    //gets the character name
    const characterName = this.refs.characterName.value.trim();
    const characterClass = this.refs.characterClass.value.trim();

    e.preventDefault();

    //checks if value exists
    if (characterName && characterClass) {
      Characters.insert({ name : characterName, class : characterClass });
      //this.refs.charactersName.value = '';
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