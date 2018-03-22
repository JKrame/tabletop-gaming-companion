import React from 'react'

export default class ImageFormPopup extends React.Component {
    render() {
      return (
        <div className='popup'>
            
          <div className="add-image-popup popup_inner">
              <h2>Enter the Image URL</h2>
              <input type="text" ref="imageUrlBox" className="full-width"/>
              <div className="col-sm-12">
                  <div className="right-align">
                      <button onClick={this.props.closePopup} className=" submit-button button">Cancel</button>
                      <button onClick={() => this.props.addImageAsset(this.refs.imageUrlBox.value)} className="submit-button blue-button button">Add Image</button>
                  </div>
              </div>
          </div>
                
        </div>
      );
    }
  }