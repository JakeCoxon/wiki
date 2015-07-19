import React from 'react'
import FileStore from '../stores/file-store.js'
import FileSavingService from '../services/file-saving-service.js'

const TreeView = React.createClass({
    componentWillMount() {
        FileStore.getState(state =>
            this.setState({ title: state.title }));

    },


    pickFile() {
        FileStore.pickFile();
    },

    saveFile() {
        if (this.state.title) {
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
                { this.state.title ? 
                    <span>
                        <button onClick={this.saveFile}>Save</button> <br />
                        Loaded: {this.state.title}
                    </span>
                    : undefined }
                
            </div>
        );
        
    }
});

export default TreeView;