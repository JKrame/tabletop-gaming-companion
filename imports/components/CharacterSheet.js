import React from 'react'

import { Characters } from '../api/character';
import CharacterForm from '../objects/CharacterForm';


export default class CharacterSheet extends React.Component{

    onSubmit(e){  
        e.preventDefault();
    }

    renderImage(){
        return '/images/photoMissing.png';
    }
  
    render() {
        _id = this.props.match.params._id;

        return(
            <div className="page-wrapper">
                <div className="col-lg-8 col-lg-offset-2">
                    <div className="page-content col-xs-12 fill-height">
                        <h3>Character Sheet >></h3>
                        <hr/>
                        
                        <div className="col-sm-4 split-page-left container">
                            <img src={this.renderImage()} className="full-width"/>
                            <div className="spacer col-sm-12"/>

                            <form>
                                <div className="col-sm-12">
                                    <p className="p-override">IMAGE URL</p>
                                    <input className="full-width" type="text" ref="characterImageURL" placeholder=""/>
                                </div>
                                <div className="spacer col-sm-12"/>
                                <div className="spacer col-sm-12"/>

                                <div className="col-sm-12">
                                    <button className="full-width submit-button">UPDATE IMAGE   </button>
                                </div>
                            </form>
                        </div>
                        

                        <div className="col-sm-8 split-page-right left-border container">
                            <CharacterForm _id={_id}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}  