import React from 'react'
import FileLoadingStore from '../stores/file-loading-store.js'

const TreeView = React.createClass({
    componentWillMount() {
        FileLoadingStore.getState(state =>
            this.setState({ title: state.title }));

        this.loadFile = this.loadFile.bind(this);
        this.saveFile = this.saveFile.bind(this);
    },


    loadFile() {
        FileLoadingStore.loadFile();
    },

    saveFile() {
        if (this.state.title) {
            FileSavingStore.saveFile();
        }
    },

    render() {

        return (
            <div>

                <button onClick={this.loadFile}>Load</button>
                { this.state.title ? 
                    <span>
                        <button onClick={this.saveFile}>Save</button> 
                        {this.state.title}
                    </span>
                    : undefined }
                
            </div>
        );
        
    }
});

export default TreeView;