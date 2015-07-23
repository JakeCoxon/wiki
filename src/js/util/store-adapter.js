import React from 'react'

const StoreAdapter = React.createClass({

    componentDidMount() {
        this.unsubscribes = this.props.stores.map(store => store.getState(state => this.setState(state)));
    },

    componentWillUnmount() {
        this.unsubscribes.forEach(f => f());
    },

    render() {
        return this.state ? this.props.children(this.state) : <div />;
    }

})

export default StoreAdapter;