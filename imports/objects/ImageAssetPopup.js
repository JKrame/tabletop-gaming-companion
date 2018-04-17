import React from 'react'


export default class ImageAssetPopup extends React.Component {
    renderImg(url){
        console.log(url);
        return(
            <img src={url}/>
        )
    }

    render() {
        return (
            <div className='popup' onClick={this.props.closePopup}>
                <div className=" img_asset_popup">
                    {this.renderImg(this.props.img)}
                </div>
            </div>
        );
    }
}