import React from 'react'

export default class TextAssetcard extends React.Component{
    render() {
        return (
            <div className="objectCardMini">
                <div className="objectCardMiniInfo container-fluid">
                    <p className="p-override no-margin-override small-text"> {this.props.noteTitle}  {this.props.noteDescription}</p>
                </div>
            </div>
        );
    }
}