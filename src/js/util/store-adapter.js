import React from 'react'

const StoreAdapter = React.createClass({

    componentDidMount() {
        this.unsubscribe = this.props.store.getState(state => this.setState(state));
    },

    componentWillUnmount() {
        this.unsubscribe();
    },

    render() {
        return this.state ? this.props.children(this.state) : <div />;
    }

})

export default StoreAdapter;