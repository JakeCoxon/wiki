import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../action-creators'

const TreeViewUnderlying = React.createClass({

    onToggle(documentId) {
        return () => this.props.dispatch(actions.visibleToggle(documentId));
    },

    onNew() {
        //DocumentService.newDocument(this.props.folderId, true);
    },

    render() {
        const { children } = this.props;

        const docDivs = children.map(({ documentId, title, children }) => {

            const documentDiv = (
                <div className="listitem" onClick={this.onToggle(documentId)}>
                    <div className="doclink">{title}</div>
                </div>
            );

            const childrenDivs = children && (
                <div className="treeview-children">
                    <TreeView children={children} />
                </div>
            );

            return (
                <div className="treeview-document" key={documentId}>
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

const TreeView = connect()(TreeViewUnderlying);


export default TreeView;