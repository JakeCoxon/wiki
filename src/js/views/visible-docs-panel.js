import React from 'react'
import Hoverboard from 'hoverboard'
import DocStore from '../stores/doc-store.js'
import VisibleStore from '../stores/visible-store.js'
import storeWrapper from '../util/store-wrapper.js'

const VisibleDocsPanelUnderlying = React.createClass({

    onToggle(documentId) {

        return () => VisibleStore.toggle(documentId);

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

        return <div>{allDocs}</div>;
    }
});

const VisibleDocsPanel = storeWrapper([DocStore, VisibleStore])(VisibleDocsPanelUnderlying);

export default VisibleDocsPanel;