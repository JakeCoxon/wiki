import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../action-creators'

const VisibleDocsPanelUnderlying = React.createClass({

    onToggle(documentId) {

        return () => this.props.dispatch(actions.visibleToggle(documentId));

    },

    closeAll() {
        this.props.dispatch(actions.visibleHideAll());
    },

    render() {

        const allDocs = this.props.visible.map(docId => {

            const { title } = this.props.documents[docId];

            return (
                <div key={docId} className="listitem" onClick={this.onToggle(docId)}>
                    <div className="doclink">{ title }</div>
                </div>
            );
        });

        return (
            <div>
            {allDocs}
            {this.props.visible.length > 0 && (
                <button onClick={this.closeAll} style={{ marginTop: 15 }}>
                    Close all
                </button>
            )}
            </div>
        );
    }
});

const mapStateToProps = (state) => ({
    visible: state.visible,
    documents: state.documents
})
const VisibleDocsPanel = connect(mapStateToProps)(VisibleDocsPanelUnderlying);


export default VisibleDocsPanel;