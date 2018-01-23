import React from 'react'

export default class Binder extends React.Component{
    render() {
        return(
            <div className="page-wrapper">
                <div className="col-lg-8 col-lg-offset-2">
                    <div className="page-content col-xs-12" >
                        <div className="col-lg-6 split-page-left">
                            <h3>Your Characters >></h3>
                            <hr/>
                            <div className="objectCardHalf ">
                                <div className="objectCardHalfImage">
                                    <img src={'/images/placeholder.jpg'}/>
                                </div>
                                <div className="objectCardHalfInfo container-fluid">
                                    <h4>Elfman Needsaname</h4>
                                    <hr className="hr-override container-fluid"/>
                                    <p className="p-override"> Class: Druid</p>
                                    <p className="p-override"> Level: 4</p>
                                    <p className="p-override"> Race: Elf</p>
                                </div>
                            </div>

                            <div className="objectCardHalf ">
                                <div className="objectCardHalfImage">
                                    <img src={'/images/placeholder.jpg'}/>
                                </div>
                                <div className="objectCardHalfInfo container-fluid">
                                    <h4>Elfman Needsaname</h4>
                                    <hr className="hr-override container-fluid"/>
                                    <p className="p-override"> Class: Druid</p>
                                    <p className="p-override"> Level: 4</p>
                                    <p className="p-override"> Race: Elf</p>
                                </div>
                            </div>

                            <div className="objectCardHalf ">
                                <div className="objectCardHalfImage">
                                    <img src={'/images/placeholder.jpg'}/>
                                </div>
                                <div className="objectCardHalfInfo container-fluid">
                                    <h4>Elfman Needsaname</h4>
                                    <hr className="hr-override container-fluid"/>
                                    <p className="p-override"> Class: Druid</p>
                                    <p className="p-override"> Level: 4</p>
                                    <p className="p-override"> Race: Elf</p>
                                </div>
                            </div>

                            <div className="objectCardHalf ">
                                <div className="objectCardHalfImage">
                                    <img src={'/images/placeholder.jpg'}/>
                                </div>
                                <div className="objectCardHalfInfo container-fluid">
                                    <h4>Elfman Needsaname</h4>
                                    <hr className="hr-override container-fluid"/>
                                    <p className="p-override"> Class: Druid</p>
                                    <p className="p-override"> Level: 4</p>
                                    <p className="p-override"> Race: Elf</p>
                                </div>
                            </div>

                            <div className="objectCardHalf ">
                                <div className="objectCardHalfImage">
                                    <img src={'/images/addIcon.png'}/>
                                </div>
                                <div className="objectCardHalfInfo container-fluid">
                                    <h4>CREATE NEW CHARACTER</h4>
                                    <hr className="hr-override container-fluid"/>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 split-page-right">
                            <h3>Your Campaigns >></h3>
                            <hr className="container-fluid"/>
                            <div className="objectCardHalf ">
                                <div className="objectCardHalfImage">
                                    <img src={'/images/placeholder.jpg'}/>
                                </div>
                                <div className="objectCardHalfInfo container-fluid">
                                    <h4>Campaign Name</h4>
                                    <hr className="hr-override container-fluid"/>
                                    <p className="p-override"> Campaign Description</p>
                                </div>
                            </div>
                    
                            <div className="objectCardHalf ">
                                <div className="objectCardHalfImage">
                                    <img src={'/images/placeholder.jpg'}/>
                                </div>
                                <div className="objectCardHalfInfo container-fluid">
                                    <h4>Campaign Name</h4>
                                    <hr className="hr-override container-fluid"/>
                                    <p className="p-override"> Campaign Description...</p>
                                </div>
                            </div>

                            <div className="objectCardHalf ">
                                <div className="objectCardHalfImage">
                                    <img src={'/images/pending.png'}/>
                                </div>
                                <div className="objectCardHalfInfo container-fluid">
                                    <h4>PENDING INVITE</h4>
                                    <hr className="hr-override container-fluid"/>
                                    <p className="p-override">Click for Details...</p>
                                </div>
                            </div>

                            <div className="objectCardHalf ">
                                <div className="objectCardHalfImage">
                                    <img src={'/images/addIcon.png'}/>
                                </div>
                                <div className="objectCardHalfInfo container-fluid">
                                    <h4>CREATE NEW CAMPAIGN</h4>
                                    <hr className="hr-override container-fluid"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}  