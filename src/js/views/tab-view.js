import React from 'react'

const TabView = React.createClass({
    getInitialState() {
        return { tabIndex: this.props.initialTabIndex || 0 };
    },

    changeTab(index) {
        this.setState({ tabIndex: index });
    },

    render() {
        return (
            <div>
                {this.props.children({ 
                    tabIndex: this.state.tabIndex, 
                })}
            </div>
        );
    }
});

export default TabView