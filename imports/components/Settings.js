import React from 'react'

export default class Settings extends React.Component{
  render() {
    return(
        <div className="col-xs-12">
            <div className="col-sm-8 col-sm-offset-2 ">
                <div className=" page-content col-sm-12">
                        
                    <div className="col-sm-4 split-page-left container">
                        <img  className="full-width" src={'/images/photoMissing.png'}/>
                        <div className="spacer col-sm-12"/>

                            <div className="col-sm-12">
                                <p className="p-override">IMAGE URL</p>
                                <input className="full-width" type="text" ref="characterImageURL" />
                            </div>
                            <div className="spacer col-sm-12"/>
                            <div className="spacer col-sm-12"/>
                            <div className="spacer col-sm-12"/>

                            <div className="col-sm-12">
                                <button className="full-width submit-button blue-button">SUBMIT CHANGES</button>
                            </div>

                    </div>

                    <div className="col-sm-8 split-page-right left-border container">
                        <form >
                            <div className="scrolling-container-smaller">
                                <div className="col-sm-12">
                                    <p className="p-override">NAME</p>
                                    <input className="full-width" type="text" ref="characterName" />
                                </div>
                            <div className="spacer col-sm-12"/>
                                <div className="col-sm-12">
                                    <p className="p-override">NAME</p>
                                    <input className="full-width" type="text" ref="characterName" />
                                </div>                        
                            <div className="spacer col-sm-12"/>
                                <div className="col-sm-12">
                                    <p className="p-override">NAME</p>
                                    <input className="full-width" type="text" ref="characterName" />
                                </div>                        
                            <div className="spacer col-sm-12"/>
                                <div className="col-sm-12">
                                    <p className="p-override">NAME</p>
                                    <input className="full-width" type="text" ref="characterName" />
                                </div>                        
                            <div className="spacer col-sm-12"/>
                                <div className="col-sm-12">
                                    <p className="p-override">NAME</p>
                                    <input className="full-width" type="text" ref="characterName" />
                                </div>                       
                            <div className="spacer col-sm-12"/>
                                <div className="col-sm-12">
                                    <p className="p-override">NAME</p>
                                    <input className="full-width" type="text" ref="characterName" />
                                </div>                       
                            <div className="spacer col-sm-12"/>
                                <div className="col-sm-12">
                                    <p className="p-override">NAME</p>
                                    <input className="full-width" type="text" ref="characterName" />
                                </div>                       
                            <div className="spacer col-sm-12"/>
                                <div className="col-sm-12">
                                    <p className="p-override">NAME</p>
                                    <input className="full-width" type="text" ref="characterName" />
                                </div>
                                
                                <div className="spacer col-sm-12"/>
                                <div className="spacer col-sm-12"/>
                                <div className="spacer col-sm-12"/>
                                <div className="spacer col-sm-12"/>


                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
            
    );
  }
}  