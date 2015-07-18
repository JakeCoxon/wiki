import Hoverboard from 'hoverboard'
import removeAt from '../util/removeAt.js'

export default Hoverboard({


    /*
    const tree = {
        subFolders: {[root.id]: [folder1, folder2], [folder1.id]: [folder3]},
        subDocuments: {[folder1.id]: [a.id, b.id], [folder2.id]: [c.id]}
    };
    */

    getInitialState() {
        return { root: undefined, folderTree: {}, documentTree: {} }
    },

    onSetData({ root, folderTree = {}, documentTree = {} }) {
        this.setState({ root, folderTree, documentTree });
    },

    onRemoveDocument(documentId) {
        const newDocumentTree = Object.assign({}, this.state.documentTree);
        Object.keys(newDocumentTree).forEach(folderId => {
            const index = newDocumentTree[folderId].indexOf(documentId);
            if (index > -1) {
                newDocumentTree[folderId] = removeAt(newDocumentTree[folderId], index);
            }
        })
        this.setState({ documents: newDocumentTree });
    },

    onAddFolderChild(folderId, childFolder) {
        const newfolderTree = Object.assign({}, this.state.folderTree);
        const newChildren = (newfolderTree[folderId] || []).concat([childFolder]);
        newfolderTree[folderId] = newChildren;
        
        this.setState({ folderTree: newSubFolders });
    },

    onAddDocumentChild(folderId, documentId) {
        const documentTree = Object.assign({}, this.state.documentTree);
        const newChildren = (documentTree[folderId] || []).concat([documentId]);
        documentTree[folderId] = newChildren;

        this.setState({ documentTree: documentTree });
    }
})