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
      this.refs.characterName.value = '';
    }
  }



  render() {
    return(
      <div className="page-wrapper">
          <div className="col-lg-8 col-lg-offset-2">
                <div className="col-md-6 ">
                  
                  
                  <div className="page-content-half">
                      <h3>Characters >></h3>
                      <hr/>
                          <div className="page-content-scroller">
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
                      </div>
                </div>
                
              <div className="col-md-6 ">
                  <div className="page-content-half">
                      <h3>Campaigns >></h3>
                      <hr/>
                      
                      <div className="page-content-scroller">
                          <div className="objectCardHalf ">
                              <div className="objectCardHalfImage">
                                  <img src={'/images/placeholder.jpg'}/>
                              </div>
                              <div className="objectCardHalfInfo container-fluid">
                                  <h4>CampaignName</h4>
                                  <hr className="hr-override container-fluid"/>
                                  <p className="p-override"> Campaign Description...</p>
                              </div>
                          </div>
                      
                          <div className="objectCardHalf ">
                              <div className="objectCardHalfImage">
                                  <img src={'/images/placeholder.jpg'}/>
                              </div>
                              <div className="objectCardHalfInfo container-fluid">
                                  <h4>CampaignName</h4>
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
              <div className="col-md-6 ">
              <div className="page-content-half">
                  <h3>Players Nearby >></h3>
                  <hr/>
                  <br/>
                  <div className="item"></div>
                </div>
            </div>
            <div className="col-md-6 ">
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