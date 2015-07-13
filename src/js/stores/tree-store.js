import Hoverboard from 'hoverboard'

export default Hoverboard({


    /*
    const tree = {
        subFolders: {[root.id]: [folder1, folder2], [folder1.id]: [folder3]},
        subDocuments: {[folder1.id]: [a.id, b.id], [folder2.id]: [c.id]}
    };
    */

    getInitialState() {
        return { root: undefined, subFolders: {}, subDocuments: {} }
    },

    onSetRoot(root) {
        this.setState({root});
    },

    onAddFolderChild(folderId, childFolder) {
        const newSubFolders = Object.assign({}, this.state.subFolders);
        const newChildren = (newSubFolders[folderId] || []).concat([childFolder]);
        newSubFolders[folderId] = newChildren;
        
        this.setState({ subFolders: newSubFolders });
    },

    onAddDocumentChild(folderId, documentId) {
        const newSubDocuments = Object.assign({}, this.state.subDocuments);
        const newChildren = (newSubDocuments[folderId] || []).concat([documentId]);
        newSubDocuments[folderId] = newChildren;

        this.setState({ subDocuments: newSubDocuments });
    }
})