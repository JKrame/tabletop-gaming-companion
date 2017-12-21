import React from 'react'

export default class Home extends React.Component{
  render() {
    return(
      <div className="page-wrapper">
          <div className="col-lg-8 col-lg-offset-2">
                <div className="col-lg-6 ">
                  <div className="page-content-half">
                      <h3>Characters >></h3>
                      <hr/>
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