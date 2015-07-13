import React from "react";
 
export default Store => ComposedComponent => React.createClass({

    getInitialState() {
        return Store.getState();
    },

    componentDidMount() {
        this.unsubscribe = Store.getState(state => this.setState(state));
    },

    componentWillUnmount() {
        this.unsubscribe();
    },
  
    render() {
        return <ComposedComponent {...this.props} {...this.state} />;
    }

});
