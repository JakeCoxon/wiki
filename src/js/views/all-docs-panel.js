import React from 'react'
import Hoverboard from 'hoverboard'
import DocStore from '../stores/doc-store.js'
import VisibleStore from '../stores/visible-store.js'

export default React.createClass({
    getInitialState() {
        return { documents: [] };
    },

    componentWillMount() {

        DocStore.getState(state => {
            this.setState({ documents: state.documents })
        });
    },

    onShow(documentId) {
        return () => VisibleStore.toggle(documentId);
    },

    render() {
        const allDocs = Object.keys(this.state.documents).map(docId => {
            const { title } = this.state.documents[docId];
            return <div key={docId} className="doclink" onClick={this.onShow(docId)}>{ title }</div>;
        });

        return <div>{allDocs}</div>;
    }
});