import React from 'react'

//import { Characters } from '../api/character';
import CharacterForm from '../objects/CharacterForm';

var character;
var characterName;
export default class CharacterSheet extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: '',
            id: ''
        };
    }

    onSubmit(e){  
        e.preventDefault();
    }

    componentWillMount()
    {
        this.setState({id: this.props.match.params._id});
    }

    componentDidMount(){
        console.log("cs > componentDidMount");
        this.characterSheetTracker = Tracker.autorun(() => {
            const sub = Meteor.subscribe('characters');
            id = this.props.match.params._id;
            console.log("cs > componentDidMount > tracker");
            console.log(sub.ready());
            if(sub.ready())
            {
                character = Characters.findOne({_id : id});
                characterName = character.characterName;
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
        if(character == null)
        {
            console.log("calling cf w/o props");
            return(<CharacterForm hasProps={false} _id={this.state.id}/>);
        }
        else
        {
            console.log("calling cf w/ props");
            return(<CharacterForm hasProps={true} character={character} _id={this.state.id}/>);
        }
    }

    renderImage(){
        return '/images/photoMissing.png';
    }
  
    render() {
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
                            {this.renderForm()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}  