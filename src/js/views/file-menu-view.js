import React from 'react'
import FileStore from '../stores/file-store.js'
import FileSavingService from '../services/file-saving-service.js'
import storeWrapper from '../util/store-wrapper.js'

const FileMenuViewUnderlying = React.createClass({


    pickFile() {
        FileStore.pickFile();
    },

    saveFile() {
        if (this.props.title) {
            FileSavingService.saveFile();
        }
    },

    onLoadExample() {
        FileStore.loadExample();
    },

    render() {

        return (
            <div>

                <button onClick={this.onLoadExample}>Ex.</button><br />
                <button onClick={this.pickFile}>Load</button><br />
                { this.props.title ? 
                    <span>
                        <button onClick={this.saveFile}>Save</button> <br />
                        Loaded: {this.props.title}
                    </span>
                    : undefined }
                
            </div>
        );
        
    }
});

const FileMenuView = storeWrapper([FileStore])(FileMenuViewUnderlying);

export default FileMenuView;