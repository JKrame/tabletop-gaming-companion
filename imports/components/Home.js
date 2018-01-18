import React from 'react'

import { Characters } from '../api/character';

export default class Home extends React.Component{

  onSubmit(e){  
    //gets the character name
    const characterName = this.refs.characterName.value.trim();

    e.preventDefault();

    //checks if value exists
    if (characterName) {
      Characters.insert({ characterName });
      //This is broken
      //this.refs.charactersName.value = '';
    }
  }



  render() {
    return(
      <div className="page-wrapper">
          <div className="col-lg-8 col-lg-offset-2">
                <div className="col-lg-6 ">
                  <div className="page-content-half">
                      <h3>Characters >></h3>
                      <hr/>
                      <p>Add Character</p>
                      <form onSubmit={this.onSubmit.bind(this)}>
                        <input type="text" ref="characterName" placeholder="Character Name"/>
                        <button>Create Character</button>
                      </form>
                      <br/>
                      <div className="item"></div>
                    </div>
                </div>
                <div className="col-lg-6 ">
                <div className="page-content-half">
                    <h3>Campaigns >></h3>
                    <hr/>
                    <br/>
                    <div className="item"></div>
                  </div>
              </div>
              <div className="col-lg-6 ">
              <div className="page-content-half">
                  <h3>Players Nearby >></h3>
                  <hr/>
                  <br/>
                  <div className="item"></div>
                </div>
            </div>
            <div className="col-lg-6 ">
            <div className="page-content-half">
                <h3>Meeting Spots >></h3>
                <hr/>
                <br/>
                <div className="item"></div>
              </div>
          </div>
          </div>
      </div>
    );
  }
}  