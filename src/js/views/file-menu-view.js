import React from 'react'
import FileStore from '../stores/file-store.js'
import FileLoadingService from '../services/file-loading-service.js'
import FileHistoryStore from '../stores/file-history-store.js'
import storeWrapper from '../util/store-wrapper.js'

const FileMenuViewUnderlying = React.createClass({


    pickFile() {
        FileLoadingService.pickFile();
    },

    onLoadDebug() {
        const loaded = FileLoadingService.loadDebug();
        this.props.onDone && loaded.then(this.props.onDone);
    },

    onLoadFile(fileId) {
        return () => {
            const loaded = FileLoadingService.loadFile(fileId);
            console.log(loaded);
            this.props.onDone && loaded.then(this.props.onDone);
        }
    },

    render() {

        return (
            <div>
                {this.props.history.map(({ fileId, title }) =>
                    <div><button onClick={this.onLoadFile(fileId)}>{ title }</button><br /></div>
                )}
                <button onClick={this.onLoadDebug}>Load Debug File</button><br />
                <button onClick={this.pickFile}>Load from Google Drive</button><br />
                { this.props.title ? 
                    <span>
                        Loaded: {this.props.title}
                    </span>
                    : undefined }
                
            </div>
        );
        
    }
});

const FileMenuView = storeWrapper([FileStore, FileHistoryStore])(FileMenuViewUnderlying);

export default FileMenuView;