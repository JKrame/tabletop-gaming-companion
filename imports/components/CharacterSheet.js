import React from 'react'
import { Characters } from '../api/character';

import CharacterForm from '../objects/CharacterForm';


export default class CharacterSheet extends React.Component{

    onSubmit(e){  
        e.preventDefault();
    }
  
  render() {
    return(
        <div className="page-wrapper">
            <div className="col-lg-8 col-lg-offset-2">
                <div className="page-content col-xs-12 fill-height">
                    <h3>Character Sheet >></h3>
                    <hr/>
                    
                    <div className="col-sm-4 split-page-left container">
                    </div>

                    <div className="col-sm-8 split-page-right left-border container scrolling-container">
                        <CharacterForm />
                       
                    </div>

                </div>
            </div>
        </div>
    );
  }
}  