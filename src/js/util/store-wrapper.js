import React from "react";
 
export default stores => Underlying => {
    const Class = React.createClass({

        getInitialState() {
            return stores.reduce((r, s) => Object.assign(r, s.getState()), {});
        },

        componentDidMount() {
            this.unsubscribes = stores.map(store => store.getState(state => this.setState(state)));
        },

        componentWillUnmount() {
            this.unsubscribes.forEach(f => f());
        },
      
        render() {
            return <Underlying {...this.props} {...this.state} />;
        }
    });

    Class.underling = Underlying;

    return Class;

};
