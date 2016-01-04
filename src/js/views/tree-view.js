import React from 'react'
import { Doc } from '../models/models.js'
import { connect } from 'react-redux'

const TreeViewUnderlying = React.createClass({

    onToggle(documentId) {
        return () => this.props.dispatch({ type: "VISIBLE/TOGGLE", documentId });
    },

    onNew() {
        //DocumentService.newDocument(this.props.folderId, true);
    },

    render() {
        const docTree = this.props.documentTree[this.props.folderId] || [];

        const docDivs = docTree.map(docId => {
            const doc = this.props.documents[docId];
            if (!doc) return;

            const documentDiv = (
                <div className="listitem" onClick={this.onToggle(docId)}>
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

const mapStateToProps = (state) => ({
    documentTree: state.tree,
    documents: state.documents
})
const TreeView = connect(mapStateToProps)(TreeViewUnderlying);


export default TreeView;