import React from 'react'

//import { Characters } from '../api/character';
import CharacterForm from '../objects/CharacterForm';

var character;
var characterName;
var cs;

export default class CharacterSheet extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: '',
            id: ''
        };
    }

    componentWillMount(){
        id = this.props.match.params._id;
        this.setState({id: id});
        console.log("cs > componentDidMount");
        this.characterSheetTracker = Tracker.autorun(() => {
            const sub = Meteor.subscribe('characters');
            console.log("cs > componentDidMount > tracker");
            console.log(sub.ready());
            if(sub.ready())
            {
                character = CharactersCollection.findOne({_id : id});
                if(character != null)
                {
                    characterName = character.characterName;
                }
                console.log("componentDidMount cs");
                console.log(id);
                console.log(character);                
            }
            this.forceUpdate();
        });
    }

    componentWillUnmount(){
        this.characterSheetTracker.stop();
    }

    renderForm(){
        if(character === null)
        {
            console.log("calling cf w/o props");
            return;
        }
        else
        {
            console.log("calling cf w/ props");
            return(<CharacterForm hasProps={true} character={character} _id={this.state.id} CharacterSheet={this}/>);
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