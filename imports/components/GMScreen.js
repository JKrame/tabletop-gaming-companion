import React from 'react'

import Header from './Header';

export default class GMScreen extends React.Component{
  render() {
    return(
      <div className="page-wrapper">
      <Header/>
          <div className="col-lg-8 col-lg-offset-2">
            <div className="page-content">
              <h3>GM Screen >></h3>
              <hr/>
            </div>
          </div>
        </div>
    );
  }
}  