import React from 'react'
import TreeView from './tree-view.js'

import storeWrapper from '../util/store-wrapper.js'
import TreeStore from '../stores/tree-store.js'

const TreePanel = React.createClass({

    getInitialState() {
        return { root: null }; 
    },

    componentWillMount() {
        TreeStore.getState(state => this.setState({ root: state.root }));
    },

    render() {
        const tree = (<div>
            <TreeView folder={this.state.root} />
          </div>)

        return tree;
    }
});


export default TreePanel;
