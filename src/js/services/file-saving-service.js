import GoogleDriveService from '../services/google-drive-service.js'
import FileStore from '../stores/file-store.js'
import DocStore from '../stores/doc-store.js'
import TreeStore from '../stores/tree-store.js'


const service = {

    state: { fileId: null, title: null, 
             documents: [], 
             root: null, folderTree: {}, documentTree: {},
             error: null },

    init() {

        if (this.initialized) return;
        this.initialized = true;

        FileStore.getState(({ fileId, title }) => {
            this.state = Object.assign({}, this.state, { fileId, title });
        });

        DocStore.getState(({ documents }) => {
            this.state = Object.assign({}, this.state, { documents });
        })

        TreeStore.getState(({ documentTree }) => {
            this.state = Object.assign({}, this.state, { documentTree });
        })

    },

    canSave() {
        return this.state.fileId !== null;
    },

    saveFile() {
        if (!this.canSave()) {
            throw new Error("No file has been loaded yet");
        }

        const { fileId, title, documents, documentTree } = this.state;

        const content = JSON.stringify({ documents, documentTree });

        console.log("Saving " + fileId)
        return GoogleDriveService.save(fileId, title, content);
    }


};

export default service;