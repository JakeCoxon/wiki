import React from 'react'
import Hoverboard from 'hoverboard'
import DocStore from '../stores/doc-store.js'

export default React.createClass({
    getInitialState() {
        return { documents: [] };
    },

    componentWillMount() {

        DocStore.getState(state => {
            console.log(state);
            this.setState({ documents: state.documents })
        });
    },

    render() {
        const allDocs = Object.keys(this.state.documents).map(key => {
            const a = this.state.documents[key];
            return <div>{a.title}</div>;
        });

        return <div>{allDocs}</div>;
    }
});