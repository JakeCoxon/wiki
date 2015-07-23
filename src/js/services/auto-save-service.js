import GoogleDriveService from '../services/google-drive-service.js'
import DocStore from '../stores/doc-store.js'
import TreeStore from '../stores/tree-store.js'

import FileSavingService from '../services/file-saving-service.js'


const service = {

    state: { timeout: null },

    init() {

        if (this.initialized) return;
        this.initialized = true;

        this.updateTimeout = this.updateTimeout.bind(this);
        this.saveFile = this.saveFile.bind(this);

        DocStore.getState(this.updateTimeout);
        TreeStore.getState(this.updateTimeout);

    },

    updateTimeout() {
        window.clearTimeout(this.state.timeout);
        const timeout = window.setTimeout(this.saveFile, 5000);
        this.state = { timeout };
    },

    saveFile() {
        if (FileSavingService.canSave()) {
            FileSavingService.saveFile();
        }
    }


};

export default service;