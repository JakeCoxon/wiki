import React from 'react'
import { connect } from 'react-redux'
import { fileLoadData, filePick, fileLoadGoogleId, fileSave } from '../action-creators'


const FileMenuViewUnderlying = React.createClass({


    pickFile() {
        const loaded = this.props.dispatch(filePick());
        this.props.onDone && loaded.then(this.props.onDone);
    },

    onLoadDebug() {
        const fileData = require('../debug-data.js').debugFile;
        const loaded = this.props.dispatch(fileLoadData(fileData));
        this.props.onDone && loaded.then(this.props.onDone);
    },

    onLoadFile(fileId) {
        return () => {
            const loaded = this.props.dispatch(fileLoadGoogleId(fileId));
            this.props.onDone && loaded.then(this.props.onDone);
        }
    },

    onSave() {
        this.props.dispatch(fileSave());
    },

    render() {

        return (
            <div>
                { this.props.loadedFile && ( 
                    <div>
                        <div>Loaded: {this.props.loadedFile.title}</div>
                        <button onClick={this.onSave}>Save now</button>
                    </div>
                )}
                {this.props.history && 
                    <div style={{ marginTop: 20 }}>
                        Recent files
                        {this.props.history.map(({ fileId, title }) =>
                            <div key={fileId}><button onClick={this.onLoadFile(fileId)}>{ title }</button></div>
                        )}
                    </div>
                }
                <div  style={{ marginTop: 20 }}>
                    Load other
                    <div><button onClick={this.onLoadDebug}>Load Debug File</button></div>
                    <div><button onClick={this.pickFile}>Load from Google</button></div>
                </div>
                
            </div>
        );
        
    }
});

const mapStateToProps = (state) => ({
    loadedFile: state.file,
    history: state.fileHistory
})
const FileMenuView = connect(mapStateToProps)(FileMenuViewUnderlying);


export default FileMenuView;