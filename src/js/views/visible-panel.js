import React from 'react'

import DocStore from '../stores/doc-store.js'
import VisibleStore from '../stores/visible-store.js'


export default React.createClass({

    getInitialState() {
        return { documents: {}, visible: [] };
    },

    componentWillMount() {
        DocStore.getState(state => {
            this.setState({ documents: state.documents })
        });
        VisibleStore.getState(state => {
            this.setState({ visible: state.visible })
        });
    },

    onClose(id) {
        return () => VisibleStore.hide(id);
    },

    render() {
        const visibleElms = this.state.visible.map((documentId, visibleId) => {
            const doc = this.state.documents[documentId];
            return (
                <div style={{ margin: 4, padding: 2, background: '#eee'} }>
                    <div style={{ fontWeight: 'bold' }} onClick={this.onClose(visibleId)}>{doc.title}</div>
                    <div>{doc.body}</div>
                </div>
            );
        });
        return (
            <div>
                {visibleElms}
            </div>
        );
    }
});