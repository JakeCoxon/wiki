import React from 'react'
import DocStore from '../stores/doc-store.js'
import TreeStore from '../stores/tree-store.js'
import VisibleStore from '../stores/visible-store.js'
import DocumentService from '../services/document-service.js'
import { Doc } from '../models/models.js'
import storeWrapper from '../util/store-wrapper.js'

const TreeViewUnderlying = React.createClass({

    onShow(documentId) {
        return () => VisibleStore.toggle(documentId);
    },

    onNew() {
        DocumentService.newDocument(this.props.folderId, true);
    },

    render() {
        const docTree = this.props.documentTree[this.props.folderId] || [];

        const docDivs = docTree.map(docId => {
            const doc = this.props.documents[docId];
            if (!doc) return;

            const documentDiv = (
                <div className="listitem" onClick={this.onShow(docId)}>
                    <div className="doclink">{doc.title}</div>
                </div>
            );

            const childrenDivs = this.props.documentTree[docId] && (
                <div className="treeview-children">
                    <TreeView folderId={docId} />
                </div>
            );

            return (
                <div className="treeview-document" key={docId}>
                    {documentDiv}
                    {childrenDivs}
                </div>
            );
        });

        return (
            <div className="treeview">
                {docDivs}
            </div>
        );
        
    }
});

const TreeView = storeWrapper([DocStore, TreeStore])(TreeViewUnderlying);

export default TreeView;