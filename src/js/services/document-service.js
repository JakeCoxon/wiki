import DocStore from '../stores/doc-store.js'
import TreeStore from '../stores/tree-store.js'
import VisibleStore from '../stores/visible-store.js'
import DocumentService from '../services/document-service.js'

const service = {

    state: {},

    getFreshId() {
        var maxKey = 0;
        Object.keys(this.state.documents).forEach(key => {
            maxKey = Math.max(key, maxKey);
        })
        return maxKey + 1; 
    },

    newDocument(folderId, autoShow) {
        const newDoc = { id: this.getFreshId(), title: "untitled", body: "" };
        DocStore.insert(newDoc);
        TreeStore.addDocumentChild(folderId, newDoc.id);
        if (autoShow) VisibleStore.show(newDoc.id);
    },

    deleteDocument(documentId) {
        VisibleStore.hideDocument(documentId);
        TreeStore.removeDocument(documentId);
        DocStore.removeDocument(documentId);
    },

    init() {
        if (this.initialized) return;

        this.initialized = true;
        DocStore.getState(state => {
            this.state = { documents: state.documents }
        })
    }
};


export default service;