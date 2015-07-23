import Hoverboard from 'hoverboard'
import removeAt from '../util/removeAt.js'

export default Hoverboard({


    /*
    const tree = {
        documentTree: {[folder1.id]: [a.id, b.id], [folder2.id]: [c.id]}
    };
    */

    getInitialState() {
        return { documentTree: {} }
    },

    onSetData({ documentTree = {} }) {
        this.setState({ documentTree });
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

    onAddDocumentChild(folderId, documentId) {
        const documentTree = Object.assign({}, this.state.documentTree);
        const newChildren = (documentTree[folderId] || []).concat([documentId]);
        documentTree[folderId] = newChildren;

        this.setState({ documentTree: documentTree });
    }
})