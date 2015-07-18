import React from 'react'
import DocStore from '../stores/doc-store.js'
import TreeStore from '../stores/tree-store.js'
import VisibleStore from '../stores/visible-store.js'
import DocumentService from '../services/document-service.js'
import { Doc } from '../models/models.js'

const TreeView = React.createClass({
    componentWillMount() {
        DocStore.getState(state =>
            this.setState({ documents: state.documents }));
        TreeStore.getState(state =>
            this.setState({ tree: state }));
    },

    onShow(documentId) {
        return () => VisibleStore.toggle(documentId);
    },

    onNew() {
        DocumentService.newDocument(this.props.folderId, true);
    },

    render() {
        const folderTree = this.state.tree.folderTree[this.props.folderId] || [];
        const docTree = this.state.tree.documentTree[this.props.folderId] || [];

        const folderDivs = folderTree.map(subFolder => {
            return (
                <div>
                    <div className="treeview-folder">{subFolder.name}</div>
                    <div className="treeview-children">
                        <TreeView key={subFolder.id} folderId={subFolder.id} />
                    </div>
                </div>
            );
        });
        const docDivs = docTree.map(docId => {
            const doc = this.state.documents[docId];
            if (!doc) return;
            return (
                <div className="treeview-document" key={docId}>
                    <div className="doclink" onClick={this.onShow(docId)}>
                        {doc.title}
                    </div>
                </div>
            );
        });

        const newDocButton = null;//<div className="doclink is-new" onClick={this.onNew}><i className="fa fa-plus"></i> new</div>

        return (
            <div className="treeview">
                {folderDivs}
                {docDivs}
                {newDocButton}
            </div>
        );
        
    }
});

export default TreeView;