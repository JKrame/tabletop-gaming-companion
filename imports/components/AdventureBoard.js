import React from 'react'
import AdventureBoardCollection from '../api/AdventureBoard';

export default class AdventureBoard extends React.Component{
  render() {
    return(
        <div className="page-wrapper">
          <div className="col-lg-8 col-lg-offset-2">
            <div className="page-content">
              <h1>Adventure Board</h1>
            </div>
          </div>
        </div>
    );
  }
}  