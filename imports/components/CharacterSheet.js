import React from 'react'

import Header from './Header';

//import { Characters } from '../api/character';
import CharacterForm from '../objects/CharacterForm';

export default class CharacterSheet extends React.Component{
    character;
    
    componentWillMount(){
        id = this.props.match.params._id;
        this.characterSheetTracker = Tracker.autorun(() => {
            const sub = Meteor.subscribe('characters');
            if(sub.ready())
            {
                this.character = Characters.findOne({_id : id});
            }
            this.forceUpdate();
        });
    }

    componentWillUnmount(){
        this.characterSheetTracker.stop();
    }

    renderForm(){
        if(this.character == null)
        {
            return;
        }
        else
        {
            return(<CharacterForm character={this.character} UID={this.character.UID}/>);
        }
    }

    render() {
        return(
            <div className="page-wrapper">
                <div className="col-lg-8 col-lg-offset-2">
                    <div className="page-content col-xs-12 fill-height">
                        <h3>Character Sheet >></h3>
                        <hr/>
                            {this.renderForm()}
                    </div>
                </div>
            </div>
        );
    }
}  