import React from 'react'
import DocStore from '../stores/doc-store.js'
import TreeStore from '../stores/tree-store.js'
import VisibleStore from '../stores/visible-store.js'

const TreeView = React.createClass({
    componentWillMount() {
        DocStore.getState(state =>
            this.setState({ documents: state.documents }));
        TreeStore.getState(state =>
            this.setState({ tree: state }));
    },

    onShow(documentId) {
        return () => VisibleStore.show(documentId);
    },

    render() {
        const subFolders = this.state.tree.subFolders[this.props.folder.id] || [];
        const subDocs = this.state.tree.subDocuments[this.props.folder.id] || [];

        const folderDivs = subFolders.map(subFolder => {
            return <TreeView folder={subFolder} />;
        });
        const docDivs = subDocs.map(docId => {
            const doc = this.state.documents[docId];
            return (
                <div onClick={this.onShow(docId)}>
                    {doc.title}
                </div>
            );
        });

        return (
            <div>
                <div style={{ fontWeight: 'bold' }}>{this.props.folder.name}</div>
                <div style={{ marginLeft: 20 }}>
                {folderDivs}
                {docDivs}
                </div>
            </div>
        );
        
    }
});

export default TreeView;