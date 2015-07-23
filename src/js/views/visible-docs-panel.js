import React from 'react'
import Hoverboard from 'hoverboard'
import DocStore from '../stores/doc-store.js'
import VisibleStore from '../stores/visible-store.js'

const VisibleDocsPanel = React.createClass({
    getInitialState() {
        return { documents: [], visible: [] };
    },

    componentWillMount() {

        DocStore.getState(({ documents }) => {
            this.setState({ documents })
        });
        VisibleStore.getState(({ visible }) => {
            this.setState({ visible })
        });
    },

    onToggle(documentId) {
        return () => VisibleStore.toggle(documentId);
    },

    render() {
        const allDocs = this.state.visible.map(docId => {
            const { title } = this.state.documents[docId];
            return (
                <div key={docId} className="listitem" onClick={this.onToggle(docId)}>
                    <div className="doclink">{ title }</div>
                </div>
            );
        });

        return <div>{allDocs}</div>;
    }
});

export default VisibleDocsPanel;