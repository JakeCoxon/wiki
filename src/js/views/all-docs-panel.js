import React from 'react'
import Hoverboard from 'hoverboard'
import DocStore from '../stores/doc-store.js'

export default React.createClass({
    getInitialState() {
        return { documents: [] };
    },

    componentWillMount() {

        DocStore.getState(state => {
            this.setState({ documents: state.documents })
        });
    },

    render() {
        const allDocs = Object.keys(this.state.documents).map(docId => {
            const { title } = this.state.documents[docId];
            return <div key={docId}>{ title }</div>;
        });

        return <div>{allDocs}</div>;
    }
});