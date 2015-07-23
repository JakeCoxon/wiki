import React from 'react'

const TabView = React.createClass({
    getInitialState() {
        return { tabIndex: 0 };
    },

    onChangeTab(index) {
        return () => this.setState({ tabIndex: index });
    },

    render() {
        return (
            <div>
                {this.props.children({ 
                    tabIndex: this.state.tabIndex, 
                    onChangeTab: this.onChangeTab
                })}
            </div>
        );
    }
});

export default TabView